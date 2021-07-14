Array.prototype.filter2 = function (cb) {
    const newArr = [];
    for (const val of this) {
        if (cb(val)) newArr.push(val);
    }
    return newArr;
};

const myArr = [1, 3, 5, 7, 8, 3, 1, 7, 8];

console.log(myArr.filter2((n) => n > 3));
