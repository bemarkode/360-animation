import { Stage3Logic } from './stage-3-logic.js';
import { Stage3Visualization } from './stage-3-visualization.js';
import { Stage3Control } from './stage-3-control.js';
import { store } from '../../modules/store.js';
import { visibilityManager } from '../../modules/visibility-manager.js';
import { stageConfigs } from '../../modules/stage-config.js';
import * as SphereOps from '../../modules/sphere-operations.js';
import * as THREE from 'three';

export class Stage3 {
    constructor(spheres, spheresData, stageObserver) {
        this.stageObserver = stageObserver;
        this.spheres = spheres;
        this.spheresData = spheresData;
        this.config = stageConfigs.stage3;
        this.logic = new Stage3Logic(spheres, spheresData);
        this.visualization = new Stage3Visualization(spheres, spheresData);
        this.control = new Stage3Control(spheres, spheresData, this.logic, this.visualization);
        this.camera = store.getCamera()
    }

    async transitionToNext() {

    }

    async transitionToPrevious() {
        console.log('Stage3: Preparing to transition to previous stage');
        // Perform any necessary cleanup or preparation
        // await this.control.prepareForTransition();
        this.resetCameraPosition();
        console.log('Stage3: Ready for previous stage');
    }

    async transitionFromNext() {
        console.log('Stage3: Initializing from next stage');
        // await this.control.initializeFromNext();
 
        console.log('Stage3: Initialization complete');
    }

    async transitionFromPrevious() {
        
        this.spheresData.forEach(sphere => {
            sphere.scanned = false
            sphere.scale.set(1, 1, 1)

            
        })
        this.spheres.instanceMatrix.needsUpdate = true;
        this.spheres.instanceColor.needsUpdate = true;
        this.update()
    }



    async resetCameraPosition() {
        const originalPosition = new THREE.Vector3(0, -4000, 750); // The original camera position

        return new Promise((resolve) => {
            gsap.to(this.camera.position, {
                x: originalPosition.x,
                y: originalPosition.y,
                z: originalPosition.z,
                duration: 0.5, // 2 seconds for the transition
                ease: "power2.inOut",
                onUpdate: () => {
                    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
                },
                onComplete: resolve
            });
        });
    }


    update(deltaTime) {
        
        this.control.update(deltaTime);


    }
}