const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const inp = [];

rl.on("line", function (line) {
    inp.push(line);
}).on("close", function () {
    let p1 = 0;
    for (let i = 0; i < inp[0]; i++) {
        const [n, m, start] = inp[++p1].split(" ").map(Number);
        solve(n, m, start, inp.slice(p1 + 1, p1 + 1 + m));
        p1 += m;
    }
});

// const inp = `5
// 6 3 2
// 2 ?
// 2 ?
// 2 ?
// 12 1 2
// 3 1
// 10 7 4
// 2 ?
// 9 1
// 4 ?
// 7 0
// 2 0
// 8 1
// 5 ?
// 5 3 1
// 4 0
// 4 ?
// 1 ?
// 4 1 1
// 2 ?
// `.split("\n");
// let p1 = 0;
// for (let i = 0; i < 2; i++) {
//     let [n, m, start] = inp[++p1].split(" ");
//     n = +n;
//     m = +m;
//     start = +start;
//     solve(n, m, start, inp.slice(p1 + 1, p1 + 1 + m));
//     p1 += m;
// }

function solve(n, m, start, moves) {
    const getClockwise = (start, range) => {
        return ((start - 1 + range) % n) + 1;
    };

    const getCounter = (start, range) => {
        return ((start - 1 - range + n) % n) + 1;
    };

    const seen = new Set();
    const getKey = (i, j) => `${i}-${j}`;
    const result = new Set();
    const dfs = (i, j) => {
        if (j === m) {
            result.add(i);
            return;
        }

        const key = getKey(i, j);
        if (seen.has(key)) {
            return;
        }
        seen.add(key);

        let [dist, dir] = moves[j].split(" ");
        dist = +dist;

        if (dir === "0" || dir === "?") {
            dfs(getClockwise(i, dist), j + 1);
        }
        if (dir === "1" || dir === "?") {
            dfs(getCounter(i, dist), j + 1);
        }
    };

    dfs(start, 0);

    const ids = [...result.values()];
    ids.sort((a, b) => a - b);
    console.log(ids.length);
    console.log(ids.join(" "));
}
