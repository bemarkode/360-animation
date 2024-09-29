import * as THREE from 'three';
import { createSpheresOnSurface } from './modules/spheres-grid.js';
import { addLights } from './modules/lights.js';
import { surface } from './modules/surface.js';
import { createScene, createCamera, createRenderer } from './modules/scene-setup.js';
import { StageManager } from './modules/stage-manager.js';
import { createFlowController } from './modules/flow-controller.js';
import { store } from './modules/store.js';
import { FPSCounter } from './utils/FPSCounter.js';

// Initialize Scene, Camera, Renderer
const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
const fpsCounter = new FPSCounter()
fpsCounter.addToContainer(document.getElementById('animation-container'));
document.getElementById('animation-container').appendChild(renderer.domElement);

// Add lights to the scene
addLights(scene);

const ROWS = 71;
const COLS = 70;

const { spheres, spheresData } = createSpheresOnSurface(ROWS, COLS);

store.setSpheres(spheres);
store.setSpheresData(spheresData);
store.setScene(scene);

const flowController = createFlowController();

const stageManager = new StageManager();

scene.add(spheres);

let lastTime = 0;

function animate(currentTime) {
    requestAnimationFrame(animate);
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    stageManager.update(deltaTime);

    fpsCounter.update();

    renderer.render(scene, camera);
}

animate(0);