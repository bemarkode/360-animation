import * as THREE from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { Stage3Logic } from './stage-3-logic.js';
import { Stage3Visualization } from './stage-3-visualization.js';
import { Stage3Control } from './stage-3-control.js';
import { store } from '../../modules/store.js';
import { visibilityManager } from '../../modules/visibility-manager.js';
import { stageConfigs } from '../../modules/stage-config.js';
import * as SphereOps from '../../modules/sphere-operations.js';

export class Stage3 {
    constructor(spheres, spheresData, stageObserver) {
        this.stageObserver = stageObserver;
        this.spheres = spheres;
        this.spheresData = spheresData;
        this.config = stageConfigs.stage3;
        this.logic = new Stage3Logic(spheres, spheresData);
        this.visualization = new Stage3Visualization(spheres, spheresData);
        this.control = new Stage3Control(spheres, spheresData, this.logic, this.visualization);
        this.camera = store.getCamera();
        this.scene = store.getScene();
        this.renderer = store.getRenderer();

        // Scan line properties
        this.scanLine = null;
        this.scanLinePosition = -4000; // Start position
        this.scanSpeed = 1000; // Units per second

        // Highlighting
        this.highlightedSpheres = new Set();

        // Post-processing
        this.composer = null;

        this.initScanLine();
        this.initPostProcessing();
    }

    
    async transitionToNext() {
        // Clean up
        this.scene.remove(this.scanLine);
        this.scanLine.geometry.dispose();
        this.scanLine.material.dispose();
        this.scanLine = null;
        this.highlightedSpheres.clear();
    }
    
    async transitionToPrevious() {
        console.log('Stage3: Preparing to transition to previous stage');
        await this.resetCameraPosition();
        console.log('Stage3: Ready for previous stage');
    }
    
    async transitionFromNext() {
        console.log('Stage3: Initializing from next stage');
        // Additional initialization if needed
        console.log('Stage3: Initialization complete');
    }
    
    async transitionFromPrevious() {
        this.spheresData.forEach(sphere => {
            sphere.scanned = false;
            sphere.scale.set(1, 1, 1);
        });
        this.spheres.instanceMatrix.needsUpdate = true;
        this.spheres.instanceColor.needsUpdate = true;
        this.initScanLine();
        this.scene.add(this.scanLine);
        this.scanLinePosition = -4000; // Reset scan line position
        this.update(0);
    }
    
    async resetCameraPosition() {
        const originalPosition = new THREE.Vector3(0, -4000, 750);
        
        return new Promise((resolve) => {
            gsap.to(this.camera.position, {
                x: originalPosition.x,
                y: originalPosition.y,
                z: originalPosition.z,
                duration: 0.5,
                ease: "power2.inOut",
                onUpdate: () => {
                    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
                },
                onComplete: resolve
            });
        });
    }
    
    update(deltaTime) {
        this.updateScanLine(deltaTime);
        this.control.update(deltaTime);
        this.highlightIntersectedSpheres();
        this.composer.render();
    }
    
    
    initPostProcessing() {
        this.composer = new EffectComposer(this.renderer);
        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);
        
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5,
            0.4,
            0.85
        );
        this.composer.addPass(bloomPass);
    }
    
    initScanLine() {
        const geometry = new LineGeometry();
        const material = new LineMaterial({
            color: 0xffffff,
            linewidth: 0,
            resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
            dashed: false
        });
    
        geometry.setPositions([-200, -400, 0, -200, 400, 0]);
    
        this.scanLine = new Line2(geometry, material);
        // Note: Don't add to scene here if following previous artifact's advice
    }

    updateScanLine(deltaTime) {
        this.scanLinePosition += this.scanSpeed * deltaTime;
        
        if (this.scanLinePosition > 2000) {
            this.scanLinePosition = -2000; // Reset to start
        }
    
        const geometry = this.scanLine.geometry;
        const positions = [
            -1000, this.scanLinePosition, 0,  // Start point
            1000, this.scanLinePosition, 0    // End point
        ];
        geometry.setPositions(positions);
    
        this.scanLine.computeLineDistances();
        this.scanLine.scale.set(1, 1, 1);
    }

    highlightIntersectedSpheres() {
        const threshold = 50;
        const newHighlightedSpheres = new Set();
    
        this.spheresData.forEach((sphere, index) => {
            if (visibilityManager.isSphereVisible(sphere)) {
                const distance = - (Math.abs(sphere.position.x - this.scanLinePosition));
                if (distance < threshold) {
                    newHighlightedSpheres.add(index);
                    if (!this.highlightedSpheres.has(index)) {
                        this.highlightSphere(index);
                    }
                }
            }
        });
    
        // Reset spheres that are no longer highlighted
        this.highlightedSpheres.forEach(index => {
            if (!newHighlightedSpheres.has(index)) {
                this.resetSphereAppearance(index);
            }
        });
    
        this.highlightedSpheres = newHighlightedSpheres;
    }

    highlightSphere(index) {
        const sphere = this.spheresData[index];
        sphere.scale.set(1.5, 1.5, 1.5);
        this.spheres.setColorAt(index, new THREE.Color(0x00ffff));
        this.updateSphereMatrix(sphere, index);
    }

    resetSphereAppearance(index) {
        const sphere = this.spheresData[index];
        sphere.scale.set(1, 1, 1);
        this.updateSphereMatrix(sphere, index);
        this.updateSphereColor(sphere, index);
    }

    updateSphereColor(sphere, index) {
        SphereOps.updateSphereColor(sphere, this.spheres, index);
    }

    updateSphereMatrix(sphere, index) {
        SphereOps.updateSphereMatrix(sphere, this.spheres, index);
    }
}