class TimeMap {
    hash: Record<string, Record<string, string>> = {};

    set(key: string, value: string, timestamp: number): void {
        if (key in this.hash) {
            this.hash[key][timestamp] = value;
        } else {
            this.hash[key] = {};
            this.hash[key][timestamp] = value;
        }
    }

    get(key: string, timestamp: number): string {
        for (let i = timestamp; i >= 0; i--) {
            if (key in this.hash && i in this.hash[key]) return this.hash[key][i];
        }

        return "";
    }
}

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */
