const readline = require("readline");

// Create interface to read from stdin
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];

// Collect input line by line
rl.on("line", function (line) {
    input.push(line);
});

// When input is complete, solve the problem
rl.on("close", function () {
    solve(input);
});

// const input = `1
// 5
// 1 0
// 1 1
// 3 0
// 5 0
// 2 1`.split("\n");

function solve() {
    let p1 = 0;

    for (let caseIndex = 0; caseIndex < input[0]; caseIndex++) {
        const n = +input[++p1];

        const grid = [];
        const arr = [];
        const seen = new Set();

        for (let i = 0; i < n; i++) {
            const line = input[++p1];
            const [x, y] = line.split(" ").map(Number);
            arr.push([x, y]);
            seen.add(line);
            grid[x] = (grid[x] ?? 0) + 1;
        }

        let result = 0;
        for (const x in grid) {
            if (grid[x] === 2) {
                result += n - 2;
            }
        }

        for (const line of seen) {
            const [x, y] = line.split(" ").map(Number);
            const a = `${x - 1} ${y ^ 1}`;
            const b = `${x + 1} ${y ^ 1}`;
            if (seen.has(a) && seen.has(b)) {
                result++;
            }
        }

        console.log(result);
    }
}

solve();
