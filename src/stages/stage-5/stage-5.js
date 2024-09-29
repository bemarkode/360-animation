import { Stage5Logic } from './stage-5-logic.js';
import { Stage5Visualization } from './stage-5-visualization.js';
import { Stage5Control } from './stage-5-control.js';
import { store } from '../../modules/store.js';
import { visibilityManager } from '../../modules/visibility-manager.js';
import { stageConfigs } from '../../modules/stage-config.js';

export class Stage5 {
    constructor() {
        this.config = stageConfigs.stage5;
        this.logic = new Stage5Logic();
        this.visualization = new Stage5Visualization();
        this.control = new Stage5Control(this.logic, this.visualization, this.visibilityRange);
    }

    async transitionTo() {
        console.log('Transitioning to Stage 5');
        this.isTransitioning = true;
        await visibilityManager.transitionToStage('stage5');
        this.logic.initializeStage();
        this.isTransitioning = false;
        this.update()
    }

    async transitionFrom() {
        console.log('Transitioning from Stage 5');
        
        this.isTransitioning = true;
    }

    update(deltaTime) {
        this.control.update(deltaTime);
    }
}
