const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let inp = [];

rl.on("line", function (line) {
    inp.push(line);
}).on("close", function () {
    let p1 = 0;
    for (let i = 0; i < inp[0]; i++) {
        solve(inp[++p1], inp[++p1].split(" "), inp[++p1]);
    }
});

// const inp = `5
// 1
// 1
// 0
// 5
// 1 2 4 5 3
// 10101
// 5
// 5 4 1 3 2
// 10011
// 6
// 3 5 6 1 2 4
// 010000
// 6
// 1 2 3 4 5 6
// 100110`.split("\n");

// const inp = `1
// 5
// 1 2 4 5 3
// 10101`.split("\n");

// let p1 = 0;
// for (let i = 0; i < inp[0]; i++) {
//     solve(inp[++p1], inp[++p1].split(" "), inp[++p1]);
// }

function solve(size, arr, colors) {
    size = +size;

    const result = new Array(size).fill(-1); // Memoized result of black counts

    // Traverse function to process each index
    const traverse = (i) => {
        let curr = i;
        let blackCount = 0;
        const path = [];

        // Traverse until we revisit a node or encounter a precomputed result
        while (result[curr] === -1) {
            path.push(curr); // Track nodes in the current path
            result[curr] = -2; // Temporary mark to avoid cycles
            if (colors[curr] === "0") {
                blackCount++;
            }
            curr = arr[curr] - 1; // Move to next node in the cycle
        }

        // If we hit an already computed node, add its precomputed value
        if (result[curr] !== -2) {
            blackCount += result[curr];
        }

        // Assign the computed value to all nodes in the path
        for (const node of path) {
            result[node] = blackCount;
        }

        return blackCount;
    };

    // Iterate through each index and process if not already computed
    for (let i = 0; i < size; i++) {
        if (result[i] === -1) {
            traverse(i);
        }
    }

    console.log(result.join(" "));
}
