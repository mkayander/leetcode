const ex = function (value, sum) {
    console.log(arguments);
    console.log(sum + value);
};
const fx = ex.bind(null, 10);

ex(12, 7);
fx(7, 12);
