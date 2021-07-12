"use strict";

/**
 * @param {number[][]} wall
 * @return {number}
 */
const leastBricks = (wall) => {
    const map = {};
    let max = 0;

    wall.forEach((row) =>
        row.reduce((acc, brick, index) => {
            if (index === row.length - 1 && row.length > 1) return acc;

            const current = acc + brick;

            if (current in map) {
                map[current] += 1;
            } else {
                map[current] = 1;
            }

            max = Math.max(map[current], max);

            return current;
        }, 0)
    );

    let isLong = false;
    let prevValue;

    wall.forEach((row, index) => {
        if (index > 0 && row.length > 1 && prevValue !== row) isLong = true;

        prevValue = row;
    });

    if (!isLong) return wall.length;

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

// console.log(leastBricks([[100000000], [100000000], [100000000]]));

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
