const minCost = function (colors, neededTime) {
    let result = 0;

    let prevColor = colors[0];
    let prevTime = neededTime[0];

    for (let i = 1; i < colors.length; i++) {
        const currentColor = colors[i];
        const currentTime = neededTime[i];

        if (currentColor === prevColor) {
            result += Math.min(prevTime, currentTime);
            prevColor = currentColor;
            prevTime = Math.max(prevTime, currentTime);
        } else {
            prevColor = currentColor;
            prevTime = currentTime;
        }
    }

    return result;
};

console.log(minCost("aabaa", [1, 2, 3, 4, 1]));
