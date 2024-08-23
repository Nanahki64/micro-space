import * as THREE from "three";
import sunTexture from "./img/sun.jpg";
import mercuryTexture from "./img/mercury.jpg";
import venusTexture from "./img/venus.jpg";
import earthTexture from "./img/earth.jpg";
import moonTexture from "./img/moon.jpg";
import marsTexture from "./img/mars.jpg";
import jupiterTexture from "./img/jupiter.jpg";
import saturnTexture from "./img/saturn.jpg";
import saturnRingTexture from "/img/saturn_ring.png";
import uranusTexture from "./img/uranus.jpg";
import neptuneTexture from "./img/neptune.jpg";
import { createPlanete } from "./planetFactory";
import { setupScene } from "./sceneSetup";
import { setupGUI } from "./guiSetup";

// Set up renderer, scene, and camera
const { scene, camera, renderer } = setupScene();
const textureLoader = new THREE.TextureLoader();

// Planets, stars and natural satellite
const sunGeometry = new THREE.SphereGeometry(50, 50, 50);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture),
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const mercury = createPlanete(3.2, mercuryTexture, 100, scene, textureLoader);

const venus = createPlanete(5.8, venusTexture, 150, scene, textureLoader);

const earth = createPlanete(6, earthTexture, 200, scene, textureLoader, null, [
  {
    size: 2,
    texture: moonTexture,
    distance: 10,
    speed: 0.01,
  },
]);
earth.object.castShadow = true;

const mars = createPlanete(4, marsTexture, 250, scene, textureLoader);

const jupiter = createPlanete(12, jupiterTexture, 300, scene, textureLoader);

const saturn = createPlanete(10, saturnTexture, 350, scene, textureLoader, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture,
});

const uranus = createPlanete(7, uranusTexture, 400, scene, textureLoader);

const neptune = createPlanete(7, neptuneTexture, 450, scene, textureLoader);

// Handle window resize
window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  // Update camera aspect ratio and renderer size
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

//Set up GUI
const { options } = setupGUI(earth);

// Animation loop
function animate() {
  //Self-rotation
  sun.rotateY(0.004);
  mercury.mesh.rotateY(0.004);
  venus.mesh.rotateY(0.002);
  if (options.earthRotation) {
    earth.mesh.rotateY(0.02);
  }
  if (options.moonRotation) {
    // Rotate each satellite
    earth.satellites.forEach((satellite) => {
      satellite.mesh.rotateY(0.004);
      satellite.pivot.rotateY(satellite.speed);
    });
  }
  mars.mesh.rotateY(0.018);
  jupiter.mesh.rotateY(0.04);
  saturn.mesh.rotateY(0.038);
  uranus.mesh.rotateY(0.03);
  neptune.mesh.rotateY(0.032);

  //Around the sun rotation
  mercury.object.rotateY(0.01);
  venus.object.rotateY(0.015);
  earth.object.rotateY(0.01);
  mars.object.rotateY(0.008);
  jupiter.object.rotateY(0.002);
  saturn.object.rotateY(0.0009);
  uranus.object.rotateY(0.0004);
  neptune.object.rotateY(0.0001);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
