const firstUniqChar = (s: string): number => {
    for (let i = 0; i < s.length; i++) {
        if (s.lastIndexOf(s[i]) === i && s.indexOf(s[i]) === i) {
            return i;
        }
    }

    return -1;
};

console.log(firstUniqChar("loveleetcode"));
console.log(firstUniqChar("leetcode"));
console.log(firstUniqChar("aabb"));
