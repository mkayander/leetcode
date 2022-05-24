/**
 * {@link https://leetcode.com/problems/longest-valid-parentheses/discuss/1140004/JS-Python-Java-C%2B%2B-or-Easy-Stack-Solution-w-Explanation}
 *
 * @param {string} S
 * @return {number}
 */
const longestValidParentheses = (S) => {
    let stack = [-1];
    let ans = 0;

    for (let i = 0; i < S.length; i++) {
        if (S[i] === "(") {
            stack.push(i);
        } else if (stack.length === 1) {
            stack[0] = i;
        } else {
            stack.pop();
            ans = Math.max(ans, i - stack[stack.length - 1]);
        }
    }

    return ans;
};

console.log(longestValidParentheses(")()())"));
