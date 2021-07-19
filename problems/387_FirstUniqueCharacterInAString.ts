const firstUniqChar = (s: string): number => {
    const map: Record<string, [number, number]> = {};

    s.split("").forEach((char, index) => {
        map[char] =
            map[char] === undefined
                ? [1, index]
                : [map[char][0] + 1, map[char][1]];
    });

    console.log(map);

    const uniqueChars = Object.values(map).filter((val) => val[0] === 1);

    if (uniqueChars.length === 0) return -1;

    return Math.min(...uniqueChars.map((val) => val[1]));
};

console.log(firstUniqChar("loveleetcode"));
console.log(firstUniqChar("leetcode"));
console.log(firstUniqChar("aabb"));
