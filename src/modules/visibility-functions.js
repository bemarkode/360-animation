export function isSphereVisible(sphere, visibilityRange) {
    return (
        sphere.u >= visibilityRange.u.min &&
        sphere.u <= visibilityRange.u.max &&
        sphere.v >= visibilityRange.v.min &&
        sphere.v <= visibilityRange.v.max &&
        sphere.row !== 0
    );
}

export function updateSphereVisibility(sphere, visibilityRange) {
    const isVisible = isSphereVisible(sphere, visibilityRange);
    sphere.visible = isVisible;
    sphere.scale.setScalar(isVisible ? 1 : 0);
    return isVisible;
}

export function updateAllSpheresVisibility(spheres, visibilityRange) {
    return spheres.map(sphere => updateSphereVisibility(sphere, visibilityRange));
}