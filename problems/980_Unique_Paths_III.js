var uniquePathsIII = function (grid) {
    let count = 0;
    const lenX = grid.length;
    const lenY = grid[0].length;
    let visitable = 0;
    let start;

    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];

    for (let i = 0; i < lenX; i++) {
        for (let j = 0; j < lenY; j++) {
            if (grid[i][j] === 1) start = [i, j]; // Check starting point
            if (grid[i][j] === 0) visitable++; // Number of allowed grid squares
        }
    }

    const dfs = (start, visitable) => {
        const [px, py] = start;
        if (grid[px][py] === -1) return; // Faced an obstacle

        if (grid[px][py] === 2) {
            // Final grid square
            if (!visitable) count++; // All grid squares visited
            return; // Exit
        }

        for (const [dx, dy] of directions) {
            const [x, y] = [px + dx, py + dy];
            // If new square is in bounds and not an obstacle
            if (x >= 0 && y >= 0 && x < lenX && y < lenY && grid[x][y] !== -1) {
                // Setting current grid square as obstacle to prevent revisit
                grid[px][py] = -1;

                dfs([x, y], visitable - 1);

                // Reset current grid square
                grid[px][py] = 0;
            }
        }
    };

    // +1 , as we also count the starting grid square
    dfs(start, visitable + 1);
    return count;
};
