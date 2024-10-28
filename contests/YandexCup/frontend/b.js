// function makeWatchable(obj, key, steps, config) {
//     if (typeof obj !== "object" || obj === null) {
//         return obj;
//     }

//     for (const prop in obj) {
//         obj[prop] = makeWatchable(obj[prop], key, steps, config, false);
//     }

//     const proxy = new Proxy(obj, {
//         get(target, prop, receiver) {
//             if (config.isEnabled && typeof prop === "string") {
//                 steps.at(-1).push(prop);
//             }

//             return Reflect.get(target, prop, receiver);
//         },
//     });

//     return proxy;
// }

// function makeArgumentsWatchable(args, steps, config) {
//     for (let i = 0; i < args.length; i++) {
//         args[i] = makeWatchable(args[i], `arg${i}`, steps, config);
//     }

//     return new Proxy(args, {
//         get(target, prop, receiver) {
//             if (config.isEnabled && typeof prop === "string" && prop !== "length") {
//                 steps.push([`arg${prop}`]);
//             }

//             return Reflect.get(target, prop, receiver);
//         },
//     });
// }

// const createSelector = (selector) => {
//     return (...args) => {
//         const steps = [];
//         const config = { isEnabled: false };
//         const newArgs = makeArgumentsWatchable(args, steps, config);
//         config.isEnabled = true;
//         let result = selector.apply(null, newArgs);
//         config.isEnabled = false;

//         // if (result === newArgs[0]) {
//         //     steps.push(["arg0"]);
//         // } else if (result === newArgs[1]) {
//         //     steps.push(["arg1"]);
//         // }

//         return {
//             result,
//             steps,
//         };
//     };
// };

function createSelector(fn) {
    return function (...args) {
        const steps = [];

        // A proxy to track property access and store the steps
        const trackAccess = (obj, path = []) => {
            return new Proxy(obj, {
                get(target, prop) {
                    const newPath = [...path, prop];
                    steps.push(["arg0", ...newPath]);

                    const value = target[prop];

                    // If value is an object, return a proxy for further tracking
                    if (typeof value === "object" && value !== null) {
                        return trackAccess(value, newPath);
                    }

                    return value;
                },
            });
        };

        // A proxy for `params`, as it is arg1 in the third selector
        const trackParams = (params) => {
            return new Proxy(params, {
                get(target, prop) {
                    steps.push(["arg1", prop]);
                    return target[prop];
                },
            });
        };

        // Wrapping args with tracking proxies
        const [state, params] = args;
        const proxiedState = trackAccess(state);

        const result = fn(proxiedState, params && trackParams(params));

        return { result, steps };
    };
}

module.exports = createSelector;

function test() {
    const selector1 = createSelector((state) => {
        if (state.isEnabled) {
            return state.inner.value;
        }

        return null;
    });

    const selector2 = createSelector((state) => {
        if (Array.isArray(state.array) && state.array.length > 0) {
            return state.array[0];
        }

        return null;
    });

    const selector3 = createSelector((state, params) => {
        if (params.short) {
            return {
                id: state.id,
                name: state.name,
            };
        }

        return state;
    });

    const result1 = selector1({ isEnabled: true, inner: { value: 42 } });
    const result2 = selector1({ isEnabled: false, inner: { value: 21 } });
    const result3 = selector2({ array: [1, 2, 3] });
    const result4 = selector3({ id: 2135, name: "Ivan", lastname: "Ivanov", age: 25 }, { short: false });

    console.log(result1);
    // console.log(result2);
    // console.log(result3);
    // console.log(result4);

    // console.log(selector3({ id: 2135, name: "Ivan", lastname: "Ivanov", age: 25 }, { short: true }));

    const obj1 = {
        result: 42,
        steps: [
            ["arg0", "isEnabled"],
            ["arg0", "inner", "value"],
        ],
    };

    const obj2 = {
        result: null,
        steps: [["arg0", "isEnabled"]],
    };

    const obj3 = {
        result: 1,
        steps: [
            ["arg0", "array"],
            ["arg0", "array", "length"],
            ["arg0", "array", "0"],
        ],
    };

    const obj4 = {
        result: {
            id: 2135,
            name: "Ivan",
            lastname: "Ivanov",
            age: 25,
        },
        steps: [["arg1", "short"], ["arg0"]],
    };

    console.log(JSON.stringify(result1) === JSON.stringify(obj1)); // true
    console.log(JSON.stringify(result2) === JSON.stringify(obj2)); // true
    console.log(JSON.stringify(result3) === JSON.stringify(obj3)); // true
    console.log(JSON.stringify(result4) === JSON.stringify(obj4)); // true
}

test();
