const maxProfit = (prices: number[]): number => {
    let minPrice = Infinity;
    let result = 0;

    for (const price of prices) {
        if (price < minPrice) {
            minPrice = price;
        }

        if (price - minPrice > result) {
            result = price - minPrice;
        }
    }

    return result;
};

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxProfit([2, 4, 1]));
