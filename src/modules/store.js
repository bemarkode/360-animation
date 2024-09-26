

// store.js
class Store {
    constructor() {
        this.state = {
            spheres: null,
            spheresData: null,
            flowSpeed: 3 / 4900, // Default flow speed,
            scene: null
        };
    }

    setSpheres(spheres) {
        this.state.spheres = spheres;
    }

    setSpheresData(spheresData) {
        this.state.spheresData = spheresData;
    }

    setFlowSpeed(speed) {
        this.state.flowSpeed = speed;
    }

    getSpheres() {
        return this.state.spheres;
    }

    getSpheresData() {
        return this.state.spheresData;
    }

    getFlowSpeed() {
        return this.state.flowSpeed;
    }

    setScene(scene) {
        this.state.scene = scene;
    }

    getScene() {
        return this.state.scene;
    }
}

export const store = new Store();