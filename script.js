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

    return Math.max(...Array.from(element.children).map((el) => maxDepth(el, level + 1)));
};

console.log(maxDepth(root, 0));

const checkCalls = () => {
    setTimeout(() => {
        console.log("check 1");
    }, 0);

    const a = new Promise((resolve) => {
        console.log("promise...");
        resolve(3);
        console.log("promise... 2");
    });

    a.then((val) => console.log("check " + val));

    const id = setInterval(() => {
        console.log("check 5");

        const c = new Promise((resolve) => {
            b.then((val) => {
                console.log("check inside: " + val);
                resolve(val);
            });
        });

        c.then((val) => console.log("check " + val));
    }, 1000);

    setTimeout(() => {
        clearInterval(id);
        console.log("check 6");
    }, 3000);

    const b = new Promise((resolve) => {
        resolve(4);
    });

    b.then((val) => console.log("check " + val));

    console.log("check 7");
};

document.getElementById("check-calls").addEventListener("click", checkCalls);

const promiseLoop = () => {
    const targetCount = 20000;
    let count = 0;

    const handlePromise = (promise) => {
        promise
            .then((val) => {
                count++;
                console.log("promise " + val);
            })
            .finally(() => {
                if (count < targetCount) handlePromise(promise);
            });
    };

    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve(1);
        }, 1000);
    });

    handlePromise(promise);
};

document.getElementById("promise-loop").addEventListener("click", promiseLoop, true);

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
