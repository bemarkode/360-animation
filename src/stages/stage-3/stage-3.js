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
        this.scene = store.getScene()
        this.scanningSpheres = []
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
        this.scanSweep()
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

   

    scanSweep() {
        const cols = 70;
        console.log('Scanning sweep', cols);
        const durationBetweenCols = 2 / 70; // The delay between each column in seconds
        const scanDuration = 0.5; // Duration of the scanning animation for each column

        // Clear any existing scanning spheres
        this.cleanup();

        // Animate column by column
        for (let col = 0; col < cols; col++) {
            const delay = col * durationBetweenCols;
            
            gsap.delayedCall(delay, () => {
                this.scanColumn(col, scanDuration);
            });
        }
    }
    
    scanColumn(col, duration) {
        console.log(`Scanning col ${col}`);
        const spheresInColumn = this.spheresData.filter(sphere => 
            sphere.col === col && visibilityManager.isSphereVisible(sphere)
        );
        
        spheresInColumn.forEach(sphere => {
            this.createScanningSphere(sphere, duration);
        });
    }
    
    createScanningSphere(sphere, duration) {
        const zPos = sphere.position.z;
        const clipPlane = new THREE.Plane(new THREE.Vector3(0, -0.20, -1), zPos - 28);

        const scanSphereMaterial = new THREE.MeshBasicMaterial({
            color: 0x119988,
            opacity: 0.7,
            transparent: true,
            clippingPlanes: [clipPlane],
            side: THREE.BackSide,
            clipShadows: true,
        });
       
        const scanSphereGeometry = new THREE.SphereGeometry(28, 32, 32);
        const scanSphere = new THREE.Mesh(scanSphereGeometry, scanSphereMaterial);
        scanSphere.position.copy(sphere.position);
        this.scene.add(scanSphere);
        this.scanningSpheres.push(scanSphere);

        gsap.to(clipPlane, {
            constant: zPos + 28,
            duration: duration,
            ease: "power1.inOut",
            onUpdate: () => {
                scanSphereMaterial.needsUpdate = true;
            },
            onComplete: () => {
                this.scene.remove(scanSphere);
                this.scanningSpheres = this.scanningSpheres.filter(s => s !== scanSphere);
                scanSphereGeometry.dispose();
                scanSphereMaterial.dispose();
                this.updateSphereStatus(sphere);
            }
        });
    }

    updateSphereStatus(sphere) {
        sphere.scanned = true;
        const color = sphere.status === 'good' ? new THREE.Color(0x00bb99) : new THREE.Color(0xff0000);
        SphereOps.setSphereColor(color, this.spheres, sphere.index);
        this.spheres.instanceColor.needsUpdate = true;
    }

    cleanup() {
        this.scanningSpheres.forEach(sphere => {
            this.scene.remove(sphere);
            sphere.geometry.dispose();
            sphere.material.dispose();
        });
        this.scanningSpheres = [];
    }
    
    findInsights() {
        console.log('Finding insights');
    }
    update(deltaTime) {
        
        this.control.update(deltaTime);


    }
}