function runCode() {
    const logs = [];
    const log = (val) => {
        logs.push(val);
    };

    log("1");

    setTimeout(() => {
        log("2");

        setTimeout(() => {
            log("3");
        }, 0);

        new Promise((resolve) => {
            log("4");
            resolve();
        })
            .then(() => {
                log("5");
            })
            .then(() => {
                log("6");
            });

        log("7");
    }, 50);

    for (var i = 70; i <= 75; i++) {
        setTimeout(() => {
            log(i);
        }, 0);
    }

    log("8");

    setTimeout(() => {
        console.log(logs);
    }, 500);
}

runCode();

async function fetchData(id) {
    const data = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    return data.json();
}

async function recursive(id) {
    const data = await fetchData(id);
    const items = [data];
    if (id < 10) {
        items.push(...(await recursive(id + 1)));
    }
    return items;
}

recursive(1).then((data) => console.log(data));
