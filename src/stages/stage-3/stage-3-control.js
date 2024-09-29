import { store } from '../../modules/store.js';
import { visibilityManager } from '../../modules/visibility-manager.js';

export class Stage3Control {
    constructor(logic, visualization) {
        this.logic = logic;
        this.visualization = visualization;
        this.spheresData = store.getSpheresData();
        this.spheres = store.getSpheres();
    }

    update(deltaTime) {
        // Add Stage 3 specific update logic here
        this.updateSphereStates();
    }

    updateSphereStates() {
        this.spheresData.forEach((sphere, index) => {
            visibilityManager.updateSphereVisibility(sphere);
            this.visualization.updateSphereMatrix(sphere, index);
        });

        this.spheres.instanceMatrix.needsUpdate = true;
        this.visualization.updateAllSpheres();
    }

    // Add any Stage 3 specific control methods here
}