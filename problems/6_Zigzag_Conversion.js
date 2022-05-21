/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
const convert = (s, numRows) => {
    if (numRows === 1) return s;

    const arrays = Array.from({ length: numRows }, () => []);
    let rowIndex = 0;
    let direction = 1;

    for (const i in s) {
        arrays[rowIndex].push(s[i]);

        if (rowIndex === 0 && i !== 0) {
            direction = 1;
        } else if (rowIndex === numRows - 1) {
            direction = -1;
        }

        rowIndex += direction;
    }

    return arrays.reduce((acc, curr) => acc + curr.join(""), "");
};

console.log(convert("PAYPALISHIRING", 3));
