/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
    const map = new Map();
    const pq = new PriorityQueue({
        compare: (a, b) => a[1] - b[1],
    });

    for (const num of nums) {
        map.set(num, (map.get(num) ?? 0) + 1);
    }

    for (const [num, count] of map.entries()) {
        pq.enqueue([num, count]);
        if (pq.size() > k) {
            pq.dequeue();
        }
    }

    const result = [];
    for (const [num] of pq.toArray()) {
        result.push(num);
    }

    return result;
};
