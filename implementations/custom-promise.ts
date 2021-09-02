const useTask = (base: number) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            const val = base * Math.random();
            if (val > base / 2) {
                resolve(val);
            } else {
                reject(`Value is too low!! - ${val}`);
            }
        }, 1500);
    });

const doJob = async () => {
    useTask(1000)
        .then((result) => {
            console.log(result);
        })
        .catch((reason) => console.error(reason));
};

async function main() {
    doJob();
    const wait = await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Promise resolved!");
}

main();
