/**
    You play a game consisting of n rooms and m tunnels. Your initial score is 0, and each tunnel increases your score by x where x may be both positive or negative. You may go through a tunnel several times.
    Your task is to walk from room 1 to room n. What is the maximum score you can get?

    Input
    The first input line has two integers n and m: the number of rooms and tunnels. The rooms are numbered 1,2,\dots,n.
    Then, there are m lines describing the tunnels. Each line has three integers a, b and x: the tunnel starts at room a, ends at room b, and it increases your score by x. All tunnels are one-way tunnels.
    You can assume that it is possible to get from room 1 to room n.

    Output
    Print one integer: the maximum score you can get. However, if you can get an arbitrarily large score, print -1.

    Constraints
    1 \le n \le 2500
    1 \le m \le 5000
    1 \le a,b \le n
    -10^9 \le x \le 10^9

    Example
    Input:
    4 5
    1 2 3
    2 4 -1
    1 3 -2
    3 4 7
    1 4 4

    Output:
    5
 **/

/**
 * @param {number} n
 * @param {number} m
 * @param {number[][]} tunnels
 * @return {number}
 */
function maxScore(n, m, tunnels) {
    // Bellman-Ford algorithm to find the longest path
    function bellmanFord(n, edges, start) {
        const dist = new Array(n + 1).fill(-Infinity);
        dist[start] = 0;

        // Relax edges up to n-1 times
        for (let i = 0; i < n - 1; i++) {
            for (const [from, to, weight] of edges) {
                if (dist[from] !== -Infinity && dist[from] + weight > dist[to]) {
                    dist[to] = dist[from] + weight;
                }
            }
        }

        // Check for negative weight cycles
        for (let i = 0; i < n; i++) {
            for (const [from, to, weight] of edges) {
                if (dist[from] !== -Infinity && dist[from] + weight > dist[to]) {
                    dist[to] = Infinity; // Mark node as part of a negative cycle
                }
            }
        }

        return dist;
    }

    const edges = tunnels;
    const dist = bellmanFord(n, edges, 1);

    // If distance to the last node is infinity, there is a negative weight cycle
    if (dist[n] === Infinity) {
        return -1;
    }

    return dist[n];
}

// Example usage:
let n = 4,
    m = 5;
let tunnels = [
    [1, 2, 3],
    [2, 4, -1],
    [1, 3, -2],
    [3, 4, 7],
    [1, 4, 4],
];
console.log(maxScore(n, m, tunnels)); // Output: 5
