// stageManager.js
import * as THREE from 'three';
import { updateSphereVisibility } from './visibility-functions.js';


gsap.registerPlugin(ScrollTrigger);

export class StageManager {
    constructor(
        sceneSetup, 
        sphereLogic, 
        sphereVisualization, 
        flowController, 
        scanningController, 
        surface, 
        spheres
    ) {
        this.sceneSetup = sceneSetup;
        this.sphereLogic = sphereLogic;
        this.sphereVisualization = sphereVisualization;
        this.flowController = flowController;
        this.currentStage = 0;
        this.surface = surface;
        this.spheres = spheres;
        this.scanningController = scanningController;
        this.stages = [
            {
                visibilityRange: { u: { min: 0.49, max: 0.5 }, v: { min: 0.4, max: 0.6 } },
                initialize: this.initializeStage1.bind(this),
                update: this.updateStage1.bind(this)
            },
            // Add more stages as needed
        ];

        this.currentVisibilityRange = this.stages[0].visibilityRange;

        
        this.setupScrollTrigger();
    }

    setupScrollTrigger() {
        ScrollTrigger.create({
            trigger: "#animation-container",
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                if (self.progress > 0.5 && this.currentStage === 0) {
                    this.transitionToNextStage();
                }
            }
        });
    }

    async transitionToNextStage() {
        this.flowController.stopFlow();

        // Step 1: Animate all spheres down
        await this.sphereVisualization.animateAllSpheresDown(
            this.sphereLogic.spheresData.filter(sphere => sphere.position.z > 0).map(sphere => sphere.index)
        );

        // Step 2: Reset sphere statuses and colors
        this.sphereLogic.spheresData.forEach((sphere, index) => {
            sphere.status = Math.random() < 0.75 ? 'good' : 'bad';
            sphere.scanned = false;
            this.sphereVisualization.updateSphereColor(sphere, index);
        });

        // Step 3: Update visibility range
        const nextStage = this.stages[this.currentStage + 1];
        await this.updateVisibilityRange(nextStage.visibilityRange);

        // Step 4: Initialize next stage
        this.currentStage++;
        nextStage.initialize();

        this.flowController.startFlow();
    }

    async updateVisibilityRange(newRange) {
        const duration = 1; // 1 second for this part of the transition
        const spheresToUpdate = this.sphereLogic.spheresData.filter(sphere => 
            sphere.u >= newRange.u.min && sphere.u <= newRange.u.max &&
            sphere.v >= newRange.v.min && sphere.v <= newRange.v.max
        );

        const timeline = gsap.timeline();

        spheresToUpdate.forEach(sphere => {
            timeline.to(sphere.scale, {
                x: 1, y: 1, z: 1,
                duration: duration,
                ease: "power2.inOut"
            }, 0);
        });

        await timeline.play();
    }

    initializeStage1() {
        // Initialize flow speed
        this.flowController.setFlowSpeed(3 / 4900, 0);
        this.flowController.startFlow();

        // Set initial sphere properties
        this.sphereLogic.spheresData.forEach((sphere, index) => {
            sphere.visible = (
                sphere.u >= this.stages[0].visibilityRange.u.min && 
                sphere.u <= this.stages[0].visibilityRange.u.max && 
                sphere.v >= thisrface.stages[0].visibilityRange.v.min && 
                sphere.v <= this.stages[0].visibilityRange.v.max && 
                sphere.row !== 0
            );
            sphere.status = Math.random() < 0.75 ? 'good' : 'bad';
            sphere.scanned = false;

            this.sphereVisualization.updateSphereColor(sphere, index);
            this.sphereVisualization.updateSphereMatrix(sphere, index);
        });

        // Update instance matrices and colors
        this.spheres.instanceMatrix.needsUpdate = true;
        this.spheres.instanceColor.needsUpdate = true;
    }

    updateStage1(deltaTime) {
        const flowSpeed = this.flowController.getFlowSpeed();

      
        this.sphereLogic.spheresData.forEach((sphere, index) => {
            // Update flow position if not animating
            if (!sphere.isAnimating) {
                sphere.v = (sphere.v - flowSpeed + 1) % 1;
                this.surface.getPoint(sphere.u, sphere.v, sphere.position);

                if (sphere.v > 0.99) {
                    // Reset the sphere
                    const resetSphere = this.sphereLogic.resetSphere(index);
                    this.sphereVisualization.updateSphereAfterReset(resetSphere, index);
                }
            }
      
            // Update visibility
            updateSphereVisibility(sphere, this.currentVisibilityRange);
      
            this.sphereVisualization.updateSphereMatrix(sphere, index);
        });
      
        this.spheres.instanceMatrix.needsUpdate = true;
      
        this.scan();
    }

    scan() {
        const flowSpeed = this.flowController.getFlowSpeed();
        let sphereCounter = 0;

        for (let i = 0; i < this.sphereLogic.spheresData.length; i++) {
            const sphere = this.sphereLogic.spheresData[i];
            
            if (i % this.sphereLogic.cols === 0) sphereCounter++;

            if (sphere.visible && 
                sphere.v >= 0.5 && 
                sphere.v < 0.5 + flowSpeed && 
                sphereCounter % 10 === 0 && 
                !sphere.scanned) {
                this.scanningController.startScanning(sphere.index);
                break;
            }
        }
    }

    // Add more stage-specific methods as needed
}