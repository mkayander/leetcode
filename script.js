const root = document.getElementById("divDepth");

console.log(root);

/**
 * @param {HTMLElement} element
 * @param {number} level
 */
const maxDepth = (element, level) => {
    console.log(element.childElementCount);
};

maxDepth(root, {});
