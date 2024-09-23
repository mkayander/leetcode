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
        const [n, k] = input[++p1].split(" ").map(Number);

        const getVal = (i) => {
            const val1 = ((i + k - 1 + k) * i) / 2;
            const val2 = ((k + n - 1 + k) * n) / 2 - val1;
            return [val1, val2];
        };

        let lo = 1;
        let hi = n;
        let curr = 1;

        while (lo <= hi) {
            const mid = Math.floor((lo + hi) / 2);
            const [a, b] = getVal(mid);
            if (b > a) {
                curr = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }

        const [a1, b1] = getVal(curr);
        const [a2, b2] = getVal(curr + 1);
        console.log(Math.min(b1 - a1, a2 - b2));
    }
}

solve();
