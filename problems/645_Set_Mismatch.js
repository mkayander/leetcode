/**
 * @see {https://leetcode.com/problems/set-mismatch/discuss/1089560/JS-Python-Java-C%2B%2B-or-(Updated)-Easy-O(1)-Space-Solution-w-Explanation}
 *
 * @param {number[]} nums
 * @return {number[]}
 */
const findErrorNums = (nums) => {
    let N = nums.length; // Array length defines the end of the numbers range, as it's 1 to N
    let dupe; // Store duplicated value
    // For this problem, we can take advantage of some math, because one thing we know about a sequence of numbers from 1 to N is that their sum should equal the Nth triangular number (N * (N + 1) / 2).
    let sum = N * (N + 1) / 2;
    const seen = new Uint8Array(N + 1); // Map of the seen number counts, more optimized than Object or Map since we know all numbers from array length

    for (let i = 0; i < N; i++) {
        const num = nums[i];

        sum -= num;

        if (seen[num]) {
            dupe = num;
        }

        seen[num]++;
    }

    console.log(sum);

    // At this moment sum stores a difference between target sum and the actual sum
    return [dupe, sum + dupe]; // sum difference applied to the dupe identifies the missing number
};

console.log(findErrorNums([1, 2, 2, 4]));
console.log(findErrorNums([1, 1]));
console.log(findErrorNums([2, 3, 2]));
