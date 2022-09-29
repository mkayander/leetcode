/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const removeNthFromEnd = function(head, n) {
    const result = {
        val: 0,
        next: head
    };

    let left = result;
    let current = head.next;

    let offset = 1;

    while (current !== null) {
        current = current.next;
        if (offset < n) {
            offset++;
        } else {
            left = left.next;
        }
    }

    left.next &&= left.next.next;

    return result.next;
};
