import { Stage1 } from '../stages/stage-1/stage-1.js';
// import { Stage2 } from './stages/stage2/Stage2.js'; // Uncomment when Stage2 is ready

gsap.registerPlugin(ScrollTrigger);

export class StageManager {
    constructor(spheresData, flowController) {
        this.currentStageIndex = 0;
        this.stages = [
            new Stage1(spheresData, flowController),
            // new Stage2(spheresData, flowController), // Uncomment when Stage2 is ready
        ];
        this.setupScrollTrigger();
    }

    setupScrollTrigger() {
        ScrollTrigger.create({
            trigger: "#animation-container",
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                if (self.progress > 0.3 && this.currentStageIndex === 0) {
                    this.transitionToNextStage();
                } else if (self.progress < 0.2 && this.currentStageIndex === 1) {
                    this.transitionToPreviousStage();
                }
            }
        });
    }

    async transitionToNextStage() {
        if (this.currentStageIndex < this.stages.length - 1) {
            await this.stages[this.currentStageIndex].transitionFrom();
            this.currentStageIndex++;
            await this.stages[this.currentStageIndex].transitionTo();
        }
    }

    async transitionToPreviousStage() {
        if (this.currentStageIndex > 0) {
            await this.stages[this.currentStageIndex].transitionFrom();
            this.currentStageIndex--;
            await this.stages[this.currentStageIndex].transitionTo();
        }
    }

    update(deltaTime) {
        this.stages[this.currentStageIndex].update(deltaTime);
    }
}