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

function solve(input) {
    let idx = 0;

    const t = parseInt(input[idx++]);
    const results = [];

    for (let caseIndex = 0; caseIndex < t; caseIndex++) {
        const [n, m, start] = input[idx++].split(" ").map(Number);
        let possiblePositions = new Set([start]);

        for (let i = 0; i < m; i++) {
            const [ri, ci] = input[idx++].split(" ");
            const r = parseInt(ri);
            let newPositions = new Set();

            possiblePositions.forEach((pos) => {
                if (ci === "0" || ci === "?") {
                    // Clockwise move
                    newPositions.add(((pos - 1 + r) % n) + 1);
                }
                if (ci === "1" || ci === "?") {
                    // Counterclockwise move
                    newPositions.add(((pos - 1 - r + n) % n) + 1);
                }
            });

            possiblePositions = newPositions;
        }

        let result = Array.from(possiblePositions).sort((a, b) => a - b);
        results.push(result.length + "\n" + result.join(" "));
    }

    console.log(results.join("\n"));
}
