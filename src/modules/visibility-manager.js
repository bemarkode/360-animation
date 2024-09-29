// visibility-manager.js
import { store } from './store.js';
import { stageConfigs, initialStage } from './stage-config.js';

class VisibilityManager {
    constructor() {
        this.isTransitioning = false;
        this.progress = 0;
        this.initializeVisibilityRange();
    }


    initializeVisibilityRange() {
        const initialRange = stageConfigs[initialStage].visibilityRange;
        store.setVisibilityRange(initialRange);
        store.setTargetVisibilityRange(initialRange);
    }

    async transitionVisibilityRange(newRange, duration = 1) {
        this.isTransitioning = true;
        store.setTargetVisibilityRange(newRange);
        this.progress = 0;

        return new Promise((resolve) => {
            gsap.to(this, {
                progress: 1,
                duration: duration,
                ease: "power2.inOut",
                onUpdate: () => {
                    store.updateVisibilityRange(this.getInterpolatedVisibilityRange());
                },
                onComplete: () => {
                    this.isTransitioning = false;
                    resolve();
                }
            });
        });
    }

    async transitionToStage(stageName) {
        const newRange = stageConfigs[stageName].visibilityRange;
        await this.transitionVisibilityRange(newRange);
    }

    getInterpolatedVisibilityRange() {
        const current = store.getVisibilityRange();
        const target = store.getTargetVisibilityRange();
        
        if (!this.isTransitioning) {
            return current;
        }

        return {
            u: {
                min: gsap.utils.interpolate(current.u.min, target.u.min, this.progress),
                max: gsap.utils.interpolate(current.u.max, target.u.max, this.progress)
            },
            v: {
                min: gsap.utils.interpolate(current.v.min, target.v.min, this.progress),
                max: gsap.utils.interpolate(current.v.max, target.v.max, this.progress)
            }
        };
    }

    isSphereVisible(sphere) {
        const range = store.getVisibilityRange();
        return (
            sphere.u >= range.u.min && 
            sphere.u <= range.u.max && 
            sphere.v >= range.v.min && 
            sphere.v <= range.v.max && 
            sphere.row !== 0
        );
    }

    updateSphereVisibility(sphere) {
        sphere.visible = this.isSphereVisible(sphere);
        return sphere.visible;
    }
}

export const visibilityManager = new VisibilityManager();