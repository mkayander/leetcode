/**
 * @param {number[]} nums
 * @return {number}
 */
const pivotIndex = (nums) => {
    let sum = 0;
    let leftsum = 0;

    for (const x of nums) sum += x;

    for (let i = 0; i < nums.length; i++) {
        if (leftsum === sum - leftsum - nums[i]) return i;

        leftsum += nums[i];
    }

    return -1;
};
