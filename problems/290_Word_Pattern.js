/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function(pattern, s) {
    const words = s.split(" ");

    if (words.length !== pattern.length) return false;

    const aMap = {};
    const bMap = {};

    for (let i = 0; i < s.length; i++) {
        if (pattern[i] in aMap) {
            if (aMap[pattern[i]] !== words[i]) {
                return false;
            }
        } else {
            if (words[i] in bMap) {
                return false;
            }

            aMap[pattern[i]] = words[i];
            bMap[words[i]] = pattern[i];
        }
    }

    return true;
};
