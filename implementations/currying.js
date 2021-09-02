function sum(num) {
    // if (typeof num === "number") {
    return function (inp) {
        console.log(`${num} + ${inp}`);
        return sum(inp);
    };
    // }

    // return (input) => num + input;
}

const result = sum(1)(5)(2)(3)();
console.log(result);
console.log(typeof result);
