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
        const [a, b] = input[++p1].split(" ").map(Number);
        console.log(b - a);
    }
}

solve();
