/**
 * @param {number[]} nums
 * @return {boolean}
 */
const increasingTriplet = (nums) => {
    let firstNumber = Infinity;
    let secondNumber = Infinity;

    for (const currentNumber of nums) {
        if (currentNumber > secondNumber && currentNumber > firstNumber) {
            return true;
        }
        if (currentNumber > firstNumber) {
            secondNumber = currentNumber;
        } else {
            firstNumber = currentNumber;
        }
    }
    return false;
};

console.log(increasingTriplet([1, 2, 3, 4, 5]));
console.log(increasingTriplet([1, 0, 4, 2, 5]));
