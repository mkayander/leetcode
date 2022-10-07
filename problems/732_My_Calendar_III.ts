class MyCalendarThree {
    /**
     * We can't use (new Map()) because it doesn't sort the key-value pair
     * Also, it works as well with arrays.
     */
    map: Record<number, number> = {};

    book(start: number, end: number): number {
        // Initialize properties if they don't exist
        this.map[start] ??= 0;
        this.map[end] ??= 0;

        // Increment value at the start of the event
        this.map[start]++;
        // Decrement value at the end of the event
        this.map[end]--;

        // Maximum concurrent events count found in the calendar
        let result = 0;

        // Current concurrent events at a specific day
        let curr = 0;

        // Go through all entries in calendar
        for (const key in this.map) {
            curr += this.map[key];
            result = Math.max(result, curr);
        }

        return result;
    }
}

/**
 * Your MyCalendarThree object will be instantiated and called as such:
 * var obj = new MyCalendarThree()
 * var param_1 = obj.book(start,end)
 */
