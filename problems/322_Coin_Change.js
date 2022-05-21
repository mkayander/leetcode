/**
 *
 * @link {https://leetcode.com/problems/coin-change/discuss/1132171/JavaScript-Solution-with-Explanation}
 *
 * @param {number[]} coins
 * @param {number} amount
 * @returns {number}
 */
const coinChange = (coins, amount) => {
    // dp[i] represents the least amount of coins that can make the value equals to the i
    const dp = Array(amount + 1).fill(Infinity); // This arr tells us how many coins we need for each amount.

    dp[0] = 0; // To make 0, we need 0 coins.

    for (const coin of coins) {
        // Check each coin
        for (let i = coin; i <= amount; i++) {
            // Iterate through the entire amount from coin
            dp[i] = Math.min(dp[i], dp[i - coin] + 1); // Update minimum number of needed coins.
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount]; // If the last element is Infinity, then we cannot make the amount.
};

console.log(coinChange([1, 2, 5], 11));
console.log(coinChange([186, 419, 83, 408], 6249));
