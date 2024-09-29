// visibility-manager.js
import { store } from './store.js';
import { stageConfigs, initialStage } from './stage-config.js';

class VisibilityManager {
    constructor() {
        this.visibilityRange = { u: { min: 0, max: 1 }, v: { min: 0, max: 1 } };
        this.initializeVisibilityRange();
    }

    initializeVisibilityRange() {
        this.visibilityRange = { ...stageConfigs[initialStage].visibilityRange };
        store.setVisibilityRange(this.visibilityRange);
    }

    async transitionVisibilityRange(newRange, duration = 1) {
        return new Promise((resolve) => {
            gsap.to(this.visibilityRange.u, {
                min: newRange.u.min,
                max: newRange.u.max,
                duration: duration,
                ease: "power2.inOut",
                onUpdate: () => this.updateStore()
            });

            gsap.to(this.visibilityRange.v, {
                min: newRange.v.min,
                max: newRange.v.max,
                duration: duration,
                ease: "power2.inOut",
                onUpdate: () => this.updateStore(),
                onComplete: resolve
            });
        });
    }

    updateStore() {
        store.setVisibilityRange({ ...this.visibilityRange });
    }

    async transitionToStage(stageName) {
        const newRange = stageConfigs[stageName].visibilityRange;
        await this.transitionVisibilityRange(newRange);
    }

    isSphereVisible(sphere) {
        const range = this.visibilityRange;
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

    debugVisibilityRange() {
        console.log('Current Visibility Range:', this.visibilityRange);
        const visibleSpheres = store.getSpheresData().filter(sphere => this.isSphereVisible(sphere));
        console.log('Number of visible spheres:', visibleSpheres.length);
    }
}

export const visibilityManager = new VisibilityManager();