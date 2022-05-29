/**
 * @param {string[]} words
 * @return {number}
 */
const maxProduct = function(words) {
    const dp = Array.from({ length: words.length }, () => ([]));

    let result = 0;

    const helper = (wordA, wordB) => {
        for (const char of wordA) {
            if (wordB.includes(char)) return false;
        }

        return true;
    };

    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < words.length; j++) {
            if (dp[i][j] === undefined) {
                dp[i][j] = helper(words[i], words[j]) ? words[i].length * words[j].length : 0;
                dp[i][j] && (result = Math.max(result, dp[i][j]));
            }
        }
    }

    return result;
};

/**
 * {@link https://leetcode.com/problems/maximum-product-of-word-lengths/discuss/1233808/JS-Python-Java-C%2B%2B-or-Easy-Bit-Manipulation-Solution-w-Explanation}
 * @param {string[]} words
 * @return {number}
 */
const maxProduct2 = (words) => {
    words.sort((a, b) => b.length - a.length);
    let result = 0;
    let bitsets = new Uint32Array(words.length);

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const wlen = word.length;
        let bitset = 0;

        if (wlen * words[0].length < result) {
            return result;
        }

        for (let j = 0; j < wlen; j++) {
            bitset |= 1 << (word.charCodeAt(j) - 97);
        }

        for (let j = 0; j < i; j++) {
            // If we use bit manipulation, however, to create character bitsets, then it should be easy enough
            // to use a bitwise AND (&) to compare the two bitset integers where any result
            // other than 0 means overlapping characters.
            if ((bitsets[j] & bitset) === 0) {
                result = Math.max(result, wlen * words[j].length);
            }
        }

        bitsets[i] = bitset;
    }
    return result;
};

console.log(maxProduct(["eae", "ea", "aaf", "bda", "fcf", "dc", "ac", "ce", "cefde", "dabae"]));
console.log(maxProduct2(["eae", "ea", "aaf", "bda", "fcf", "dc", "ac", "ce", "cefde", "dabae"]));
