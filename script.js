"use strict";

const root = document.getElementById("divDepth");

console.log(root);

/**
 * @param {HTMLElement} element
 * @param {number} level
 * @returns {number}
 */
const maxDepth = (element, level) => {
    if (element.childElementCount === 0) return level;

    return Math.max(
        ...Array.from(element.children).map((el) => maxDepth(el, level + 1))
    );
};

console.log(maxDepth(root, 0));

const checkCalls = () => {
    setTimeout(() => {
        console.log("check 1");
    }, 0);

    console.log("check 2");

    const a = new Promise((resolve) => {
        console.log("promise...");
        resolve(3);
    });

    a.then((val) => console.log("check " + val));

    console.log("check 4");

    const id = setInterval(() => {
        console.log("check 5");
    }, 1000);

    setTimeout(() => {
        clearInterval(id);
        console.log("check 6");
    }, 3000);

    console.log("check 7");
};

// checkCalls();

const fu = function () {
    const a = 1;

    console.log(a);
    console.log(this);
};

fu();

localStorage.setItem("test1", "123");
sessionStorage.setItem("test2", "321");

const withDelay = (func, timeout) => {
    return (...args) =>
        new Promise((resolve) => {
            setTimeout(() => resolve(func(...args)), timeout);
        });
};

function loops() {
    const obj1 = {
        a: 123,
        b: 12,
        c: 23,
        d: 15,
    };

    Object.defineProperty(obj1, "d", { value: obj1.d, enumerable: false });

    for (const key in obj1) {
        console.log(key);
    }

    const func = withDelay((a) => {
        console.log(Object.getOwnPropertyDescriptors(a));
    }, 600);

    Object.entries(obj1).forEach(async (item, index) => {
        console.log(`${index} started`);
        await func(item);
        console.log(`${index} ended`);
    });

    (async () => {
        await Promise.all([func(obj1.a), func(obj1.b)]);
    })();
}

loops();
