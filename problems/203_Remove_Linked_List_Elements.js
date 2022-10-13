/**
 * @typedef {{val: number, next: ListNode}} ListNode
 *
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
const removeElements = (head, val) => {
    // eslint-disable-next-line no-undef
    const result = new ListNode(0, head);
    let prev = result;
    let current = head;

    while (current !== null) {
        if (current.val === val) {
            prev.next = current.next;
        } else {
            prev = prev.next;
        }

        current = current.next;
    }

    return result.next;
};
