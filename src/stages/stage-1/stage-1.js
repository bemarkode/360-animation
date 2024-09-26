import { Stage1Logic } from './stage-1-logic.js';
import { Stage1Visualization } from './stage-1-visualization.js';
import { Stage1Control } from './stage-1-control.js';
import { store } from '../../modules/store.js';

export class Stage1 {
    constructor() {
        this.visibilityRange = { u: { min: 0.49, max: 0.5 }, v: { min: 0.4, max: 0.6 } };
        this.logic = new Stage1Logic(this.visibilityRange);
        this.visualization = new Stage1Visualization(this.visibilityRange);
        this.control = new Stage1Control(this.logic, this.visualization, this.visibilityRange);
    }

    async transitionTo() {
        await this.visualization.transitionTo(this.visibilityRange);
        this.logic.initializeStage();
    }

    async transitionFrom() {
        await this.visualization.transitionFrom();
    }

    update(deltaTime) {
        this.control.update(deltaTime);
    }
}