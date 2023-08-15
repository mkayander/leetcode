/**
 * Encodes a list of strings to a single string.
 *
 * @param {string[]} strs
 * @return {string}
 */
var encode = function (strs) {
    const result = [];

    for (const str of strs) {
        result.push(str.length, DELIMITER, ...str);
    }

    return result.join("");
};

const DELIMITER = "Ĭ";

// 1. Use non-ASCII delimiter: Ĭ

// 2. Special encoding. Define lenght of the next data block
// 24ĬHelloWorldaslaskdkaskd-asd

/**
 * Decodes a single string to a list of strings.
 *
 * @param {string} s
 * @return {string[]}
 */
var decode = function (s) {
    const result = [];

    // console.log(s);

    let i = 0;
    while (i < s.length - 1) {
        const start = i;
        while (s[i] >= "0" && s[i] <= "9") {
            i++;
        }
        const currSize = Number(s.slice(start, i));
        i++;

        // console.log({i, currSize});

        result.push(s.slice(i, i + currSize));
        i += currSize;
    }

    return result;
};

/**
 * Your functions will be called as such:
 * decode(encode(strs));
 */
