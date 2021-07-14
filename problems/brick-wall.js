/**
 * @param {number[][]} wall
 * @return {number}
 */
const leastBricks = (wall) => {
    const map = {};
    let max = 0;

    wall.forEach((row) => {
        let sum = 0;
        for (let i = 0; i < row.length - 1; i++) {
            sum += row[i];
            if (sum in map) {
                map[sum] += 1;
            } else {
                map[sum] = 1;
            }

            if (map[sum] > max) max = map[sum];
        }
    });

    return wall.length - max;
};

console.log(
    leastBricks([
        [1, 2, 2, 1],
        [3, 1, 2],
        [1, 3, 2],
        [2, 4],
        [3, 1, 2],
        [1, 3, 1, 1],
    ])
);

console.log(leastBricks([[1], [1], [1]]));

console.log(leastBricks([[1, 1], [2], [1, 1]]));

console.log(leastBricks([[100000000], [100000000], [100000000]]));

console.log(
    leastBricks([
        [9, 1],
        [6, 3, 1],
        [2, 4, 1, 3],
    ])
);

console.log(
    leastBricks([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ])
);

console.log(
    leastBricks([
        [6, 2, 2],
        [1, 4, 4, 1],
        [2, 5, 3],
    ])
);

console.log(leastBricks([[79, 12, 208, 1]])); // Expected: 0

console.log("");
