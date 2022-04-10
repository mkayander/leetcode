/**
 *
 * @param {string} string
 */
function isUnique(string) {
    const map = {};

    for (const char of string) {
        if (map[char]) {
            return false;
        }

        map[char] = 1;
    }

    return true;
}

console.log(isUnique("abcdef")); // -> true
console.log(isUnique("1234567")); // -> true
console.log(isUnique("abcABC")); // -> true
console.log(isUnique("abcadef")); // -> false

console.log("/// Flatten ///");

const flatten = (array) =>
    array.reduce((acc, curr) => {
        if (Array.isArray(curr)) {
            const flattened = flatten(curr);
            acc.push(...flattened);
        } else {
            acc.push(curr);
        }

        return acc;
    }, []);

console.log(flatten([[1], [[2, 3]], [[[4]]]])); // -> [1, 2, 3, 4]

console.log("/// isStringRotated ///");

function isStringRotated(source, test) {
    // for (let i = 0; i < source.length; i++) {
    //     const current = source.slice(i, source.length) + source.slice(0, i);
    //     if (current === test) return true;
    // }
    //
    // return false;

    return source.length === test.length && (source + source).includes(test);
}

console.log(isStringRotated("javascript", "scriptjava")); // -> true
console.log(isStringRotated("javascript", "iptjavascr")); // -> true
console.log(isStringRotated("javascript", "java")); // -> false

console.log("/// rotate matrix ///");

const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];

function rotate(source) {
    const result = [...source[0]].map(() => []);

    for (let v = 0; v < source.length; v++) {
        for (let h = 0; h < source[0].length; h++) {
            result[h][source.length - 1 - v] = source[v][h];
        }
    }

    return result;
}

console.log(rotate(matrix));

console.log("/// search ///");

// Time: O(n)
function search(array, target) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === target) {
            return i;
        }
    }
    return -1;
}

// Time: O(log(n))
function binarySearch(array, target) {
    let start = 0;
    let end = array.length - 1;

    if (target < array[start] || target > array[end]) {
        return -1;
    }

    while (start <= end) {
        if (target === array[start]) {
            return start;
        }

        if (target === array[end]) {
            return end;
        }

        const middle = Math.floor((start + end) / 2);

        if (target > array[middle]) {
            start = middle + 1;
        } else if (target < array[middle]) {
            end = middle - 1;
        } else {
            return middle;
        }
    }

    return -1;
}

console.log(search([1, 3, 6, 13, 17], 13)); // -> 3
console.log(search([1, 3, 6, 13, 17], 12)); // -> -1

console.log(binarySearch([1, 3, 6, 13, 17], 13)); // -> 3
console.log(binarySearch([1, 3, 6, 13, 17], 12)); // -> -1

console.log("/// isBalanced ///");

function isBalanced(string) {
    const openers = {
        "{": "}",
        "[": "]",
        "(": ")",
    };

    const closers = {
        "}": "{",
        "]": "[",
        ")": "(",
    };

    const stack = [];

    for (const char of string) {
        if (char in openers) {
            stack.push(char);
        } else if (char in closers) {
            if (stack.length === 0) return false;
            if (closers[char] === stack[stack.length - 1]) {
                stack.pop();
            } else {
                return false;
            }
        }
    }

    return stack.length === 0;
}

console.log(isBalanced("(x + y) - (4)")); // -> true
console.log(isBalanced("(((10 ) ()) ((?)(:)))")); // -> true
console.log(isBalanced("[{()}]")); // -> true
console.log(isBalanced("(50)(")); // -> false
console.log(isBalanced("[{]}")); // -> false

console.log("/// Queue ///");

class Queue {
    constructor() {
        this.storage = {};
        this.first = 0;
        this.last = 0;
    }

    enqueue(item) {
        this.storage[this.last] = item;
        this.last++;
    }

    dequeue() {
        if (this.size === 0) return undefined;

        const value = this.storage[this.first];

        delete this.storage[this.first];

        this.first++;

        return value;
    }

    get size() {
        return this.last - this.first;
    }

    print() {
        console.log(JSON.stringify(this.storage, null, 2));
    }
}

const queue = new Queue();

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(32);
queue.enqueue(43);
console.log(queue.size);
console.log(queue.dequeue());
console.log(queue.size);
queue.print();

console.log("/// Linked Queue ///");

class Node {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

class LinkedQueue extends Queue {
    constructor() {
        super();
        delete this.storage;
        delete this.first;
        delete this.last;

        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    enqueue(item) {
        const node = new Node(item);

        if (this.length === 0) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }

        this.length++;
    }

    dequeue() {
        const node = this.head;
        this.head = this.head.next;

        this.length--;

        return node.val;
    }

    get size() {
        return this.length;
    }

    print() {
        const arr = [];
        let current = this.head;

        while (current !== null) {
            arr.push(current.val);
            current = current.next;
        }

        console.log(arr);
    }
}

const queue2 = new LinkedQueue();

queue2.enqueue(1);
queue2.enqueue(2);
queue2.enqueue(32);
queue2.enqueue(43);
console.log(queue2.size);
console.log(queue2.dequeue());
console.log(queue2.size);
queue2.print();

console.log("/// Fibonacci ///");

function fibonacci(n) {
    const sequence = [1, 1];

    if (n < 2) {
        return sequence.slice(0, n);
    }

    while (sequence.length < n) {
        const last = sequence[sequence.length - 1];
        const prev = sequence[sequence.length - 2];
        sequence.push(last + prev);
    }

    return sequence;
}

console.log(fibonacci(8)); // -> [1, 1, 2, 3, 5, 8, 13, 21]

console.log("/// myBind ///");

Function.prototype.myBind = function (context, ...args) {
    return (...rest) => {
        return this.call(context, ...args.concat(rest));
    };
};

function log(...props) {
    console.log(this.name, this.age, ...props);
}

const obj = { name: "Max", age: 24 };

log.myBind(obj, 1, 2)();

console.log("/// add ///");

function add(a, b) {
    if (!a) {
        return add;
    }
    if (!b) {
        return function calc(c) {
            if (!c) return calc;
            return a + c;
        };
    }

    return a + b;
}

console.log(add(20, 22)); // -> 42
console.log(add(20)(22)); // -> 42
console.log(add(20)()(22)); // -> 42
console.log(add(20)()()()(22)); // -> 42
console.log(add(20)()()()()()()()()()()()(22)); // -> 42
console.log(add()(20)(22)); // -> 42
console.log(add()()()()(20)(22)); // -> 42
console.log(add()(20)()(22)); // -> 42
console.log(add()()()()()(20)()()()(22)); // -> 42

console.log("/// groupBy ///");

const groupBy = (array, fn) =>
    array.reduce((res, current) => {
        const key = typeof fn === "function" ? fn(current) : current[fn];

        if (!res[key]) {
            res[key] = [];
        }
        res[key].push(current);

        return res;
    }, {});

groupBy([6.1, 4.2, 6.3], Math.floor); // -> { '4': [4.2], '6': [6.1, 6.3] }
groupBy(["one", "two", "three"], "length"); // -> { '3': ['one', 'two'], '5': ['three'] }
