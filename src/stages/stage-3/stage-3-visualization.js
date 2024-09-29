import * as THREE from 'three';
import * as SphereOps from '../../modules/sphere-operations.js';
import { store } from '../../modules/store.js';

export class Stage3Visualization {
    constructor() {
        this.spheresData = store.getSpheresData();
        this.spheres = store.getSpheres();
        this.scene = store.getScene();
    }

    updateAllSpheres() {
        this.spheresData.forEach((sphere, index) => {
            this.updateSphereColor(sphere, index);
            this.updateSphereMatrix(sphere, index);
        });
        this.spheres.instanceMatrix.needsUpdate = true;
    }

    updateSphereColor(sphere, index) {
        SphereOps.updateSphereColor(sphere, this.spheres, index);
    }

    updateSphereMatrix(sphere, index) {
        SphereOps.updateSphereMatrix(sphere, this.spheres, index);
    }

    // Add any Stage 3 specific visualization methods here
}