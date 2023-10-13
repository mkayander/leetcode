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
