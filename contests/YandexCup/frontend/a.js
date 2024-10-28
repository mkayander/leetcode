const directionToSignal = {
    FORWARD: "GREEN",
    LEFT: "LEFT",
    RIGHT: "RIGHT",
};

class Traffic {
    subscribers = {
        GREEN: [],
        LEFT: [],
        RIGHT: [],
    };

    constructor(initialSignal, trafficLightController) {
        this.currentSignal = initialSignal;

        trafficLightController.subscribe((currentSignal) => {
            this.currentSignal = currentSignal;
            if (currentSignal === "RED") return;
            if (!this.subscribers[currentSignal].length) return;

            for (const callback of this.subscribers[currentSignal]) {
                callback();
            }
            this.subscribers[currentSignal] = [];
        });
    }

    go(direction) {
        const targetSignal = directionToSignal[direction];
        return new Promise((resolve) => {
            if (this.currentSignal === targetSignal) {
                resolve();
                return;
            }

            this.subscribers[targetSignal].push(resolve);
        });
    }
}

exports.Traffic = Traffic;

function test() {
    class TrafficLightController {
        constructor() {
            this.subscribers = [];
        }

        subscribe(callback) {
            this.subscribers.push(callback);
        }

        changeSignal(signal) {
            for (const subscriber of this.subscribers) {
                subscriber(signal);
            }
        }
    }

    const trafficLightController = new TrafficLightController();

    const traffic = new Traffic("GREEN", trafficLightController);

    traffic.go("FORWARD").then(() => {
        console.log("FORWARD");
    });

    traffic.go("LEFT").then(() => {
        console.log("LEFT");
    });

    traffic.go("RIGHT").then(() => {
        console.log("RIGHT");
    });

    trafficLightController.changeSignal("RED");

    trafficLightController.changeSignal("GREEN");

    traffic.go("LEFT").then(() => {
        console.log("LEFT");
    });

    traffic.go("RIGHT").then(() => {
        console.log("RIGHT");
    });

    trafficLightController.changeSignal("RED");

    trafficLightController.changeSignal("LEFT");
}

test();
