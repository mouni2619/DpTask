function groupAnagrams(strs) {
    let map = {};
  
    for (let str of strs) {
      let sortedStr = str.split('').sort().join('');
      if (!map[sortedStr]) {
        map[sortedStr] = [];
      }
      map[sortedStr].push(str);
    }
  
    return Object.values(map);
  }
  
 
  let strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
  console.log(groupAnagrams(strs)); 
  