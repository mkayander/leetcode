/**
 * @param {number} n
 * @return {string}
 */
const countAndSay = (n) => {
    if (n <= 1) return "1";

    let countSay = "1";

    for (let i = 2; i <= n; i++) {
        let num = countSay.charAt(0);
        const temp = countSay;
        let count = 1;

        countSay = ""; // Empty string stored in this round

        for (let j = 1; j < temp.length; j++) {
            // The numbers are the same, count++
            if (temp.charAt(j) === num) {
                count++;
            } else {
                // If the numbers are different, add the current count and num to the string, update num, and the new num starts from 1
                countSay += count;
                countSay += num;
                num = temp.charAt(j);
                count = 1;
            }
        }
        countSay += count;
        countSay += num;
    }
    return countSay;
};

console.log(countAndSay(1));
console.log(countAndSay(4));
