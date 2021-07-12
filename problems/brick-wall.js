"use strict";

/**
 * @param {number[][]} wall
 * @return {number}
 */
const leastBricks = (wall) => {
    // const getWidth = (row) => row.reduce((acc, val) => acc + val, 0);

    let result = [];

    for (let i = 0; i < wall[0].reduce((acc, val) => acc + val); i++) {
        let crossCount = 0;

        wall.forEach((row) => {
            let targetFits = false;
            row.reduce((acc, brick) => {
                if (targetFits) return acc;

                const current = acc + brick;
                if (current === i) targetFits = true;
                return current;
            }, 0);

            if (!targetFits) crossCount++;
        });

        result.push(crossCount);
    }

    return Math.min(...result);
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
