function swap(nums, i, j) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
}

function reverse(nums, idx) {
    let start = idx;
    let end = nums.length - 1;

    while (start < end) {
        swap(start, end);
        start++;
        end--;
    }
}

function nextLarge(nums, idx) {
    for (let i = nums.length - 1; i > idx; i--) {
        if (nums[i] > nums[idx]) return i;
    }
}

function nextSmall(nums, idx) {
    for (let i = nums.length - 1; i > idx; i--) {
        if (nums[i] < nums[idx]) return i;
    }
}

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
    for (let i = nums.length - 2; i >= 0; i--) {
        if (nums[i] < nums[i + 1]) {
            const large = nextLarge(nums, i);
            swap(nums, i, large);
            reverse(nums, i + 1);
            return;
        }
    }

    // If there is no next permutation reverse the arr
    nums.reverse();
};

var prevPermutation = function (nums) {
    for (let i = nums.length - 2; i >= 0; i--) {
        if (nums[i] > nums[i + 1]) {
            const large = nextSmall(nums, i);
            swap(nums, i, large);
            reverse(nums, i + 1);
            return;
        }
    }

    // If there is no next permutation reverse the arr
    nums.reverse();
};

const nums = [1, 2, 3];
nextPermutation(nums);
console.log(nums);
prevPermutation(nums);
console.log(nums);

const nums2 = [3, 2, 1];
prevPermutation(nums2);
prevPermutation(nums2);
prevPermutation(nums2);
console.log(nums2);

/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function (nums) {
    const strs = nums.map((val) => String(val));
    strs.sort((a, b) => b + a - (a + b));

    if (strs[0] === "0") {
        return "0";
    }

    return strs.join("");
};
