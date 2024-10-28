function checkPointsOrder(points) {
    if (points[0] > points[2]) {
        [points[0], points[2]] = [points[2], points[0]];
    }
    if (points[1] > points[3]) {
        [points[1], points[3]] = [points[3], points[1]];
    }
}

function isIntersecting(map1, map2) {
    const [x1, y1, x2, y2] = map1;
    const [x3, y3, x4, y4] = map2;

    return x1 < x4 && x2 > x3 && y1 < y4 && y2 > y3;
}

function getBoundingBox(map1, map2) {
    const [x1, y1, x2, y2] = map1;
    const [x3, y3, x4, y4] = map2;

    return [Math.min(x1, x3), Math.min(y1, y3), Math.max(x2, x4), Math.max(y2, y4)];
}

function mergePages(page1, page2) {
    return {
        box: getBoundingBox(page1.box, page2.box),
        indexes: [...page1.indexes, ...page2.indexes],
    };
}

class UnionFind {
    constructor(size, maps) {
        this.parent = Array.from({ length: size }, (_, index) => index);
        this.rank = new Array(size).fill(1);
        this.pages = Array.from({ length: size }, (_, index) => ({
            box: maps[index],
            indexes: [index],
        }));
    }

    find(index) {
        if (this.parent[index] !== index) {
            this.parent[index] = this.find(this.parent[index]);
        }

        return this.parent[index];
    }

    union(index1, index2) {
        let parent = this.find(index1);
        let child = this.find(index2);

        if (parent === child) {
            return false;
        }

        if (this.rank[parent] < this.rank[child]) {
            [parent, child] = [child, parent];
        }

        this.parent[child] = parent;
        this.rank[parent] += this.rank[child];
        this.rank[child] = 0;

        this.pages[parent] = mergePages(this.pages[parent], this.pages[child]);
        this.pages[child] = null;

        return true;
    }
}

function getPages(maps) {
    const n = maps.length;
    maps.forEach(checkPointsOrder);
    const uf = new UnionFind(n, maps);

    for (let i = 0; i < n; i++) {
        const map = maps[i];

        for (let j = i + 1; j < n; j++) {
            const map2 = maps[j];

            if (isIntersecting(map, map2)) {
                uf.union(i, j);
            }
        }
    }

    const result = uf.pages.filter((page) => page !== null);

    return result;
}

module.exports = getPages;

function test() {
    const maps = [
        [4, 4, 8, 8],
        [6, 6, 10, 10],
        [4, 12, 8, 16],
    ];

    const result = getPages(maps);

    const pages1 = [
        {
            box: [4, 4, 10, 10],
            indexes: [0, 1],
        },
        {
            box: [4, 12, 8, 16],
            indexes: [2],
        },
    ];

    console.log(result);

    console.assert(
        JSON.stringify(result) === JSON.stringify(pages1),
        `Expected ${JSON.stringify(pages1)}, but got ${JSON.stringify(result)}`,
    );
}

test();
