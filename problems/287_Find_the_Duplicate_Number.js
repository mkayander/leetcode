/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
    if (!nums.length) return null;

    let left = nums[0];
    let right = nums[0];

    do {
        left = nums[left];
        right = nums[right];
        right = nums[right];
    } while (left !== right);

    let start = nums[0];
    while (start !== left) {
        start = nums[start];
        left = nums[left];
    }

    return start;
};
