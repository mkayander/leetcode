export {};
declare global {
    interface Array<T> {
        filter2(
            cb: (item: T, index: number, arr: Array<T>) => boolean,
            thisArg?: any
        ): Array<T>;
    }
}

Array.prototype.filter2 = function (cb, thisArg) {
    const newArr = [];
    const func = thisArg !== undefined ? cb.bind(thisArg) : cb;
    for (let i = 0; i < this.length; i++) {
        if (func(this[i], i, this)) newArr.push(this[i]);
    }
    return newArr;
};

const myArr = [1, 3, 5, 7, 8, 3, 1, 7, 8];

console.log(
    myArr.filter2(
        function (this: any, n, index, arr) {
            console.log(index, arr);
            console.log("this: ", this);

            return n > 3;
        },
        { coder: { name: "Max" } }
    )
);
