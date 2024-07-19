function climbStairs(n) {
    if (n <= 2) return n;
    let dp = [1, 2];
  
    for (let i = 3; i <= n; i++) {
      dp[i % 2] = dp[0] + dp[1];
    }
  
    return dp[n % 2];
  }
  

  console.log(climbStairs(2)); // Output: 2
  console.log(climbStairs(3)); // Output: 3
  