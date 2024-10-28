function strToBytes(str) {
    const encoder = new TextEncoder("utf-8");
    return encoder.encode(str).buffer;
}

function bytesToStr(buffer) {
    const uint8array = new Uint8Array(buffer);
    return new TextDecoder().decode(uint8array);
}

const readNumber = (str, from, to) => {
    let num = 0;
    for (let i = from; i < to; i++) {
        num = num * 10 + Number(str[i]);
    }
    return num;
};

export function compress(text) {
    const lines = text.split("\n");
    const array = new Uint8Array(lines.length * 5);

    let p1 = 0;
    for (const line of lines) {
        const body = readNumber(line, 1, 3);
        const pos = readNumber(line, 3, 5);
        const branch = readNumber(line, 5, 7);
        const trunk = readNumber(line, 7, 9);
        const month = readNumber(line, 9, 11);
        const year = readNumber(line, 11, 13);

        array[p1++] = body;
        array[p1++] = pos;
        const branchTrunk = (branch - 1) * 12 + (trunk - 1);
        array[p1++] = branchTrunk;
        array[p1++] = month;
        array[p1++] = year;
    }

    return array.buffer;
}

export function decompress(buffer) {
    const array = new Uint8Array(buffer);
    const lines = [];

    for (let i = 0; i < array.length; i += 5) {
        const line = ["辰"];

        const body = array[i];
        const pos = array[i + 1];
        const branchTrunk = array[i + 2];
        const month = array[i + 3];
        const year = array[i + 4];

        line.push(body.toString().padStart(2, "0"));
        line.push(pos.toString().padStart(2, "0"));
        line.push(
            Math.floor(branchTrunk / 12 + 1)
                .toString()
                .padStart(2, "0"),
        );
        line.push(((branchTrunk % 12) + 1).toString().padStart(2, "0"));
        line.push(month.toString().padStart(2, "0"));
        line.push(year.toString().padStart(2, "0"));

        lines.push(line.join(""));
    }

    return lines.join("\n");
}

function test() {
    const text = `辰112404110313
辰120904070423
辰260702060324
辰360701040830
辰422106090721
辰712404040804
辰932201121106`;

    const buffer = compress(text);
    const restored_text = decompress(buffer);
    console.log(restored_text);

    if (text !== restored_text) {
        console.log("decompress(compress(x)) != x");
    }

    console.log(text.length, buffer.byteLength, buffer.byteLength / text.length);
}

test();
