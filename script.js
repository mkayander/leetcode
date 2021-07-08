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
