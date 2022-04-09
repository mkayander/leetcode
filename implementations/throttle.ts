const withThrottle = <T extends Array<unknown>>(
    fn: (...args: T) => void,
    interval: number
) => {
    let counter = 1;

    return (...args: T) => {
        if (counter === interval) {
            fn(...args);
            counter = 1;
        } else {
            counter++;
        }
    };
};

const someFunc2 = (a: number, b: number) => {
    console.log(a, b, a + b);
};

const func2 = withThrottle(someFunc2, 2);

func2(1, 2);
func2(3, 4);
func2(5, 6);
func2(7, 8);
