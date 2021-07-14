Array.prototype.filter2 = function (cb) {
    const newArr = [];
    for (const index in this) {
        if (cb(this[index], index, this)) newArr.push(this[index]);
    }
    return newArr;
};

const myArr = [1, 3, 5, 7, 8, 3, 1, 7, 8];

console.log(myArr.filter2((n) => n > 3));
