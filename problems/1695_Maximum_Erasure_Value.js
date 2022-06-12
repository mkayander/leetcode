/**
 * {@link https://leetcode.com/problems/maximum-erasure-value/discuss/1235716/JS-Python-Java-C%2B%2B-or-Easy-2-Pointer-Sliding-Window-Solution-w-Explanation}
 * * @param {number[]} nums
 *  * @return {number}
 */
const maximumUniqueSubarray = function(nums) {
    let nmap = new Int8Array(10001);
    let total = 0;
    let best = 0;

    for (let left = 0, right = 0; right < nums.length; right++) {
        nmap[nums[right]]++;
        total += nums[right];
        while (nmap[nums[right]] > 1) {
            total -= nums[left++];
            nmap[nums[left]]--;
        }

        best = Math.max(best, total);
    }

    return best;
};

console.log(maximumUniqueSubarray([4, 2, 4, 5, 6]));
