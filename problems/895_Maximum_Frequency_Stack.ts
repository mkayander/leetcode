class FreqStack {
    constructor() {}

    /**
     *  Frequency to entries map
     */
    private freqStacks: Record<number, number[]> = {};

    /**
     *  Values to frequency map
     */
    private freqMap: Record<number, number> = {};

    /**
     *  Max frequency found
     */
    private maxFreq = 0;

    push(val: number): void {
        this.freqMap[val] = this.freqMap[val] ? this.freqMap[val] + 1 : 1;

        if (this.maxFreq < this.freqMap[val]) {
            this.maxFreq = this.freqMap[val];
        }

        // If this freq count has the stack, add current value it
        // Else, initialize the stack for this freq count
        if (this.freqMap[val] in this.freqStacks) {
            this.freqStacks[this.freqMap[val]].push(val);
        } else {
            this.freqStacks[this.freqMap[val]] = [val];
        }
    }

    pop(): number {
        console.log("freqMap: ", this.freqMap);
        console.log("freqStacks: ", this.freqStacks);
        console.log("maxFreq: ", this.maxFreq);

        const temp = this.freqStacks[this.maxFreq].pop();

        if (temp === undefined) throw new Error();

        this.freqMap[temp]--;

        if (this.freqStacks[this.maxFreq].length === 0) {
            this.maxFreq--;
        }

        return temp;
    }
}

/**
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(val)
 * var param_2 = obj.pop()
 */

const obj = new FreqStack();
obj.push(5);
obj.push(7);
obj.push(5);
obj.push(7);
obj.push(4);
obj.push(5);
console.log(obj.pop());
console.log(obj.pop());
console.log(obj.pop());
console.log(obj.pop());
