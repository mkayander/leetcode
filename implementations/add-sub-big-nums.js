function addNumbers(a, b) {
    const arr = [];
    let carry = 0;
    let i = a.length - 1;
    let j = b.length - 1;

    const isSubtraction = (a[0] === "-" && b[0] !== "-") || (a[0] !== "-" && b[0] === "-");
    let sign = "";
    if (a[0] === "-" && b[0] === "-") {
        sign = "-";
    }

    while (i >= 0 || j >= 0) {
        const valueA = parseInt(a[i--]) || 0;
        const valueB = parseInt(b[j--]) || 0;
        let value;
        if (isSubtraction) {
            value = valueA - valueB - carry;
        } else {
            value = valueA + valueB + carry;
        }
        carry = 0;

        if (value < 0) {
            carry = 1;
            value += 10;
        } else if (value > 9) {
            carry = 1;
            value -= 10;
        }

        arr.push(value);
    }

    if (carry) {
        console.log(carry);
        arr.push(carry);
    }

    while (arr.at(-1) === 0) arr.pop();

    if (sign) arr.push(sign);

    return arr.reverse().join("");
}

console.log(addNumbers("123", "456"));
console.log(addNumbers("999", "1"));
console.log(addNumbers("999", "999"));

console.log(addNumbers("-123", "456"));
console.log(addNumbers("456", "-123"));
console.log(addNumbers("123", "-456"));
console.log(addNumbers("-123", "-456"));
console.log(addNumbers("-999", "-1"));
