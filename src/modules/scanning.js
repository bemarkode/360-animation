import * as THREE from 'three';

export class SphereLogic {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.spheresData = [];
    }

    async startScanning(sphereIndex, callbacks) {
        const sphere = this.spheresData[sphereIndex];
        sphere.scanned = true;
        return await this.handleLogic(sphereIndex, callbacks);
    }

    async handleLogic(sphereIndex, callbacks) {
        const sphere = this.spheresData[sphereIndex];
        console.log(`Handling logic for sphere ${sphereIndex}, status: ${sphere.status}`);
        if (sphere.status === 'good') {
            console.log('Sphere is good, moving down');
            return { action: 'moveDown', spheres: [sphereIndex], scannedSpheres: [sphereIndex] };
        }

        console.log('Sphere is bad, starting propagation');
        const { result, badSpheres, scannedSpheres } = this.propagate(sphereIndex, callbacks);

        console.log(`Propagation result: ${result}, bad spheres: ${badSpheres}, scanned spheres: ${scannedSpheres}`);
        if (result === 'repaired') {
            return { action: 'repair', spheres: badSpheres, scannedSpheres };
        } else {
            return { action: 'moveDown', spheres: badSpheres, scannedSpheres };
        }
    }

    propagate(startSphereIndex) {
        const toScan = [startSphereIndex];
        const scannedSpheres = new Set();
        const badSpheres = [];
    
        while (toScan.length > 0) {
            const currentIndex = toScan.pop();
            const sphere = this.spheresData[currentIndex];
    
            if (scannedSpheres.has(currentIndex) || !sphere.visible) continue;
            scannedSpheres.add(currentIndex);
            sphere.scanned = true;
    
            if (sphere.status === 'good') {
                continue;
            } else {
                badSpheres.push(currentIndex);
                const neighbors = [this.getSphereLeft(currentIndex), this.getSphereRight(currentIndex)];
                neighbors.forEach((neighbor) => {
                    if (neighbor && !scannedSpheres.has(neighbor.index)) {
                        toScan.push(neighbor.index);
                    }
                });
            }
        }
    
        const result = this.shouldRepair(badSpheres, scannedSpheres) ? 'repaired' : 'not repaired';
        return { result, badSpheres, scannedSpheres: Array.from(scannedSpheres) };
    }
    
    shouldRepair(badSpheres, scannedSpheres) {
        return badSpheres.length > 0 && scannedSpheres.size >= 2;
    }

    getSphereLeft(sphereIndex) {
        const sphere = this.spheresData[sphereIndex];
        const col = sphere.col;
        if (col === 0) {
            return this.spheresData[sphere.index + 4900];
        } else {
            return this.spheresData[sphere.index - 70];
        }
    }

    getSphereRight(sphereIndex) {
        const sphere = this.spheresData[sphereIndex];
        const col = sphere.col;
        if (col === 69) {
            return this.spheresData[sphere.index - 4900];
        } else {
            return this.spheresData[sphere.index + 70];
        }
    }

    repair(sphereIndices) {
        for (const index of sphereIndices) {
            this.spheresData[index].status = 'good';
        }
    }

    resetSphere(sphereIndex) {
        const sphere = this.spheresData[sphereIndex];
        
        sphere.status = Math.random() < 0.75 ? 'good' : 'bad';
        sphere.scanned = false;
        sphere.visible = true;

        return sphere;
    }

}

export class SphereVisualization {
    constructor(scene, spheres, errorSpheres, sphereLogic) {
        this.scene = scene;
        this.spheres = spheres;
        this.errorSpheres = errorSpheres;
        this.sphereLogic = sphereLogic;
    }

    async animateSphereUp(sphereIndex) {
        const sphere = this.sphereLogic.spheresData[sphereIndex];
        return new Promise((resolve) => {
            sphere.isAnimating = true;
            const startZ = sphere.position.z;
            gsap.to(sphere.position, {
                z: startZ + 5 * 15,
                duration: 0.5,
                ease: "power2.inOut",
                onUpdate: () => {
                    const matrix = new THREE.Matrix4();
                    matrix.compose(sphere.position, new THREE.Quaternion(), new THREE.Vector3(1, 1, 1));
                    this.spheres.setMatrixAt(sphereIndex, matrix);
                    this.spheres.instanceMatrix.needsUpdate = true;
                },
                onComplete: () => {
                    resolve();
                }
            });
        });
    }

    async animateSphereDown(sphereIndex) {
        const sphere = this.sphereLogic.spheresData[sphereIndex];
        return new Promise((resolve) => {
            sphere.isAnimating = true;
            const startZ = sphere.position.z;
            gsap.to(sphere.position, {
                z: startZ - 5 * 15,
                duration: 0.5,
                ease: "power2.inOut",
                onUpdate: () => {
                    const matrix = new THREE.Matrix4();
                    matrix.compose(sphere.position, new THREE.Quaternion(), new THREE.Vector3(1, 1, 1));
                    this.spheres.setMatrixAt(sphereIndex, matrix);
                    this.spheres.instanceMatrix.needsUpdate = true;
                },
                onComplete: () => {
                    sphere.isAnimating = false;
                    resolve();
                }
            });
        });
    }

