import * as THREE from "three";
import { NURBSSurface } from "three/examples/jsm/curves/NURBSSurface.js";


const controlPoints = [
    [
        new THREE.Vector4(4002.11, -2088.98, -357.08, 1.0),
        new THREE.Vector4(850.30, -2088.98, -850.43, 1.0),
        new THREE.Vector4(-1160.93, -2088.98, -919.62, 1.0),
        new THREE.Vector4(-3691.48, -2088.98, 297.74, 1.0)
    ],
    [
        new THREE.Vector4(4002.11, 36.67, 785.51, 1.0),
        new THREE.Vector4(850.30, 36.67, 737.97, 1.0),
        new THREE.Vector4(-1160.93, 36.67, -530.51, 1.0),
        new THREE.Vector4(-3691.48, 36.67, -254.06, 1.0)
    ],
    [
        new THREE.Vector4(4002.11, 2052.32, -339.91, 1.0),
        new THREE.Vector4(850.30, 2052.32, -570.90, 1.0),
        new THREE.Vector4(-1160.93, 2052.32, 500.07, 1.0),
        new THREE.Vector4(-3691.48, 2052.32, 1501.25, 1.0)
    ]
];


function createNURBSSurface(controlPoints, degreeU, degreeV) {

    const knotsU = generateKnotVector(degreeU, controlPoints.length);
    const knotsV = generateKnotVector(degreeV, controlPoints[0].length);

    return new NURBSSurface(degreeU, degreeV, knotsU, knotsV, controlPoints);
}


function generateKnotVector(degree, controlPointsCount) {

    const knotsCount = controlPointsCount + degree + 1;
    const knots = [];

    for (let i = 0; i <= degree; i++) {
        knots.push(0);
    }

    for (let i = 1; i < controlPointsCount - degree; i++) {
        knots.push(i / (controlPointsCount - degree));
    }

    for (let i = 0; i <= degree; i++) {
        knots.push(1);
    }

    return knots;
}


export const surface = createNURBSSurface(controlPoints, 2, 3);