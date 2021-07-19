const maxProfit = (prices: number[]): number => {
    // const minPrice = Math.min(...prices);
    // const minPriceIndex = prices.indexOf(minPrice);

    // const maxAllowedPrice = Math.max(...prices.slice(minPriceIndex));

    // return maxAllowedPrice - minPrice;

    console.log("----", "\nProcessing prices: ", prices, "\n----");

    const dealProfits = [];
    for (const price of [...prices].sort()) {
        const index = prices.indexOf(price);

        if (index === prices.length - 1) {
            console.log(
                "skipping last price in the array - ",
                price,
                " at index ",
                index
            );
            continue;
        }

        const maxPrice = Math.max(...prices.slice(index + 1));

        console.log(
            `New deal from price ${price} ; index: ${index} ; profit: ${
                maxPrice - price
            } ; maxPrice: ${maxPrice} ; maxPriceIndex: ${prices.indexOf(
                maxPrice
            )}`
        );
        dealProfits.push(maxPrice - price);
    }

    console.log("dealProfits: ", dealProfits);

    return Math.max(...dealProfits);
};

// console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxProfit([2, 4, 1]));
