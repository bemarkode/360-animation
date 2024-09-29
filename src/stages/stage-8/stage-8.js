import { Stage8Logic } from './stage-8-logic.js';
import { Stage8Visualization } from './stage-8-visualization.js';
import { Stage8Control } from './stage-8-control.js';
import { store } from '../../modules/store.js';
import { visibilityManager } from '../../modules/visibility-manager.js';
import { stageConfigs } from '../../modules/stage-config.js';

export class Stage8 {
    constructor() {
        this.config = stageConfigs.stage8;
        this.logic = new Stage8Logic();
        this.visualization = new Stage8Visualization();
        this.control = new Stage8Control(this.logic, this.visualization, this.visibilityRange);
    }

    async transitionTo() {
        console.log('Transitioning to Stage 8');

        await visibilityManager.transitionToStage('stage8');
        this.logic.initializeStage();

        this.update()
    }

    async transitionFrom() {
        console.log('Transitioning from Stage 8');
        

    }

    update(deltaTime) {
        this.control.update(deltaTime);
    }
}
