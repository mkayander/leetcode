const someObj = {
    a: 1,
    f: () => {
        return this.a;
    },
    f2: function () {
        return this.a;
    },
    f3() {
        return this.a;
    },
};

const secondObj = {
    a: 2,
    f: someObj.f,
    f2: someObj.f2,
};

console.log(someObj.f());
console.log(someObj.f2());
console.log(someObj.f3());

const f = someObj.f;
const f2 = someObj.f2;
console.log(f());
console.log(f2());

const boundFunc = f2.bind(someObj);
console.log(boundFunc());

console.log(secondObj.f());
console.log(secondObj.f2());
console.log(secondObj.f.bind({ a: 3 })());
console.log(secondObj.f2.bind({ a: 3 })());

const thirdObject = { m: 1, n: 2, o: 3, p: 4 };

Object.defineProperty(thirdObject, "r", {
    enumerable: false,
    writable: false,
    configurable: false,
    value: 5,
});
console.log(Object.getOwnPropertyDescriptors(thirdObject));

thirdObject.r = 6;
thirdObject.r = 10;
delete thirdObject.r;
console.log(thirdObject.r);

for (const key in thirdObject) {
    console.log(key);
}

const arr = Object.keys(thirdObject);

arr.find((item) => {
    console.log(item);

    return true;
});

for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

function* generator(object) {
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
        yield object[keys[i]];
    }
}

for (const val of generator(thirdObject)) {
    console.log(val);
}

// for (const val of thirdObject) { // TypeError: thirdObject is not iterable
//     console.log(val);
// }

thirdObject[Symbol.iterator] = function () {
    const keys = Object.keys(this);
    let index = 0;
    return {
        next: () => {
            if (index < keys.length) {
                return {
                    value: this[keys[index++]],
                    done: false,
                };
            } else {
                return {
                    done: true,
                };
            }
        },
    };
};

for (const val of thirdObject) {
    console.log(val);
}

const fourthObject = {};
fourthObject[{}] = 1;
fourthObject[{}] = 2;
fourthObject[f] = 3;
fourthObject[2] = 4;

console.log(fourthObject);
console.log(String(f));

console.log({} == {});
console.log({} === {});

console.log(Object.values(fourthObject));

console.log(null == null);
console.log(null === null);

console.log("5" == 5);
console.log("" == []);
console.log([] == "");
console.log([] == 0);
console.log([] == false);
console.log([] == ![]);
console.log([] == []);
console.log([] == {});
console.log(Boolean([]));

console.log("2" + "2" - "2");
console.log("2" - "2" + "2");
console.log("2" + "2" + "2");
console.log("2" - "2" - "2");

console.log([] + []);
console.log([] + {});
console.log({} + []);
console.log({} + {});
console.log([1] + [2, 3]);
console.log([1] + { a: 2 });

console.log(NaN == NaN);
console.log(NaN === NaN);

console.log(isNaN(NaN));
console.log(isNaN("a"));
console.log(Number.isNaN(NaN));
console.log(Number.isNaN("a"));

console.log(0 == -0);
console.log(Object.is(0, -0));

const p = new Promise((resolve, reject) => {
    const a = 5;
    console.log(a);
    resolve(a);
});

p.then((val) => {
    console.log(val);
});

// const pr = [p1, p2, p3]

// () => {

//     const [obj, setObj] = useState({ a: 5 });

// //    useEffect(() => {
// //        setObj({a: 6});6
// //    }, []);

//     useEffect(() => {
//         obj.b = 6;
//        // setObj(obj);
//     }, []);

//     return (
//         <Child param={obj}/>
//     )
// }

for (var i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, 0);
}

for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, 0);
}

try {
    console.log("try");
    throw new Error("error");
} catch (e) {
    console.log(e);
} finally {
    console.log("finally");
}

new Promise((resolve, reject) => {
    console.log("promise");
    reject("reject");
})
    .then((val) => {
        console.log(val);
    })
    .catch((e) => {
        console.log(e);
        return 30;
    })
    .finally(() => {
        console.log("finally");
        return 22;
    })
    .then((val) => {
        console.log(val);
        return val + 10;
    })
    .finally((val) => {
        console.log("finally: " + val);
    })
    .then((val) => {
        console.log(val);
        throw new Error(val + 10);
    })
    .catch((e) => {
        console.log(e);
        return e.message + 10;
    })
    .then((val) => {
        console.log(val);
    });

function runTryCatch(a) {
    try {
        return a + 5;
    } catch (e) {
        console.error(e);
    } finally {
        console.log(a);
        return a + 10;
    }
}

console.log(runTryCatch(5));
