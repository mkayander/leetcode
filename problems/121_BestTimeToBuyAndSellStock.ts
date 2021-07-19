const maxProfit = (prices: number[]): number => {
    let minPrice = Infinity;
    let result = 0;

    for (const [index, price] of prices.entries()) {
        if (price < minPrice && index !== prices.length - 1) {
            minPrice = price;
            const currentResult = Math.max(...prices.slice(index + 1)) - price;
            if (currentResult > result) result = currentResult;
        }
    }

    return result;
};

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxProfit([2, 4, 1]));
