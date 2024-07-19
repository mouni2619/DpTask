function maxSubArray(nums) {
    let maxCurrent = nums[0];
    let maxGlobal = nums[0];
  
    for (let i = 1; i < nums.length; i++) {
      maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);
      if (maxCurrent > maxGlobal) {
        maxGlobal = maxCurrent;
      }
    }
  
    return maxGlobal;
  }
  

  console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // Output: 6
  console.log(maxSubArray([1])); // Output: 1
  console.log(maxSubArray([5, 4, -1, 7, 8])); // Output: 23
  