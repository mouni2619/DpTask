function coinChange(coins, amount) {
    // Initialize dp array with amount + 1, which is an impossible high value
    let dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0; // Base case: no coins needed to make amount 0

    // Fill dp array
    for (let a = 1; a <= amount; a++) {
        for (let coin of coins) {
            if (a - coin >= 0) { // Check if coin can be used
                dp[a] = Math.min(dp[a], dp[a - coin] + 1);
            }
        }
    }

    // If dp[amount] is still amount + 1, it means it's not possible to make that amount
    return dp[amount] === amount + 1 ? -1 : dp[amount];
}

// Test cases
console.log(coinChange([1, 2, 5], 11)); // Output: 3
console.log(coinChange([2], 3));        // Output: -1
console.log(coinChange([1], 0));        // Output: 0
