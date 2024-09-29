import { Stage1 } from '../stages/stage-1/stage-1.js';
import { Stage2 } from '../stages/stage-2/stage-2.js';
import { Stage3 } from '../stages/stage-3/stage-3.js';
import { StageObserver } from './stage-observer.js';

gsap.registerPlugin(ScrollTrigger);

export class StageManager {
    constructor() {
        this.currentStageIndex = 0;
        this.stages = [
            new Stage1(),
            new Stage2(),
            new Stage3()
        ];
        this.stageObserver = new StageObserver();
        this.stageObserver.updateStage(this.currentStageIndex);
        this.setupScrollTrigger();
        console.log('StageManager initialized');
    }

    setupScrollTrigger() {
        let currentStageIndex = this.currentStageIndex;
        const numStages = this.stages.length;
        const mastertimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#animation-container",
                start: "bottom bottom",
                end: `+=${3 * 100}%`,
                pin: true,
                fastScrollEnd: true,
                preventOverlaps: true,
                markers: true,
                onRefresh: self => {
                    // This will run on page load and every time the screen size changes
                    ScrollTrigger.clearScrollMemory();
                    window.history.scrollRestoration = "manual";
                },
                onUpdate: self => {
                    const scrollProgress = (self.progress - 1/numStages) / (1 - 1/numStages);
                    let targetStage = 1 + Math.floor(scrollProgress * (numStages - 1));
                    console.log("Current:", currentStageIndex, "Target:", targetStage, "Total:", numStages, "Direction:", self.direction);
                    
                    if (targetStage !== currentStageIndex && targetStage >= -1 && targetStage < numStages) {
                        console.log("Condition met, calling transition");
                        
                        // Determine if we're scrolling up or down
                        const isScrollingUp = self.direction === -1;
                        
                        // Update currentStageIndex immediately
                        currentStageIndex = targetStage;
                        
                        // Use GSAP's delayedCall for immediate execution
                        gsap.delayedCall(0, async () => {
                            console.log(isScrollingUp ? "Scrolling Up" : "Scrolling Down");
                            if (isScrollingUp) {
                                console.log("Transitioning to previous stage");
                                await this.transitionToPreviousStage();
                            } else {
                                console.log("Transitioning to next stage");
                                await this.transitionToNextStage();
                            }
                            this.updateObserver();
                        });
                    }
                }
            }  
        });
    }


    async transitionToNextStage() {
        if (this.currentStageIndex < this.stages.length - 1) {
            await this.stages[this.currentStageIndex].transitionFrom();
            this.currentStageIndex++;
            await this.stages[this.currentStageIndex].transitionTo();
            this.updateObserver();
        }
    }

    async transitionToPreviousStage() {
        if (this.currentStageIndex > 0) {
            await this.stages[this.currentStageIndex].transitionFrom();
            this.currentStageIndex--;
            await this.stages[this.currentStageIndex].transitionTo();
            this.updateObserver();
        }
    }

    updateObserver() {
        const currentStage = this.stages[this.currentStageIndex];
        this.stageObserver.updateStage(this.currentStageIndex);
        console.log(`Observer updated. Current stage: ${this.currentStageIndex}`);
    }

    update(deltaTime) {
        this.stages[this.currentStageIndex].update(deltaTime);
    }
}