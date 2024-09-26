// stageManager.js
import * as THREE from 'three';
import * as SphereOps from './sphere-operations.js';


gsap.registerPlugin(ScrollTrigger);

export class StageManager {
    constructor(
        sceneSetup, 
        spheresData, 
        sphereVisualization, 
        flowController, 
        scanningController, 
        surface, 
        spheres
    ) {
        this.sceneSetup = sceneSetup;
        this.spheresData = spheresData;
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
            this.spheresData.filter(sphere => sphere.position.z > 0).map(sphere => sphere.index)
        );

        // Step 2: Reset sphere statuses and colors
        this.spheresData.forEach((sphere, index) => {
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
        const spheresToUpdate = this.spheresData.filter(sphere => 
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
        this.spheresData.forEach((sphere, index) => {
            sphere.visible = (
                sphere.u >= this.stages[0].visibilityRange.u.min && 
                sphere.u <= this.stages[0].visibilityRange.u.max && 
                sphere.v >= this.stages[0].visibilityRange.v.min && 
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
    
        this.spheresData.forEach((sphere, index) => {
            if (!sphere.isAnimating) {
                SphereOps.updateSpherePosition(sphere, flowSpeed, this.surface);
    
                if (SphereOps.isSphereAtReset(sphere)) {
                    const resetSphere = SphereOps.resetSphere(sphere, index, this.spheresData, this.surface);
                    this.sphereVisualization.updateSphereAfterReset(resetSphere, index);
                }
            }
    
            SphereOps.updateSphereVisibility(sphere, this.currentVisibilityRange);
            this.sphereVisualization.updateSphereMatrix(sphere, index);
        });
    
        this.spheres.instanceMatrix.needsUpdate = true;
        this.scan();
    }

    scan() {
        console.log("Scanning...");
        const flowSpeed = this.flowController.getFlowSpeed();
        let sphereCounter = 0;
    
        for (let i = 0; i < this.spheresData.length; i++) {
            const sphere = this.spheresData[i];
            
            if (i % sphere.cols === 0) sphereCounter++;
    
            if (SphereOps.shouldScanSphere(sphere, i, flowSpeed, sphereCounter)) {
                console.log(`Scanning sphere at index ${i}`);
                this.scanningController.startScanning(i);
                break;
            }
        }
    }

    // Add more stage-specific methods as needed
}