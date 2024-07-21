const words = ["hello", "world", "javascript", "is", "awesome"];

// N - number of words
// M - longest word
// T - input word
// T * M
class Solution {
  constructor(words) {
    this.words = words;
  }

  // M * N
  findOneDistance(word) {
    for (const word2 of this.words) {
      if (this.isOneDistance(word, word2)) return true;
    }

    return false;
  }

  // M
  isOneDistance(a, b) {
    if (a.length !== b.length) return false;

    let foundDiff = false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        if (foundDiff) return false;
        foundDiff = true;
      }
    }

    return true;
  }
}

const solution = new Solution(words);
console.log(solution.findOneDistance("hell"));
console.log(solution.findOneDistance("helo"));
console.log(solution.findOneDistance("world"));
console.log(solution.findOneDistance("wold"));
console.log(solution.findOneDistance("wod"));
console.log(solution.findOneDistance("wodl"));
console.log(solution.findOneDistance("wodld"));
