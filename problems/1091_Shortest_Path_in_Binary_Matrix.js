/**
 * @param {number[][]} grid
 * @return {number}
 */
const shortestPathBinaryMatrix = (grid) => {
    // All 8 possible directions to check
    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
    ];

    // If enter cell is non-zero, there's no paths
    if (grid[0][0] === 1) return -1;

    // Grid is always a square, so we can measure the size by the Y length
    const size = grid.length;

    // Initial point in the queue
    const queue = [[0, 0, 1]];

    // Process queue while it's not empty
    while (queue.length) {
        // Destructure first array-entry in queue to variables
        const [row, col, length] = queue.shift();

        // If we are at the bottom left cell, then we succeeded, return current length
        if (row === size - 1 && col === size - 1) return length;

        // Go through each direction from current cell
        for (const [dx, dy] of directions) {
            let x = row + dx;
            let y = col + dy;

            // if invalid, continue
            if (x < 0 || x >= size) continue;
            if (y < 0 || y >= size) continue;
            if (grid[x][y] !== 0) continue;

            // if all is good, push new cell to the queue to continue calculation
            queue.push([x, y, length + 1]);

            // mark visited cell as invalid, to ensure we won't calculate it multiple times
            grid[x][y] = 1;
        }
    }

    // no valid option was found
    return -1;
};

console.log(
    shortestPathBinaryMatrix([
        [0, 1, 1, 0, 0, 0],
        [0, 1, 0, 1, 1, 0],
        [0, 1, 1, 0, 1, 0],
        [0, 0, 0, 1, 1, 0],
        [1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 0],
    ])
);
