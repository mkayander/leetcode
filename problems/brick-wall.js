"use strict";

/**
 * @param {number[][]} wall
 * @return {number}
 */
const leastBricks = (wall) => {
    const map = {};

    wall.forEach((row) =>
        row.reduce((acc, brick, index) => {
            if (index === row.length - 1 && row.length > 1) return acc;

            const current = acc + brick;

            if (current in map) {
                map[current] += 1;
            } else {
                map[current] = 1;
            }

            return current;
        }, 0)
    );

    const result = wall.length - Math.max(...Object.values(map));

    return result === 0 ? wall.length : result;
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

// console.log(leastBricks([[100000000], [100000000], [100000000]]));

console.log(
    leastBricks([
        [9, 1],
        [6, 3, 1],
        [2, 4, 1, 3],
    ])
);

console.log();
