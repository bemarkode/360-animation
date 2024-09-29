import { Stage2Logic } from './stage-2-logic.js';
import { Stage2Visualization } from './stage-2-visualization.js';
import { Stage2Control } from './stage-2-control.js';
import { store } from '../../modules/store.js';
import { visibilityManager } from '../../modules/visibility-manager.js';
import { stageConfigs } from '../../modules/stage-config.js';

export class Stage2 {
    constructor() {
        this.config = stageConfigs.stage2;
        this.logic = new Stage2Logic();
        this.visualization = new Stage2Visualization();
        this.control = new Stage2Control(this.logic, this.visualization, this.visibilityRange);
    }

    async transitionTo() {
        console.log('Transitioning to Stage 2');
        await visibilityManager.transitionToStage('stage2');
        this.logic.initializeStage();
        this.update()
    }

    async transitionFrom() {
        console.log('Transitioning from Stage 2');
        
    }


    update(deltaTime) {
        this.control.update(deltaTime);
    }
}