/**
 * @link https://leetcode.com/problems/critical-connections-in-a-network/discuss/1174196/JS-Python-Java-C%2B%2B-or-Tarjan's-Algorithm-Solution-w-Explanation
 * @link https://www.thealgorists.com/Algo/GraphTheory/Tarjan/Bridges
 *
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
const criticalConnections = function (n, connections) {
    let edgeMap = {};

    // Fill map with empty arrays for each node number
    for (let i = 0; i < n; i++) edgeMap[i] = [];

    // Fill node arrays with the connected node numbers
    for (let [a, b] of connections) {
        edgeMap[a].push(b);
        edgeMap[b].push(a);
    }

    console.log("edgeMap: ", edgeMap);

    // There's no big reason to use Uint32Array here, works with simple arrays too
    let disc = new Uint32Array(n),
        low = new Uint32Array(n),
        time = 1,
        result = [];

    /**
     * DFS - Depth First Search
     * @param {number} curr Current node number
     * @param {number} prev Previous node number
     */
    const dfs = (curr, prev) => {
        // Update time
        disc[curr] = low[curr] = time++;

        // Go through the nodes that are connected to curr
        for (let next of edgeMap[curr]) {
            if (!disc[next]) {
                dfs(next, curr);

                // We write the lowest discovery time here
                low[curr] = Math.min(low[curr], low[next]);
            } else if (next !== prev) {
                low[curr] = Math.min(low[curr], disc[next]);
            }

            // If the next's lowest discovery time is bigger than current, push to results
            if (low[next] > disc[curr]) {
                result.push([curr, next]);
            }
        }
    };

    dfs(0, -1);

    return result;
};

console.log(
    criticalConnections(4, [
        [0, 1],
        [1, 2],
        [2, 0],
        [1, 3],
    ])
);
console.log(criticalConnections(2, [[0, 1]]));
console.log(
    criticalConnections(6, [
        [0, 1],
        [1, 2],
        [2, 0],
        [1, 3],
        [3, 4],
        [4, 5],
        [5, 3],
    ])
);
