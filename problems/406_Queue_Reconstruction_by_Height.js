/**
 * {@link https://leetcode.com/problems/queue-reconstruction-by-height/discuss/2211641/Visual-Explanation-or-JAVA-Greedy}
 * @param {number[][]} people
 * @return {number[][]}
 */
const reconstructQueue = (people) => {
    people.sort((a, b) => (b[0] - a[0]) || (a[1] - b[1]));

    const result = [];

    for (const item of people) {
        result.splice(item[1], 0, item);
    }

    return result;
};

console.log(reconstructQueue([[5,1],[3,1],[7,0]]));
