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
        const result = [];

        const rows = +input[++p1];
        for (let row = 0; row < rows; row++) {
            const line = input[++p1];
            result.push(line.indexOf("#") + 1);
        }

        result.reverse();
        console.log(result.join(" "));
    }
}

solve();
