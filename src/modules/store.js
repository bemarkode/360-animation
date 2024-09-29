

// store.js
class Store {
    constructor() {
        this.state = {
            spheres: null,
            spheresData: null,
            flowSpeed: 3 / 4900, // Default flow speed,
            scene: null,
            visibilityRange: { u: { min: 0, max: 1 }, v: { min: 0, max: 1 } },
            targetVisibilityRange: { u: { min: 0, max: 1 }, v: { min: 0, max: 1 } }
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
    setVisibilityRange(range) {
        this.state.visibilityRange = range;
    }

    getVisibilityRange() {
        return this.state.visibilityRange;
    }

    setTargetVisibilityRange(range) {
        this.state.targetVisibilityRange = range;
    }

    getTargetVisibilityRange() {
        return this.state.targetVisibilityRange;
    }

    updateVisibilityRange(interpolatedRange) {
        this.state.visibilityRange = interpolatedRange;
    }
}

export const store = new Store();