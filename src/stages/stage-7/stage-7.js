import { Stage7Logic } from './stage-7-logic.js';
import { Stage7Visualization } from './stage-7-visualization.js';
import { Stage7Control } from './stage-7-control.js';
import { store } from '../../modules/store.js';
import { visibilityManager } from '../../modules/visibility-manager.js';
import { stageConfigs } from '../../modules/stage-config.js';

export class Stage7 {
    constructor() {
        this.config = stageConfigs.stage7;
        this.logic = new Stage7Logic();
        this.visualization = new Stage7Visualization();
        this.control = new Stage7Control(this.logic, this.visualization, this.visibilityRange);
    }

    async transitionTo() {
        console.log('Transitioning to Stage 7');

        await visibilityManager.transitionToStage('stage7');
        this.logic.initializeStage();

        this.update()
    }

    async transitionFrom() {
        console.log('Transitioning from Stage 7');
        

    }

    update(deltaTime) {
        this.control.update(deltaTime);
    }
}
