/**
 * Definition for a binary tree node.
 *
 * @typedef {{val: number, left: TreeNode, right: TreeNode}} TreeNode
 *
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @param {number} sum
 * @return {boolean}
 */
const hasPathSum = function (root, targetSum, sum = 0) {
    if (!root) return false;

    sum += root.val;

    if (!root.left && !root.right && sum === targetSum) {
        return true;
    }

    const left = root.left && hasPathSum(root.left, targetSum, sum);
    const right = root.right && hasPathSum(root.right, targetSum, sum);

    return Boolean(left || right);
};
