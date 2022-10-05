class TreeNode {
    constructor(val, left, right) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @param {number} depth
 * @return {TreeNode}
 */
var addOneRow = function(root, val, depth) {
    if (depth === 1) {
        root = new TreeNode(val, root, null);
        return root;
    }

    helper(root, val, depth, 1);

    return root;
};

function helper(node, val, depth, currentDepth) {
    currentDepth++;

    if (depth === currentDepth) {
        node.left = new TreeNode(val, node.left, null);
        node.right = new TreeNode(val, null, node.right);
    }

    node.left && helper(node.left, val, depth, currentDepth);
    node.right && helper(node.right, val, depth, currentDepth);
}