    async animateAllSpheresDown(sphereIndices) {
        const animations = sphereIndices.map(index => this.animateSphereDown(index));
        await Promise.all(animations);
    }

    async createScanningSphere(sphereIndex) {
        const sphere = this.sphereLogic.spheresData[sphereIndex];
        return new Promise((resolve) => {
            const zPos = sphere.position.z;
            const clipPlane = new THREE.Plane(new THREE.Vector3(0, -0.20, -1), zPos - 28);

            const scanSphereMaterial = new THREE.MeshBasicMaterial({
                color: 0x119988,
                opacity: 1,
                clippingPlanes: [clipPlane],
                side: THREE.BackSide,
                clipShadows: true,
            });
           
            const scanSphereGeometry = new THREE.SphereGeometry(28, 32, 32);
            const scanSphere = new THREE.Mesh(scanSphereGeometry, scanSphereMaterial);
            scanSphere.position.copy(sphere.position);
            this.scene.add(scanSphere);
    
            gsap.to(clipPlane, {
                constant: zPos + 28,
                duration: 0.5,
                onUpdate: () => {
                    scanSphereMaterial.needsUpdate = true; 
                },
                onComplete: () => {
                    this.scene.remove(scanSphere);
                    resolve();
                }
            });
        });
    }

    updateAllSphereColors(spheres) {
        spheres.forEach((sphere, i) => this.updateSphereColor(sphere, i));
    }

    updateSphereColor(sphere, index) {
        const color = new THREE.Color();
        if (sphere.status === 'good' && sphere.scanned === false) color.setHex(0xffffff);
        else if (sphere.status === 'bad' && sphere.scanned === false) color.setHex(0xffbbbb);
        else if (sphere.status === 'good' && sphere.scanned) color.setHex(0x00ff00);
        else color.setHex(0xff0000);
        this.spheres.setColorAt(index, color);
        this.spheres.instanceColor.needsUpdate = true;
    }


    updateSphereMatrix(sphere, index) {
        const matrix = new THREE.Matrix4();
        const scale = sphere.visible ? new THREE.Vector3(1, 1, 1) : new THREE.Vector3(0, 0, 0);
        matrix.compose(sphere.position, new THREE.Quaternion(), scale);
        this.spheres.setMatrixAt(index, matrix);
    }
    async animateSpheresUp(sphereIndices) {
        const animations = sphereIndices.map(index => this.animateSphereUp(index));
        await Promise.all(animations);
    }
    createErrorSphere(sphereIndex) {
        // Implementation of error sphere creation
    }

    updateErrorSpherePositions() {
        // Implementation of error sphere position updates
    }

    updateSphereAfterReset(sphere, index) {
        this.updateSphereColor(sphere, index);
        this.updateSphereMatrix(sphere, index);
        
        this.spheres.instanceColor.needsUpdate = true;
        this.spheres.instanceMatrix.needsUpdate = true;
    }
}

export class ScanningController {
    constructor(sphereLogic, sphereVisualization, flowController) {
        this.sphereLogic = sphereLogic;
        this.sphereVisualization = sphereVisualization;
        this.flowController = flowController;
    }

    async startScanning(sphereIndex) {
        console.log(`Starting scanning process for sphere ${sphereIndex}`);
        this.flowController.stopFlow();
    
        const { result, badSpheres, scannedSpheres } = this.sphereLogic.propagate(sphereIndex);
    
        await this.handleScanningVisualization(scannedSpheres);
    
        if (result === 'repaired') {
            await this.repairSpheres(badSpheres);
            // Update colors for all scanned spheres after repair
            for (const index of scannedSpheres) {
                const sphere = this.sphereLogic.spheresData[index];
                this.sphereVisualization.updateSphereColor(sphere, index);
            }
        }
    
        await this.sphereVisualization.animateAllSpheresDown(scannedSpheres);
        this.flowController.startFlow();
    }
    
    async handleScanningVisualization(scannedSpheres) {
        for (const index of scannedSpheres) {
            const sphere = this.sphereLogic.spheresData[index];
            await this.sphereVisualization.animateSphereUp(index);
            await this.sphereVisualization.createScanningSphere(index);
            sphere.scanned = true;
            this.sphereVisualization.updateSphereColor(sphere, index);
        }
    }

    async repairSpheres(sphereIndices) {
        console.log('Repairing spheres:', sphereIndices);
        
        // Repair the spheres in the logic
        this.sphereLogic.repair(sphereIndices);

        // Update the visualization for each repaired sphere
        for (const index of sphereIndices) {
            const sphere = this.sphereLogic.spheresData[index];
            this.sphereVisualization.updateSphereColor(sphere, index);
        }

        // Add a small delay to make the color change visible. Later animate
        await new Promise(resolve => setTimeout(resolve, 200));
    }
}