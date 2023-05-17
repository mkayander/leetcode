function promisify3(f) {
    return function (...args) {
        return new Promise((resolve) => {
            function callback(result) {
                resolve(result);
            }
            args.push(callback);
            f.call(null, ...args);
        });
    };
}

function promisify(func) {
    return (...args) =>
        new Promise((resolve) => {
            const callback = (result) => {
                resolve(result);
            };
            args.push(callback);
            func(...args);
        });
}

promisify(fs.readFile)(__filename, "utf8").then(console.log);
