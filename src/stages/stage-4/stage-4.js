import { Stage4Logic } from './stage-4-logic.js';
import { Stage4Visualization } from './stage-4-visualization.js';
import { Stage4Control } from './stage-4-control.js';
import { store } from '../../modules/store.js';
import { visibilityManager } from '../../modules/visibility-manager.js';
import { stageConfigs } from '../../modules/stage-config.js';

export class Stage4 {
    constructor() {
        this.config = stageConfigs.stage4;
        this.logic = new Stage4Logic();
        this.visualization = new Stage4Visualization();
        this.control = new Stage4Control(this.logic, this.visualization, this.visibilityRange);
    }

    async transitionTo() {
        console.log('Transitioning to Stage 4');
        this.isTransitioning = true;
        await visibilityManager.transitionToStage('stage4');
        this.logic.initializeStage();
        this.isTransitioning = false;
        this.update()
    }

    async transitionFrom() {
        console.log('Transitioning from Stage 4');
        
        this.isTransitioning = true;
    }

    update(deltaTime) {
        this.control.update(deltaTime);
    }
}
