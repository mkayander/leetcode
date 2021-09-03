const sum = (function () {
    let result = 0;
    return (num) => {
        if (typeof num === "number" && !Number.isNaN(num)) {
            return function (inp) {
                console.log(`${num} + ${inp}`);
                result = num;
                return sum(inp + num);
            };
        }

        console.log("Returning result!! - ", result);
        return result;
    };
})();

const result = sum(1)(5)(2)(3)(2)();
console.log(result);
console.log(typeof result);
