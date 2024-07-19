function maxRepeating(sequence, word) {
    let k = 0;
    let repeatedWord = word;
    
    while (sequence.includes(repeatedWord)) {
      k++;
      repeatedWord += word;
    }
    
    return k;
  }
  

  console.log(maxRepeating("ababc", "ab")); // Output: 2
  console.log(maxRepeating("ababc", "ba")); // Output: 1
  console.log(maxRepeating("ababc", "ac")); // Output: 0
  