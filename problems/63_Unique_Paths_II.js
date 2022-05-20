/**
 * {@link https://leetcode.com/problems/unique-paths-ii/discuss/1180311/JS-Python-Java-C%2B%2B-or-Easy-DP-Solution-w-Explanation Description}
 * @param {number[][]} OG - Obstacle Grid
 * @returns {number|*}
 */
const uniquePathsWithObstacles = (OG) => {
    // Check if first cell is an obstacle
    if (OG[0][0]) return 0;

    // Y axis size
    let m = OG.length;

    // X axis size
    let n = OG[0].length;

    // Dynamic Programming (DP) matrix
    // This will make a copy of the OG matrix with all cells being equal to 0
    // We can also use a 1D array instead of a 2D matrix, since w
    let dp = Array.from({ length: m }, () => new Uint32Array(n));

    // The initial cell
    dp[0][0] = 1;

    for (let y = 0; y < m; y++) {
        for (let x = 0; x < n; x++) {
            // Skip if the cell is an obstacle or an initial cell
            // Obstacle cell will keep being equal to 0
            if (OG[y][x] || (!y && !x)) {
                continue;
            }

            // Here we check previous cells from possible directions (top and left)
            // Because, the robot can only go ro the right or the bottom
            // An obstacle cell is equal to 0, a normal cell would contain a number of valid neighbour cells
            // We sum these values and get the number of unique paths
            dp[y][x] = (y && dp[y - 1][x]) + (x && dp[y][x - 1]);
        }
    }

    // The bottom-right cell of the DP matrix is our answer
    return dp[m - 1][n - 1];
};

console.log(
    uniquePathsWithObstacles([
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
    ])
);
