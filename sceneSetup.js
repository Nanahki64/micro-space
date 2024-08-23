import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import starsLandscape from "./img/stars.jpg";
import starsAndMilkyWayLandscape from "./img/stars_milky_way.jpg";

export function setupScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  const orbit = new OrbitControls(camera, renderer.domElement);
  orbit.minDistance = 100;
  orbit.maxDistance = 600;

  const pointLight = new THREE.PointLight(0xffffff, 70000, 600);
  scene.add(pointLight);

  const cubeTextureLoader = new THREE.CubeTextureLoader();
  scene.background = cubeTextureLoader.load([
    starsLandscape,
    starsLandscape,
    starsLandscape,
    starsLandscape,
    starsAndMilkyWayLandscape,
    starsAndMilkyWayLandscape,
  ]);

  camera.position.set(0, 400, 400);
  orbit.update();

  return { scene, camera, renderer };
}
