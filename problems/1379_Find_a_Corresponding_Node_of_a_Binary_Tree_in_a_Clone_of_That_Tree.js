const getTargetCopy = function (original, cloned, target) {
    if (!original) {
        return null;
    }

    if (original === target) {
        // if this is the target node, return the corresponding cloned node
        return cloned;
    }

    // traverse left and right child nodes
    return (
        getTargetCopy(original.left, cloned.left, target) ||
        getTargetCopy(original.right, cloned.right, target)
    );
};
