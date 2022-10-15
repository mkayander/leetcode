/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const deleteMiddle = (head) => {
    if (head.next === null) return null;

    // eslint-disable-next-line no-undef
    let result = new ListNode(0, head);
    let left = result;
    let right = left;

    while (right !== null) {
        right = right.next && right.next.next;
        left = left.next;
    }

    if (left.next === null) {
        result.next.next = null;
    } else {
        left.val = left.next.val;
        left.next = left.next.next;
    }

    return result.next;
};
