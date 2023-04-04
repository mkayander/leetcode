type TreeNode = {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
};

class BSTIterator {
    stack: TreeNode[] = [];
    current: TreeNode | null = null;
    iter: Generator<number, number, boolean> | null;

    constructor(private root: TreeNode | null) {
        this.current = root;
        this.iter = this.dfs(root);
    }

    next(): number {
        const current = this.iter?.next();
        return current?.value ?? -1;
        // while (this.current.left) {
        //     this.stack.push(this.current);
        //     this.current = this.current.left;
        // }
        // const result = this.current;
        // this.current = this.stack.pop();
    }

    hasNext(): boolean {
        // return this.iter?.next().done ?? false;
        return !!this.current;
    }

    *dfs(node: TreeNode | null): Generator<number, number, boolean> | null {
        if (!node) return;
        yield* this.dfs(node.left);
        yield node.val;
        yield* this.dfs(node.right);
    }
}
