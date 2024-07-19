let nums = [2, 7, 11, 15];
let target = 17;
let map = {};
let result = [];

for (let i = 0; i < nums.length; i++) {
  let complement = target - nums[i];
  if (map[complement] !== undefined) {
    result = [map[complement], i];
    break;
  }
  map[nums[i]] = i;
}

console.log(result); // Output: [0, 3]
