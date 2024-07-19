function isAnagram(s, t) {
    if (s.length !== t.length) return false;
  
    let count = {};
  
    for (let char of s) {
      count[char] = (count[char] || 0) + 1;
    }
  
    for (let char of t) {
      if (!count[char]) return false;
      count[char]--;
    }
  
    return true;
  }
  
  let s1 = "anagram", t1 = "nagaram";
  console.log(isAnagram(s1, t1)); 
  
  let s2 = "rat", t2 = "car";
  console.log(isAnagram(s2, t2));
  