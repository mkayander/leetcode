const obj = {
    foo: 1,
    bar: {
        baz: 2,
        bib: {
            val: "hello",
            car: {
                mark: "vaz",
                model: "2108",
                wheels: ["fl", "fr", "rl", "rr"],
                honk() {
                    return "Honk honk!";
                },
                get color() {
                    console.log("getting color");
                    return "blue";
                },
                drive: (speed) => {
                    return speed + 50;
                },
            },
        },
    },
    name: "Max",
    pes: {
        temp: 10,
    },
};

const cleanClone = (source) => {
    let key, value;
    let clone = Object.create(source);

    for (key in source) {
        if (Object.hasOwnProperty.call(source, key) === true) {
            value = source[key];

            // console.log(Object.getOwnPropertyDescriptors(value));

            if (value !== null && typeof value === "object") {
                clone[key] = cleanClone(value);
            } else {
                clone[key] = value;
            }
        }
    }
    return clone;
};

const brother = cleanClone(obj);
brother.bar.baz = 255;
console.log("-------------\n", "Results: ");
console.log(brother, "\n", brother.bar.bib.car);
console.log("initial: ", obj);
