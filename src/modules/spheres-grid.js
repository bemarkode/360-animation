import * as THREE from 'three';
import { surface } from './surface.js';

export function createSpheresOnSurface(cols, rows) {
    const sphereGeometry = new THREE.SphereGeometry(15, 32, 32);
    const errorGeometry = new THREE.SphereGeometry(25, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
        vertexColors: false,
        metalness: 0.1,
        roughness: 0.1,
        emissive: 0x020202,
    });
    const errorMaterial = new THREE.MeshBasicMaterial({
        side: THREE.BackSide
    });
    
    const totalSpheres = cols * rows;
    const spheres = new THREE.InstancedMesh(sphereGeometry, sphereMaterial, totalSpheres);
    const errorSpheres = new THREE.InstancedMesh(errorGeometry, errorMaterial, totalSpheres);
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3(1, 1, 1);

    const spheresData = [];
    const errorData = [];
    for (let i = 0; i < totalSpheres; i++) {
        const col = Math.floor(i / rows);
        const row = i % rows;
        const u = row / (rows - 1);
        let v = col / (cols - 1);
       
        surface.getPoint(u, v, position);

        matrix.compose(position, new THREE.Quaternion(), scale);
        spheres.setMatrixAt(i, matrix);
        errorSpheres.setMatrixAt(i, matrix);

        const status = Math.random() < 0.75 ? 'good' : 'bad';
        
        spheresData.push({
            index: i,
            col: col,
            row: row,
            u: u,
            v: v,
            status: status,
            visible: true, // All spheres are potentially visible now
            position: position.clone(),
            rowor: new THREE.Color(0xffffff),
            isAnimating: false,
            scale: new THREE.Vector3(1, 1, 1),
            rotation: new THREE.Quaternion(),
            scanned: false,
        });

        errorData.push({
            index: i,
            col: col,
            row: row,
            u: u,
            v: v,
            status: status,
            visible: false,
            position: position.clone(),
            rowor: new THREE.Color(0xffffff),
            isAnimating: false,
            scale: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Quaternion(),
            scanned: false,
        });
    }

    function updateInstancedMesh() {
        const matrix = new THREE.Matrix4();
        spheresData.forEach((sphere, i) => {
            matrix.compose(sphere.position, sphere.rotation, sphere.scale);
            spheres.setMatrixAt(i, matrix);
        });
        errorData.forEach((sphere, i) => {
            matrix.compose(sphere.position, sphere.rotation, sphere.scale);
            errorSpheres.setMatrixAt(i, matrix);
        });
        spheres.instanceMatrix.needsUpdate = true;
        errorSpheres.instanceMatrix.needsUpdate = true;
    }

    gsap.ticker.add(updateInstancedMesh);

    return { spheres, spheresData, updateInstancedMesh, errorSpheres, errorData };
}

