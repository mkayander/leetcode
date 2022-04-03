// Definition for a Node.
// eslint-disable-next-line no-unused-vars
function LNode(val, next, random) {
    this.val = val;
    this.next = next;
    this.random = random;
}

/**
 * @param {LNode} head
 * @return {LNode}
 */
const copyRandomList = (head) => {
    const map = new WeakMap();

    let current = head.next;
    let first = {
        val: head.val,
        random: head.random,
    };
    map.set(head, first);
    let newCurrent = first;

    while (current !== null) {
        newCurrent.next = {
            val: current.val,
            random: current.random,
        };

        map.set(current, newCurrent);

        newCurrent = newCurrent.next;

        current = current.next;
    }

    current = first;

    while (current !== null) {
        console.log(current);
        current.random = current.random && map.get(current.random);
        current = current.next;
    }

    console.log(first);
    console.log(map);

    return first;
};
