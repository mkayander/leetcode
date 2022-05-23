/**
 * {@link https://leetcode.com/problems/ones-and-zeroes/discuss/1138695/JS-Python-Java-C%2B%2B-or-Easy-DP-Knapsack-Solution-w-Explanation}
 *
 * @param {string[]} strings
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const findMaxForm = function (strings, m, n) {
    const dp = Array.from({ length: m + 1 }, () => new Uint8Array(n + 1));

    // Go through each string
    for (const str of strings) {
        let zeroes = 0,
            ones = 0;

        // Count ones and zeroes
        for (let j = 0; j < str.length; j++) {
            str[j] === "0" ? zeroes++ : ones++;
        }

        for (let j = m; j >= zeroes; j--) {
            for (let k = n; k >= ones; k--) {
                dp[j][k] = Math.max(dp[j][k], dp[j - zeroes][k - ones] + 1);
            }
        }
    }

    return dp[m][n];
};

console.log(findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3));
console.log(
    findMaxForm(
        [
            "0",
            "11",
            "1000",
            "01",
            "0",
            "101",
            "1",
            "1",
            "1",
            "0",
            "0",
            "0",
            "0",
            "1",
            "0",
            "0110101",
            "0",
            "11",
            "01",
            "00",
            "01111",
            "0011",
            "1",
            "1000",
            "0",
            "11101",
            "1",
            "0",
            "10",
            "0111",
        ],
        9,
        80
    )
);
