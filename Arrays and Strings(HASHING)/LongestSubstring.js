function lengthOfLongestSubstring(s) {
    let map = {};
    let maxLen = 0;
    let start = 0;
  
    for (let i = 0; i < s.length; i++) {
      if (map[s[i]] !== undefined && map[s[i]] >= start) {
        start = map[s[i]] + 1;
      }
      map[s[i]] = i;
      maxLen = Math.max(maxLen, i - start + 1);
    }
  
    return maxLen;
  }
  
  let s = "abcabcbb";
  console.log(lengthOfLongestSubstring(s));