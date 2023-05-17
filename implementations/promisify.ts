type InferArguments<Fun extends (...args: any[]) => any> = Fun extends (...args: infer Args) => any ? Args : never;
type InferCallbackResults<Fun extends (...args: any[]) => any> = Fun extends (...args: any[]) => infer Result
    ? Result
    : never;

function promisify3<Fun extends (...args: any[]) => any>(
    f: Fun
): (...args: InferArguments<Fun>) => Promise<InferCallbackResults<Fun>> {
    return function (...args: InferArguments<Fun>) {
        return new Promise((resolve) => {
            function callback(result: InferCallbackResults<Fun>) {
                resolve(result);
            }
            args.push(callback);
            f.call(null, ...args);
        });
    };
}

const exampleFunc = (a: number, b: number, cb?: (result: number) => void) => {
    cb?.(a + b);
};

const promisifiedFunc = promisify(exampleFunc);

promisifiedFunc(1, 2).then(console.log);

type ArgFunc = (...args: any[]) => any;
type PromisifiedFunc<T extends ArgFunc> = (...args: Parameters<T>) => Promise<ReturnType<T>>;

function promisify<T extends ArgFunc>(func: T): PromisifiedFunc<T> {
    return (...args: Parameters<T>) =>
        new Promise((resolve) => {
            const callback = (result: ReturnType<T>) => {
                resolve(result);
            };
            args.push(callback);
            func(...args);
        });
}

const exampleFunc2 = (a: number, b: number, cb?: (result: number) => void) => {
    cb?.(a + b);

    return "done";
};

const promisifiedFunc2 = promisify(exampleFunc2);

promisifiedFunc2(1, 2).then(console.log);
