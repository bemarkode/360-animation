import { store } from './store.js';

export class StageObserver {
    constructor() {
        this.currentStage = 0;
        this.isTransitioning = false;
        this.element = this.createObserverElement();
        this.updateDisplay(); // Call this immediately after creation
    }

    createObserverElement() {
        const element = document.createElement('div');
        element.id = 'stage-observer';
        element.style.position = 'fixed';
        element.style.top = '50px';
        element.style.left = '10px';
        element.style.padding = '10px';
        element.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        element.style.color = 'white';
        element.style.fontFamily = 'Arial, sans-serif';
        element.style.fontSize = '14px';
        element.style.zIndex = '1000';
        element.style.borderRadius = '5px';
        document.body.appendChild(element);
        return element;
    }

    updateStage(stageIndex, isTransitioning) {
        this.currentStage = stageIndex;
        this.isTransitioning = isTransitioning;
        this.updateDisplay();
    }

    startTransition() {
        this.isTransitioning = true;
        this.updateDisplay();
    }

    endTransition() {
        this.isTransitioning = false;
        this.updateDisplay();
    }

    updateDisplay() {
        let text = `Current Stage: ${this.currentStage + 1}`;
        if (this.isTransitioning) {
            text += ' (Transitioning)';
        }
        this.element.textContent = text;
        console.log('StageObserver updated:', text); // Add this for debugging
    }
}