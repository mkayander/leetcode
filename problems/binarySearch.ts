const binarySearch = (nums: number[], target: number) => {
    let left = 0;
    let right = nums.length - 1;
    let current;

    while (left <= right) {
        current = Math.round((right - left) / 2) + left;

        if (target === nums[current]) {
            return current;
        } else if (nums[current] > target) {
            right = current - 1;
        } else {
            left = current + 1;
        }
    }

    return -1;
};

console.log(binarySearch([-1, 0, 3, 5, 9, 12], 9));
