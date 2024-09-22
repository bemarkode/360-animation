import * as THREE from 'three';

export const createScene = () => new THREE.Scene();

export const createCamera = () => {
  const camera = new THREE.PerspectiveCamera(25, 800 / 800, 0.1, 20000);
  const center = new THREE.Vector3(0, 0, 0);
  camera.position.set(center.x, center.y - 4000, center.z + 750);
  camera.lookAt(center);
  return camera;
};

export const createRenderer = () => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
    stencil: false,
    depth: true,
  });
  renderer.setSize(800, 800);
  renderer.localClippingEnabled = true;
  return renderer;
};