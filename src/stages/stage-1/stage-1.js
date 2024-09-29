import { Stage1Logic } from './stage-1-logic.js';
import { Stage1Visualization } from './stage-1-visualization.js';
import { Stage1Control } from './stage-1-control.js';
import { store } from '../../modules/store.js';
import { visibilityManager } from '../../modules/visibility-manager.js';
import { stageConfigs } from '../../modules/stage-config.js';

export class Stage1 {
    constructor() {
        this.config = stageConfigs.stage1;
        this.logic = new Stage1Logic();
        this.visualization = new Stage1Visualization();
        this.control = new Stage1Control(this.logic, this.visualization, this.visibilityRange);
    }

    async transitionTo() {
        console.log('Transitioning to Stage 1');

        await visibilityManager.transitionToStage('stage1');
        this.logic.initializeStage();

        this.update()
    }

    async transitionFrom() {
        console.log('Transitioning from Stage 1');
        

    }





    update(deltaTime) {
        this.control.update(deltaTime);
    }
}