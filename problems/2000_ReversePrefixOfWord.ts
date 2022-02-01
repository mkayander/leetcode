const reversePrefix = (word: string, ch: string): string => {
    const end = word.indexOf(ch) + 1;

    return word.slice(0, end).split("").reverse().join("") + word.slice(end);
};

console.log(reversePrefix("abcdefd", "d"));
