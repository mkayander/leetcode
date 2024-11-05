const isNumber = (char) => char >= "0" && char <= "9";

const getByPath = (source, path) => {
    if (!path) return source;

    const steps = path.split(".");
    let current = source;
    for (const step of steps) {
        if (current === undefined) return current;

        let i = 0;
        const parseName = () => {
            const chars = [];
            for (i; i < step.length && step[i] !== "(" && step[i] !== "["; i++) {
                chars.push(step[i]);
            }

            return chars.join("");
        };
        const parseIndex = () => {
            let index = 0;
            while (isNumber(step[++i])) {
                index *= 10;
                index += +step[i];
            }
            i++;

            return index;
        };

        const name = parseName();
        current = current[name];
        while (i < step.length && current !== undefined) {
            if (step[i] === "(") {
                if (typeof current !== "function") return undefined;
                current = current();
                i += 2;
            } else if (step[i] === "[") {
                const index = parseIndex();
                if (!current) return undefined;

                current = current[index];
            } else {
                console.error("What?");
                break;
            }
        }
    }

    return current;
};

const uniqArrayItemGenerator = (array, path) => {
    let i = -1;
    const indexes = [];
    const seen = new Set();

    const next = () => {
        i++;
        if (i >= array.length) {
            return {
                done: true,
                value: indexes,
            };
        }

        const key = getByPath(array[i], path);
        if (seen.has(key)) {
            return next();
        }
        seen.add(key);

        indexes.push(i);
        return { done: false, value: i };
    };

    return { next };
};

module.exports = uniqArrayItemGenerator;

function test() {
    const { next } = uniqArrayItemGenerator([5, 5, 7, 7, 8, 9, 9]);

    console.log(next()); // { done: false, value: 0 }
    console.log(next()); // { done: false, value: 2 }
    console.log(next()); // { done: false, value: 4 }
    console.log(next()); // { done: false, value: 5 }
    console.log(next()); // { done: true, value: [0, 2, 4, 5] }
}

function test2() {
    const deepArray = [
        { row: { value: "test" } },
        { row: { value: "Test" } },
        { row: { value: "test" } },
        {
            row: {
                value: function () {
                    return "12345";
                },
            },
        },
        { row: { value: "Test" } },
        { row: { value: "test 1" } },
        {
            row: {
                value: function () {
                    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, () => 20];
                },
            },
        },
        {
            row: {
                value: function () {
                    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, () => 21];
                },
            },
        },
        {
            row: {
                value: function () {
                    return "12345";
                },
            },
        },
        { row: { value: [1, 2, 3, 4, 5] } },
    ];

    const { next } = uniqArrayItemGenerator(deepArray, "row.value()[10]()");

    // { done: false, value: 0 }
    // -----------------------------
    // 1. row == {value: 'test'}
    // 2. row.value не является функцией - его нельзя вызвать
    // 3. уникальность определяет undefined
    console.log(next());

    // { done: false, value: 3 }
    // -----------------------------
    // 1. row == {value: function() { return '789' }}
    // 2. row.value() == '789'
    // 3. row.value()[2] == '9'
    // 4. уникальность определяет '9'
    console.log(next());

    // { done: false, value: 6 }
    // -----------------------------
    // 1. row == {value: function() { return [7, 8, 9] }}
    // 2. row.value() == [7, 8, 9]
    // 3. row.value()[2] == 9
    // 4. уникальность определяет 9
    console.log(next());

    console.log(next()); // { done: true, value: [0, 3, 6] }
}

test2();
