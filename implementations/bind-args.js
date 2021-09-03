const ex = function (value, sum) {
    console.log(arguments);
    console.log(sum + value);
};
const fx = ex.bind(null, 10);

ex(12, 7);
fx(7, 12);

const obj = {
    a: 42,
    say: function () {
        setTimeout(
            function () {
                console.log(this.a);
            }.bind(this),
            1000
        );
    },
};

obj.say();
