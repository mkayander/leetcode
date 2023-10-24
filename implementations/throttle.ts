type Callback = (...args: any[]) => void;

function throttle<T extends Callback>(fn: T, t: number) {
    let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;
    let nextTimestamp = 0;

    return function run(...args) {
        const timestamp = Date.now();
        if (timestamp < nextTimestamp) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                run(...args);
            }, nextTimestamp - timestamp);
            return;
        }

        nextTimestamp = timestamp + t;
        fn(...args);
    } as T;
}

const throttled = throttle(console.log, 100);
throttled("log"); // logged immediately.
throttled("log"); // logged at t=100ms.
