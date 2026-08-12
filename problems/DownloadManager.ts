type Status = "QUEUED" | "DOWNLOADING" | "PAUSING" | "PAUSED" | "COMPLETED" | "CANCELLED" | "FAILED";

type Download = {
    id: string;
    videoId: string;
    status: Status;
    downloadedBytes: number;
    totalBytes?: number;
    etag?: string;
};

type Runtime = {
    runId: number;
    controller: AbortController;
};

interface DownloadStore {
    create(videoId: string): Download;
    get(id: string): Download | undefined;
    update(id: string, patch: Partial<Download>): void;
}

class Downloader {
    constructor(
        private download: Download,
        private signal: AbortSignal,
    ) {}

    async run() {
        // recover completed chunks
        // download ranges sequentially
        // chunk.partial -> chunk.complete
        // assemble video.tmp -> final file
    }
}

class DownloadManager {
    private waiting: string[] = [];
    private active = new Map<string, Runtime>();
    private nextRunId = 0;

    constructor(
        private store: DownloadStore,
        private maxConcurrent = 3,
    ) {}

    enqueue(videoId: string) {
        const download = this.store.create(videoId);
        this.waiting.push(download.id);
        this.pump();

        return download.id;
    }

    pause(id: string) {
        const download = this.store.get(id);
        if (!download) return false;

        if (download.status === "QUEUED") {
            this.waiting = this.waiting.filter((x) => x !== id);
            this.store.update(id, { status: "PAUSED" });
            return true;
        }

        if (download.status === "DOWNLOADING") {
            this.store.update(id, { status: "PAUSING" });
            this.active.get(id)?.controller.abort();
            return true;
        }

        return false;
    }

    resume(id: string) {
        const download = this.store.get(id);

        if (!download || download.status !== "PAUSED") {
            return false;
        }

        this.store.update(id, { status: "QUEUED" });
        this.waiting.push(id);
        this.pump();

        return true;
    }

    private pump() {
        while (this.active.size < this.maxConcurrent && this.waiting.length) {
            const id = this.waiting.shift()!;
            const download = this.store.get(id);

            if (!download || download.status !== "QUEUED") {
                continue;
            }

            this.start(download);
        }
    }

    private start(download: Download) {
        const runId = ++this.nextRunId;
        const controller = new AbortController();

        this.active.set(download.id, {
            runId,
            controller,
        });

        this.store.update(download.id, {
            status: "DOWNLOADING",
        });

        const worker = new Downloader(download, controller.signal);

        worker
            .run()
            .then(() => this.finish(download.id, runId))
            .catch(() => this.finish(download.id, runId));
    }

    private finish(id: string, runId: number) {
        const runtime = this.active.get(id);

        // stale callback from previous execution
        if (!runtime || runtime.runId !== runId) {
            return;
        }

        this.active.delete(id);

        const download = this.store.get(id);

        if (download?.status === "PAUSING") {
            this.store.update(id, { status: "PAUSED" });
        } else if (download?.status === "DOWNLOADING") {
            this.store.update(id, { status: "COMPLETED" });
        }

        this.pump();
    }
}
