const syncExecutor = (callback, ...args) => callback(...args);
const macroTaskExecutor = (callback, ...args) => setTimeout(callback, 0, ...args);
const microTaskExecutor = (callback, ...args) => queueMicrotask(() => callback(...args));

class EventEmitter {
    #events = {};
    #executor;

    constructor(options) {
        this.#executor = options?.executor || syncExecutor;
    }

    on(event, callback) {
        (this.#events[event] ??= []).push(callback);

        return () => this.off(event, callback);
    }

    emit(event, ...args) {
        if (!this.#events[event]) return;

        for (const handler of this.#events[event]) {
            this.#executor(handler, ...args);
        }
    }

    off(event, callback) {
        if (!this.#events[event]) return;

        this.#events[event] = this.#events[event].filter((handler) => handler !== callback);
    }

    once(event, callback) {
        const wrapper = (...args) => {
            callback(...args);
            this.off(event, wrapper);
        };
        this.on(event, wrapper);

        return () => this.off(event, wrapper);
    }
}

const emitter = new EventEmitter();
emitter.on("event", (...args) => console.log(...args));
emitter.emit("event", "a", "b", "c");

const off = emitter.on("event", (...args) => console.log(...args));
emitter.emit("event", "a", "b", "c");
off();
emitter.emit("event", "a", "b", "c");

emitter.once("event", (...args) => console.log(...args));
emitter.emit("event", "a", "b", "c");
emitter.emit("event", "a", "b", "c");

const macroTaskEmitter = new EventEmitter({ executor: macroTaskExecutor });
macroTaskEmitter.on("event", (...args) => console.log(...args));
macroTaskEmitter.emit("event", "a", "b", "c");

const microTaskEmitter = new EventEmitter({ executor: microTaskExecutor });
microTaskEmitter.on("event", (...args) => console.log(...args));
microTaskEmitter.emit("event", "a", "b", "c");
