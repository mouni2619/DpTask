function coinChange(coins, amount) {
    let dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
      for (let coin of coins) {
        if (i - coin >= 0) {
          dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
      }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
  }
  

  console.log(coinChange([1, 2, 5], 11)); // Output: 3
  console.log(coinChange([2], 3)); // Output: -1
  console.log(coinChange([1], 0)); // Output: 0
  