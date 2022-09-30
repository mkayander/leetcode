const getSkyline = (buildings: Array<[number, number, number]>) => {
    /*
    First, register all building start/end events.
    To distinguish them, we'll register the starts with
    positive heights and the ends with negative heights.
    */

    const data: Array<[number, number]> = [];

    for (let [x1, x2, h] of buildings) {
        data.push([x1, h], [x2, -h]);
    }

    /*
    Then, we sort the events by from leftmost to rightmost
    x-coordinate. If there's a tie, then we pick first
    those events with higher height
    */

    data.sort(([x1, h1], [x2, h2]) => x1 - x2 || h2 - h1);

    /*
    Next, we want to iterate over the events (from leftmost
    to rightmost, since we sorted them that way) and keep
    track of the heights we see. If it is positive, we add it;
    if it is negative, we remove it.
    
    We want to keep these heights sorted. This way, at any
    given coordinate we will know which is the biggest height,
    which is what we need to calculate our output.
    
    Since we want to keep heights sorted, whenever we want to
    add or remove a height we'll have to use binary search to
    be efficient.
    */

    const heights: number[] = [];

    const processHeight = (heights: number[], h: number, add: boolean) => {
        let left = 0;
        let right = heights.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (heights[mid] >= h) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        if (add) {
            heights.splice(left, 0, h);
        } else {
            heights.splice(left, 1);
        }
    };

    const answer = [];

    let previousHeight = 0;

    for (let [x, h] of data) {
        if (h > 0) {
            processHeight(heights, h, true);
        } else {
            processHeight(heights, -h, false);
        }

        let currentHeight = heights[heights.length - 1] || 0;

        if (currentHeight !== previousHeight) {
            answer.push([x, currentHeight]);
            previousHeight = currentHeight;
        }
    }

    return answer;
};

console.log(
    getSkyline([
        [2, 9, 10],
        [3, 7, 15],
        [5, 12, 12],
        [15, 20, 10],
        [19, 24, 8],
    ])
);
