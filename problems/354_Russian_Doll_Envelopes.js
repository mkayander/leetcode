/**
 * {@link https://leetcode.com/problems/russian-doll-envelopes/discuss/1134011/JS-Python-Java-C%2B%2B-or-Easy-LIS-Solution-w-Explanation}
 *
 * @param {number[][]} envelopes
 * @return {number}
 */
const maxEnvelopes = (envelopes) => {
    envelopes.sort((a, b) => a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]);

    console.log(envelopes);

    let len = envelopes.length, dp = [];

    for (let i = 0; i < len; i++) {
        let height = envelopes[i][1], left = 0, right = dp.length;
        while (left < right) {
            let mid = (left + right) >> 1;
            if (dp[mid] < height) left = mid + 1;
            else right = mid;
        }
        dp[left] = height;
    }
    return dp.length;
};

console.log(maxEnvelopes([[5, 4], [6, 4], [6, 7], [2, 3]]));
