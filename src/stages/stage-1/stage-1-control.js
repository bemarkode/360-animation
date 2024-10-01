import { store } from '../../modules/store.js';
import * as SphereOps from '../../modules/sphere-operations.js';
import { visibilityManager } from '../../modules/visibility-manager.js';

export class Stage1Control {
    constructor(spheres, spheresData,logic, visualization, stageObserver) {
        this.stageObserver = stageObserver;
        this.logic = logic;
        this.visualization = visualization;
        this.spheresData = spheresData
        this.spheres = spheres;
    }

    update(deltaTime) {
        this.updateSphereStates();
        this.checkForScanning();
    }

    updateSphereStates() {
        const flowSpeed = store.getFlowSpeed();
    
        this.spheresData.forEach((sphere, index) => {
            if (!sphere.isAnimating) {
                SphereOps.updateSpherePosition(sphere, flowSpeed);
    
                if (SphereOps.isSphereAtReset(sphere)) {
                    // const resetSphere = SphereOps.resetSphere(sphere, index, this.spheresData);
                    // this.visualization.updateSphereAfterReset(resetSphere, index);
                    SphereOps.resetSphere(sphere, index, this.spheresData);
                }
            }
    

            // this.visualization.updateSphereMatrix(sphere, index);
        });
    
        // this.spheres.instanceMatrix.needsUpdate = true;
        this.visualization.updateVisuals();
    }

    checkForScanning() {
        const flowSpeed = store.getFlowSpeed(); // Get the current flow speed
        let sphereCounter = 0;
    
        for (let i = 0; i < this.spheresData.length; i++) {
            const sphere = this.spheresData[i];
            
            if (i % this.logic.cols === 0) sphereCounter++;
    
            if (SphereOps.shouldSphereBeScanned(sphere, flowSpeed, sphereCounter)) {
                
                this.startScanning(i);
                break;
            }
        }
    }

async startScanning(sphereIndex) {
    console.log('Starting scanning', sphereIndex);
    store.setFlowSpeed(0); // Stop the flow

    const { result, badSpheres, scannedSpheres } = this.logic.propagate(sphereIndex);

    await this.handleScanningVisualization(scannedSpheres);

    if (result === 'repaired') {
        await this.repairSpheres(badSpheres);
    }

    await this.visualization.animateAllSpheresDown(scannedSpheres);
    
    // Wait a short time before restarting the flow
    await new Promise(resolve => setTimeout(resolve, 200));
    
    store.setFlowSpeed(3 / 4900); // Restart the flow
}
    
    async handleScanningVisualization(scannedSpheres) {
        for (const index of scannedSpheres) {
            const sphere = this.logic.spheresData[index];
            await this.visualization.animateSphereUp(index);
            await this.visualization.createScanningSphere(index);
            sphere.scanned = true;
            this.visualization.updateSphereColor(sphere, index);
        }
    }

    async repairSpheres(sphereIndices) {
        
        
        // Repair the spheres in the logic
        this.logic.repair(sphereIndices);

        // Update the visualization for each repaired sphere
        for (const index of sphereIndices) {
            const sphere = this.logic.spheresData[index];
            this.visualization.updateSphereColor(sphere, index);
        }

        // Add a small delay to make the color change visible. Later animate
        await new Promise(resolve => setTimeout(resolve, 200));
    }
}