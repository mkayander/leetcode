class MyCircularQueue {
    private size: number;
    private queue: number[] = [];

    constructor(k: number) {
        this.size = k;
    }

    enQueue(value: number): boolean {
        if (!this.isFull()) {
            this.queue.unshift(value);
            return true
        } else {
            return false;
        }
    }

    deQueue(): boolean {
        return typeof this.queue.pop() === "number";
    }

    Front(): number {
        return this.queue[this.queue.length - 1] ?? -1;
    }

    Rear(): number {
        return this.queue[0] ?? -1;
    }

    isEmpty(): boolean {
        return this.queue.length === 0;
    }

    isFull(): boolean {
        return this.queue.length === this.size;
    }
}

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
