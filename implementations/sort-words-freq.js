const words = [
    "banana",
    "grapefruit",
    "banana",
    "orange",
    "banana",
    "apple",
    "tomato",
    "tomato",
    "tomato",
    "tomato",
    "orange",
];

const getFreqMap = (words) => {
    const map = {};

    words.forEach((word) => {
        map[word] = map[word] === undefined ? 1 : map[word] + 1;
    });

    console.log(map);

    return Object.keys(map).sort((a, b) => map[b] - map[a]);
};

console.log(getFreqMap(words));
