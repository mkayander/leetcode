const inc = (function () {
    let counter = 0;
    return () => ++counter;
})();

console.log(inc());
console.log(inc());
console.log(inc());
