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

function solve() {
    let p1 = 0;

    for (let caseIndex = 0; caseIndex < input[0]; caseIndex++) {
        let [x, y, k] = input[++p1].split(" ").map(Number);

        let steps = 0;
        let isX = true;
        while (x || y) {
            if (isX) {
                x -= Math.min(x, k);
            } else {
                y -= Math.min(y, k);
            }

            isX = !isX;
            steps++;
        }

        console.log(steps);
    }
}

solve();
