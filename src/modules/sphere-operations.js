import * as THREE from 'three';
export function resetSphere(sphere, index, spheresData, surface) {
    sphere.status = Math.random() < 0.75 ? 'good' : 'bad';
    sphere.scanned = false;
    sphere.visible = true;
    
    surface.getPoint(sphere.u, 0, sphere.position);

    sphere.row = Math.floor(index / spheresData.cols);
    sphere.col = index % spheresData.cols;

    return sphere;
}

export function updateSpherePosition(sphere, flowSpeed, surface) {
    sphere.v = (sphere.v - flowSpeed + 1) % 1;
    surface.getPoint(sphere.u, sphere.v, sphere.position);
    return sphere;
}

export function isSphereAtReset(sphere) {
    return sphere.v > 0.99;
}

export function shouldScanSphere(sphere, index, flowSpeed, sphereCounter) {
    return sphere.visible && 
           sphere.v >= 0.5 && 
           sphere.v < 0.5 + flowSpeed && 
           sphereCounter % 10 === 0 && 
           !sphere.scanned;
}

export function updateSphereVisibility(sphere, visibilityRange) {
    sphere.visible = (
        sphere.u >= visibilityRange.u.min && 
        sphere.u <= visibilityRange.u.max && 
        sphere.v >= visibilityRange.v.min && 
        sphere.v <= visibilityRange.v.max && 
        sphere.row !== 0
    );
    return sphere.visible;
}

export function getSphereColor(sphere) {
    const color = new THREE.Color();
    if (sphere.status === 'good' && !sphere.scanned) color.setHex(0xffffff);
    else if (sphere.status === 'bad' && !sphere.scanned) color.setHex(0xffbbbb);
    else if (sphere.status === 'good' && sphere.scanned) color.setHex(0x00ff00);
    else color.setHex(0xff0000);
    return color;
}

export function updateSphereColor(sphere, instancedMesh, index) {
    const color = getSphereColor(sphere);
    instancedMesh.setColorAt(index, color);
    instancedMesh.instanceColor.needsUpdate = true;
}

export function updateSphereMatrix(sphere, instancedMesh, index) {
    const matrix = new THREE.Matrix4();
    const scale = sphere.visible ? new THREE.Vector3(1, 1, 1) : new THREE.Vector3(0, 0, 0);
    matrix.compose(sphere.position, sphere.rotation, scale);
    instancedMesh.setMatrixAt(index, matrix);
    instancedMesh.instanceMatrix.needsUpdate = true;
}

export function updateSphereAfterReset(sphere, instancedMesh, index) {
    updateSphereColor(sphere, instancedMesh, index);
    updateSphereMatrix(sphere, instancedMesh, index);
}