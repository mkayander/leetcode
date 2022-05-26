/**
 * @param {number} n - a positive integer
 * @return {number}
 */
const hammingWeight = (n) =>
    (n >>> 0).toString(2)
        .split("")
        .reduce((acc, curr) => acc + +curr, 0);

const hammingWeight2 = (n) => {

    let num_of_1s = 0;

    for (let i = 0; i < 32; i++) {

        num_of_1s += n & 1;

        n >>= 1;

    }

    return num_of_1s;
};

console.log(hammingWeight(11));
