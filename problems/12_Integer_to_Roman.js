/**
 * @param {number} num
 * @return {string}
 */
const intToRoman = (num) => {
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const strs = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

    let result = "";

    for (let i = 0; i < values.length; i++) {
        while (num >= values[i]) {
            num -= values[i];
            result += strs[i];
        }
    }

    return result;
};

console.time("intToRoman");
console.log(intToRoman(1994));
console.timeEnd("intToRoman");
