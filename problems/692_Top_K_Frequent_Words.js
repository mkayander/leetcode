const {
    MaxPriorityQueue
} = require("@datastructures-js/priority-queue");

/**
 * @link {https://leetcode.com/problems/top-k-frequent-words/discuss/431008/Summary-of-all-the-methods-you-can-imagine-of-this-problem}
 */

/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 *
 * Custom priority arrays variant
 * loop from the end manually
 */
const topKFrequent = (words, k) => {
    const map = {};

    const counts = [];

    for (const word of words) {
        map[word] ??= 0;
        map[word]++;

        counts[map[word]] ??= [];
        counts[map[word]].push(word);
    }

    const result = [];

    for (let i = counts.length - 1; i >= 0; i--) {
        counts[i].sort();
        for (const word of counts[i]) {
            if (!result.includes(word)) {
                result.push(word);

                if (result.length === k) return result;
            }
        }
    }

    return result;
};


/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 *
 * Instead of using a max heap, we only store Top K Freqency word we have met so far in our min heap.
 * Time Complexity: O(nlogK), logK time for each word
 * Space Complexity: O(K), since the largest number of words in our minheap is K
 */
const topKFrequentMinHeapPQ = (words, k) => {
    if (words.length === 0 || k === 0) {
        return [];
    }

    // build a hash map to count words
    const hashMap = {};

    // count words
    words.forEach((w) => hashMap[w]  // O(n)
        ? hashMap[w] = hashMap[w] + 1
        : hashMap[w] = 1
    );

    const compare = ([aWord, aCount], [bWord, bCount]) => {
        // compare count first
        if (aCount !== bCount) {
            return aCount - bCount;
        }

        // if count is the same, compare string(length and alphabetic order )
        return bWord > aWord
            ? 1
            : -1;
    };

    // create a max priority queue, with custom compare function
    const maxPQ = new MaxPriorityQueue({
        compare
    });

    // iterate word count hash map and put all element into max priority queue
    Object.entries(hashMap).forEach((entry) => {
        // If minHeap's size is smaller than K, we just add the entry
        if (maxPQ.size() < k) {
            maxPQ.enqueue(entry);
        }
        // Else, we compare the current entry with "min" entry in priority queue
        else {
            if (compare(entry, maxPQ.front()) > 0) {
                maxPQ.dequeue();
                maxPQ.enqueue(entry);
            }
        }
    });

    const result = [];

    for (const entry of maxPQ.toArray()) {
        result.splice(0, 0, entry[0]);
    }

    return result;
};

console.time("topKFrequent");
console.log(topKFrequent(["i", "love", "leetcode", "i", "love", "coding"], 2));
console.timeEnd("topKFrequent");

console.time("topKFrequentMinHeapPQ");
console.log(topKFrequentMinHeapPQ(["i", "love", "leetcode", "i", "love", "coding"], 2));
console.timeEnd("topKFrequentMinHeapPQ");
