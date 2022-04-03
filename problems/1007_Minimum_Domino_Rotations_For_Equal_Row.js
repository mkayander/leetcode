/**
 * @param {number[]} tops
 * @param {number[]} bottoms
 * @return {number}
 */
const minDominoRotations = function (tops, bottoms) {
    const topMap = {};
    const bottomMap = {};

    for (let i = 0; i < tops.length; i++) {
        if (topMap[tops[i]]) {
            topMap[tops[i]].push(i);
        } else {
            topMap[tops[i]] = [i];
        }

        if (bottomMap[bottoms[i]]) {
            bottomMap[bottoms[i]].push(i);
        } else {
            bottomMap[bottoms[i]] = [i];
        }
    }

    const topBest = Object.entries(topMap).sort(
        (a, b) => b[1].length - a[1].length
    )[0];

    const bottomBest = Object.entries(bottomMap).sort(
        (a, b) => b[1].length - a[1].length
    )[0];

    let best;
    let opposite;

    if (topBest[1].length > bottomBest[1].length) {
        best = topBest;
        opposite = bottoms;
    } else {
        best = bottomBest;
        opposite = tops;
    }

    let result = 0;

    console.log(topMap);
    console.log(bottomMap);
    console.log(topBest);
    console.log(bottomBest);

    for (let i = 0; i < tops.length; i++) {
        if (!best[1].includes(i)) {
            if (Number(best[0]) === opposite[i]) {
                result++;
            } else {
                return -1;
            }
        }
    }

    // for (let i = 0; i < tops.length; i++) {}

    return result;
};

console.log(
    minDominoRotations([1, 2, 1, 1, 1, 2, 2, 2], [2, 1, 2, 2, 2, 2, 2, 2])
);
