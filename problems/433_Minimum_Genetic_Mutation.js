/**
 * @param {string} start
 * @param {string} end
 * @param {string[]} bank
 * @return {number}
 *
 * Time complexity: O(B), where B = bank.length.
 * Space complexity: O(1)
 */
const minMutation = (start, end, bank) => {
    const choices = ["A", "C", "G", "T"];
    const queue = [start];
    const seen = new Set([start]);

    let steps = 0;

    while (queue.length !== 0) {
        const nodesInQueue = queue.length;

        for (let j = 0; j < nodesInQueue; j++) {
            const node = queue.shift();

            if (node === end) return steps;

            for (const choice of choices) {
                for (let i = 0; i < node.length; i++) {
                    const neighbor = node.substring(0, i) + choice + node.substring(i + 1);

                    if (!seen.has(neighbor) && bank.includes(neighbor)) {
                        queue.push(neighbor);
                        seen.add(neighbor);
                    }
                }
            }
        }

        steps++;
    }

    return -1;
};

console.log(minMutation("AACCGGTT", "AACCGGTA", ["AACCGGTA"]));
