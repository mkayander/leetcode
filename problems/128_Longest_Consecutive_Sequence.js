/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
    const set = new Set(nums);

    let result = 0;
    let current = 0;

    for (let num of set) {
        if (!set.has(num - 1)) {
            current = 1;
            while (set.has(num + 1)) {
                current++;
                num++;
            }
            result = Math.max(result, current);
        }
    }

    return result;
};
