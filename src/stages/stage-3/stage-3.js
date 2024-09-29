import { Stage3Logic } from './stage-3-logic.js';
import { Stage3Visualization } from './stage-3-visualization.js';
import { Stage3Control } from './stage-3-control.js';
import { store } from '../../modules/store.js';
import { visibilityManager } from '../../modules/visibility-manager.js';
import { stageConfigs } from '../../modules/stage-config.js';
import * as SphereOps from '../../modules/sphere-operations.js';

export class Stage3 {
    constructor() {
        this.config = stageConfigs.stage3;
        this.logic = new Stage3Logic();
        this.visualization = new Stage3Visualization();
        this.control = new Stage3Control(this.logic, this.visualization);
    }

    async transitionTo() {
        console.log('Transitioning to Stage 3');
        await visibilityManager.transitionToStage('stage3');
        this.logic.initializeStage();
        await this.resetSpheres();
        this.update()
    }

    async transitionFrom() {
        console.log('Transitioning from Stage 3');
        // Add any cleanup specific to Stage 3 here
    }

    async resetSpheres() {
        const spheresData = store.getSpheresData();
        for (let sphere of spheresData) {
            sphere.scanned = false;
            sphere.visible = true;
            sphere.highlightedIssue = false;
        }
        store.setSpheresData(spheresData);
    }

    update(deltaTime) {

            this.control.update(deltaTime);

    }
}