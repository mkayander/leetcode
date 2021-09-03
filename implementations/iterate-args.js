function multiplyByTwoEs6(...nums) {
    return nums.map((num) => num * 2);
}

function multiplyByTwo() {
    return Object.values(arguments).map((num) => num * 2);
}

console.log(multiplyByTwoEs6(1, 2, 3, 4, 5, 6, 7, 8, 9, 0));
console.log(multiplyByTwo(1, 2, 3, 4, 5, 6, 7, 8, 9, 0));
