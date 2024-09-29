import { Stage3Logic } from './stage-3-logic.js';
import { Stage3Visualization } from './stage-3-visualization.js';
import { Stage3Control } from './stage-3-control.js';
import { store } from '../../modules/store.js';
import { visibilityManager } from '../../modules/visibility-manager.js';
import { stageConfigs } from '../../modules/stage-config.js';

export class Stage3 {
    constructor() {
        this.config = stageConfigs.stage3;
        this.logic = new Stage3Logic();
        this.visualization = new Stage3Visualization();
        this.control = new Stage3Control(this.logic, this.visualization, this.visibilityRange);
    }

    async transitionTo() {
        console.log('Transitioning to Stage 3');
        this.isTransitioning = true;
        await visibilityManager.transitionToStage('stage3');
        this.logic.initializeStage();
        this.isTransitioning = false;
        this.update()
    }

    async transitionFrom() {
        console.log('Transitioning from Stage 3');
        
        this.isTransitioning = true;
    }

    update(deltaTime) {
        this.control.update(deltaTime);
    }
}
