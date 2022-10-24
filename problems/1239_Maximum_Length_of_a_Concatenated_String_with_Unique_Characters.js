/**
 * @param {string[]} arr
 * @return {number}
 */
const maxLength = (arr) => {
    let result = 0; // Store the maximum length and return it and the end

    const solve = (start, cur) => {
        result = Math.max(result, cur.length); // write current max length
        for (let i = start; i < arr.length; i++) {
            const currString = cur + arr[i];
            // Easy way to check if string is made of unique characters in JS
            if (currString.length === new Set([...currString]).size) {
                // If current string combination has unique chars, run recursive function from the next index
                solve(i + 1, currString);
            }
        }
    };

    solve(0, "");
    return result;
};

console.log(maxLength(["un", "iq", "ue"]));
console.log(maxLength(["cha", "r", "act", "ers"]));
console.log(maxLength(["abcdefghijklmnopqrstuvwxyz"]));
