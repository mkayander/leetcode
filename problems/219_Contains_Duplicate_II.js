/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
const containsNearbyDuplicate = (nums, k) => {
    // Edge cases
    if (nums == null || nums.length < 2 || k === 0) return false;

    const seen = [];

    for (let i = 0; i < nums.length; i++) {
        if (seen[nums[i]] === undefined) {
            seen[nums[i]] = i;
        } else {
            if (Math.abs(seen[nums[i]] - i) <= k) {
                return true;
            }

            seen[nums[i]] = i;
        }
    }

    return false;
};

// Time Complexity : O(n)
// Space Complexity : O(n)
const containsNearbyDuplicate2 = (nums, k) => {
    const hashmap = {};
    for (let i = 0; i < nums.length; i++) {
        // Check if the difference between duplicates is less than k
        if (i - hashmap[nums[i]] <= k) {
            return true;
        }
        hashmap[nums[i]] = i;
    }
    return false;
};

console.time("containsNearbyDuplicate");
console.log(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2));
console.timeEnd("containsNearbyDuplicate");

console.time("containsNearbyDuplicate2");
console.log(containsNearbyDuplicate2([1, 2, 3, 1, 2, 3], 2));
console.timeEnd("containsNearbyDuplicate2");
