const withDebounce = <T extends Array<unknown>>(
    fn: (...args: T) => void,
    timeout: number
) => {
    let id: number | null = null;
    return (...args: T) => {
        if (id !== null) clearTimeout(id);

        id = setTimeout(() => fn(...args), timeout);
    };
};

const someFunc = (a: number, b: number) => {
    console.log(a, b, a + b);
};

const func = withDebounce(someFunc, 500);

func(1, 2);
func(3, 4);
func(5, 6);
func(7, 8);
