const largestPerimeter = (nums) => {
    // Sort values in descending order
    nums.sort((a, b) => b - a);

    for (let i = 0; i < nums.length - 2; i++) {

        if (nums[i] < (nums[i + 1] + nums[i + 2])) {

            // Accept: find the triangle with the largest perimeter
            return (nums[i] + nums[i + 1] + nums[i + 2]);
        }
    }

    // Reject: impossible to make triangle
    return 0;
};

console.log(largestPerimeter([2, 1, 2]));
console.log(largestPerimeter([1, 2, 1]));
