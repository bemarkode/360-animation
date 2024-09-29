import { Stage6Logic } from './stage-6-logic.js';
import { Stage6Visualization } from './stage-6-visualization.js';
import { Stage6Control } from './stage-6-control.js';
import { store } from '../../modules/store.js';
import { visibilityManager } from '../../modules/visibility-manager.js';
import { stageConfigs } from '../../modules/stage-config.js';

export class Stage6 {
    constructor() {
        this.config = stageConfigs.stage6;
        this.logic = new Stage6Logic();
        this.visualization = new Stage6Visualization();
        this.control = new Stage6Control(this.logic, this.visualization, this.visibilityRange);
    }

    async transitionTo() {
        console.log('Transitioning to Stage 6');

        await visibilityManager.transitionToStage('stage6');
        this.logic.initializeStage();

        this.update()
    }

    async transitionFrom() {
        console.log('Transitioning from Stage 6');
        

    }

    update(deltaTime) {
        this.control.update(deltaTime);
    }
}
