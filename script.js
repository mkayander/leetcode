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

checkCalls();

const fu = function () {
    const a = 1;

    console.log(a);
    console.log(this);
};

fu();

localStorage.setItem("test1", "123");
sessionStorage.setItem("test2", "321");
