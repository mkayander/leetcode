/**
 *
 * @param {Array} a
 * @param {Array} b
 */
const arrayDiff = (a, b) => {
    return a.filter((item) => !b.includes(item));
};

console.log(arrayDiff([1, 2, 3, 4, 5], [3, 4, 10]));
