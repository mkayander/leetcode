/**
 * @param {string} sentence
 * @return {boolean}
 */
const checkIfPangram = (sentence) => {
    if (sentence.length < 26) return false;

    const set = new Set();

    for (let i = 0; i < sentence.length; i++) {
        const code = sentence.charCodeAt(i);
        if (code >= 97 && code <= 122) {
            set.add(code);
        }
    }

    console.log(set);

    return set.size === 26;
};

console.log(checkIfPangram("thequickbrownfoxjumpsoverthelazydog"));
console.log(checkIfPangram("leetcode"));
