class Fruit {}

Object.assign(Fruit, {
    color: "red",
    names: [],
    addName(name) {
        this.names.push(name);
    },
});

console.log(typeof Fruit);
console.log(typeof Fruit.prototype);
console.log(Fruit.prototype);
console.log(Fruit.prototype.constructor);
console.log(Fruit.prototype.constructor === Fruit);
console.log(Fruit.prototype.constructor.prototype);
console.log(Fruit.prototype.constructor.prototype.prototype);
console.log(Fruit.prototype.__proto__);
console.log(Function === Fruit.prototype.__proto__);
