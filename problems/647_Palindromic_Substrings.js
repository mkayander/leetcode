/**
 * @param {string} s
 * @return {number}
 */
const countSubstrings = function (s) {
    let count = 0;

    const computePalindrome = (start, end) => {
        // while in valid scope
        while (start >= 0 && end < s.length) {
            // if boundary chars are equal, palindrome is valid
            if (s[start] === s[end]) {
                // update palindrome variable, by adding boundary chars
                // palindrome = s[start] + palindrome + s[end];

                // extend boundary index pointers
                start--;
                end++;

                // increment palindromes count
                count++;

                continue;
            }

            // else, exit the loop
            break;
        }

        // return palindrome;
    };

    for (let i = 0; i < s.length; i++) {
        computePalindrome(i, i, ""); // odd palindromes
        computePalindrome(i, i + 1, s[i]); // even palindromes
    }

    return count;
};

console.log(countSubstrings("abc"));
console.log(countSubstrings("aaa"));
console.log(countSubstrings("bcdeaaaaaaaedc"));
