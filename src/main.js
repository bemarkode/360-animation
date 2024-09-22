import * as THREE from 'three';
import { createSpheresOnSurface } from './modules/spheres-grid.js';
import { addLights } from './modules/lights.js';
import { surface } from './modules/surface.js';
import { createScene, createCamera, createRenderer } from './modules/scene-setup.js';
import { SphereLogic, SphereVisualization, ScanningController } from './modules/scanning.js';
import { StageManager } from './modules/stage-manager.js';

// Initialize Scene, Camera, Renderer
const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
document.getElementById('animation-container').appendChild(renderer.domElement);

// Add lights to the scene
addLights(scene);

const ROWS = 71;
const COLS = 70;

class FlowController {
  constructor() {
    this.flowSpeedObject = { value: 0 };
    this.flowTimeline = gsap.timeline({ paused: true });
  }

  setFlowSpeed(speed, duration = 0) {
    this.flowTimeline.to(this.flowSpeedObject, {
      value: speed,
      duration: duration,
      ease: 'power2.inOut',
    });
  }

  startFlow() {
    this.setFlowSpeed(3 / 4900, 0);
    this.flowTimeline.play();
  }

  stopFlow() {
    this.setFlowSpeed(0, 0);
    this.flowTimeline.play();
  }
}

const { spheres, spheresData, errorSpheres, errorData } = createSpheresOnSurface(ROWS, COLS);

const flowController = new FlowController();


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

function updateSpheres(deltaTime) {
    const flowSpeed = flowController.flowSpeedObject.value;
  
    spheresData.forEach((sphere, index) => {
      // Update flow position if not animating
      if (!sphere.isAnimating) {
        sphere.v = (sphere.v - flowSpeed + 1) % 1;
        surface.getPoint(sphere.u, sphere.v, sphere.position);

        if (sphere.v > 0.99) {
            // Reset the sphere
            const resetSphere = sphereLogic.resetSphere(index);
            sphereVisualization.updateSphereAfterReset(resetSphere, index);
          }
      }
  
      // Update visibility
      sphere.visible = sphere.u >= 0.49 && sphere.u <= 0.5 && sphere.v >= 0.4 && sphere.v <= 0.6 && sphere.row !== 0;
  
      sphereVisualization.updateSphereMatrix(sphere, index);
    });
  
    spheres.instanceMatrix.needsUpdate = true;
  
    scan();
  }
  
  function scan() {
    const flowSpeed = flowController.flowSpeedObject.value;
    let sphereCounter = 0;

    for (let i = 0; i < spheresData.length; i++) {
        const sphere = spheresData[i];
        
        if (i % COLS === 0) sphereCounter++;

        if (sphere.visible && 
            sphere.v >= 0.5 && 
            sphere.v < 0.5 + flowSpeed && 
            sphereCounter % 10 === 0 && 
            !sphere.scanned) {
            // flowController.stopFlow();
            // scanIndex = i;
            scanningController.startScanning(sphere.index);
            break;
        }
    }
}

  spheresData.forEach((sphere, index) => {
    sphereVisualization.updateSphereColor(sphere, index);
  });
  
  // spheres.instanceColor.needsUpdate = true;

//   sphereVisualization.initializeErrorSpheres();
