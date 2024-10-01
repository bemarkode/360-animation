import { store } from '../../modules/store.js';
import { visibilityManager } from '../../modules/visibility-manager.js';
import * as SphereOps from '../../modules/sphere-operations.js';

export class Stage3Control {
    constructor(spheres, spheresData,logic, visualization, stageObserver) {
        this.stageObserver = stageObserver;
        this.logic = logic;
        this.visualization = visualization;
        this.spheresData = spheresData
        this.spheres = spheres
    }


    update(deltaTime) {
        // console.log('Stage 3 visibility range', visibilityManager.visibilityRange);
        store.setFlowSpeed(0.0);



        this.visualization.updateVisuals();
    }
}

    // Add any Stage 3 specific control methods here
