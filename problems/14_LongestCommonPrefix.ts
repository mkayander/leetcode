const longestCommonPrefix = (strings: string[]): string => {
    let prefix = "";
    const reference = strings[0];

    for (const char of reference) {
        if (strings.every((str) => str.startsWith(prefix + char))) {
            prefix += char;
        } else break;
    }

    return prefix;
};

console.log(longestCommonPrefix(["flower", "flow", "flight"])); // 'fl'
console.log(longestCommonPrefix(["dog", "racecar", "car"])); // ''
console.log(longestCommonPrefix(["flickr", "flight", "fling"])); // 'fli'
console.log(longestCommonPrefix(["c", "acc", "ccc"])); // ''
