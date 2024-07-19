function topKFrequent(nums, k) {
    let frequencyMap = {};
    
    for (let num of nums) {
      frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    }
    
    let buckets = Array(nums.length + 1).fill().map(() => []);
    
    for (let num in frequencyMap) {
      buckets[frequencyMap[num]].push(Number(num));
    }
    
    let result = [];
    
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
      if (buckets[i].length > 0) {
        result.push(...buckets[i]);
      }
    }
    
    return result;
  }
  
  let nums = [1, 1, 1, 2, 2, 3];
  let k = 2;
  console.log(topKFrequent(nums, k));
  