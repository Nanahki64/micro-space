import * as dat from "dat.gui";

const gui = new dat.GUI();
const options = {
  wireframe: false,
  earthRotation: true,
  moonRotation: true,
  angle: 0.3,
  penumbra: 0,
  intensity: 5000,
  lightPlacementOnY: 5,
  lightPlacementOnZ: 0,
};

export function setupGUI(planet) {
  gui.add(options, "wireframe").onChange(function (e) {
    planet.mesh.material.wireframe = e;
    planet.satellites.forEach((satellite) => {
      satellite.mesh.material.wireframe = e;
    });
  });

  gui.add(options, "earthRotation");
  gui.add(options, "moonRotation");

  return { options };
}
