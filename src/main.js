import * as THREE from 'three';
import { createSpheresOnSurface } from './modules/spheres-grid.js';
import { addLights } from './modules/lights.js';
import { surface } from './modules/surface.js';
import { createScene, createCamera, createRenderer } from './modules/scene-setup.js';
import { SphereLogic, SphereVisualization, ScanningController } from './modules/scanning.js';
import { StageManager } from './modules/stage-manager.js';
import { createFlowController } from './modules/flow-controller.js';

// Initialize Scene, Camera, Renderer
const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
document.getElementById('animation-container').appendChild(renderer.domElement);

// Add lights to the scene
addLights(scene);

const ROWS = 71;
const COLS = 70;


const { spheres, spheresData, errorSpheres, errorData } = createSpheresOnSurface(ROWS, COLS);

const flowController = createFlowController();

const sphereLogic = new SphereLogic(ROWS, COLS);
sphereLogic.spheresData = spheresData;

const sphereVisualization = new SphereVisualization(scene, spheres, errorSpheres, sphereLogic);

const scanningController = new ScanningController(sphereLogic, sphereVisualization, flowController);

const stageManager = new StageManager(
  { scene, camera, renderer },
  sphereLogic,
  sphereVisualization,
  flowController,
  scanningController,
  surface,
  spheres
);

scene.add(spheres, errorSpheres);

let lastTime = 0;


function animate(currentTime) {
  requestAnimationFrame(animate);
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  stageManager.stages[stageManager.currentStage].update(deltaTime);

  renderer.render(scene, camera);
}

// Start the flow
flowController.startFlow();

animate(0);



  spheresData.forEach((sphere, index) => {
    sphereVisualization.updateSphereColor(sphere, index);
  });
  
  // spheres.instanceColor.needsUpdate = true;

//   sphereVisualization.initializeErrorSpheres();
