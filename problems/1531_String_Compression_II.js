/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const getLengthOfOptimalCompression = (s, k) => {
    const memo = new Map();

    const backtrack = (i, lastChar, lastCharCount, k) => {
        if (k < 0) return Number.POSITIVE_INFINITY;
        if (i >= s.length) return 0;

        const memoKey = `${i}#${lastChar}#${lastCharCount}#${k}`;
        if (memoKey in memo) return memo[memoKey];

        if (s[i] === lastChar) {
            // we have a stretch of the last_count of the same chars, what is the cost of adding one more?
            const incrementor = [1, 9, 99].includes(lastCharCount) ? 1 : 0;
            // no need to delete here, if we have a stretch of chars like 'aaaaa' - we delete it from the beginning in the else delete section
            memo[memoKey] = incrementor + backtrack(i + 1, lastChar, lastCharCount + 1, k);
        } else {
            // keep this char for compression - it will increase the result length by 1 plus the cost of compressing the rest of the string
            memo[memoKey] = Math.min(
                1 + backtrack(i + 1, s[i], 1, k), // keep char
                backtrack(i + 1, lastChar, lastCharCount, k - 1) // delete char
            );
        }
        return memo[memoKey];
    };
    return backtrack(0, "", 0, k);
};

console.log(getLengthOfOptimalCompression("aaabcccd", 2));
