import * as THREE from "three";

export function createPlanete(
  size,
  texture,
  position,
  scene,
  textureLoader,
  ring,
  satellites = []
) {
  const geo = new THREE.SphereGeometry(size, 50, 50);
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const mesh = new THREE.Mesh(geo, mat);
  const object = new THREE.Object3D();
  object.add(mesh);

  if (ring) {
    const ringGeometry = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const ringMaterial = new THREE.MeshStandardMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide,
      transparent: true,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);

    ringMesh.rotation.x = -0.5 * Math.PI;
    ringMesh.position.set(0, 0, 0);
    mesh.add(ringMesh);
  }

  satellites.forEach((satellite) => {
    const { size, texture, distance, speed } = satellite;

    const satGeo = new THREE.SphereGeometry(size, 30, 30);
    const satMat = new THREE.MeshStandardMaterial({
      map: textureLoader.load(texture),
    });
    const satMesh = new THREE.Mesh(satGeo, satMat);

    const satPivot = new THREE.Object3D();
    satPivot.add(satMesh);
    mesh.add(satPivot);

    satMesh.position.set(distance, 0, 0);
    satMesh.castShadow = true;

    satellite.pivot = satPivot;
    satellite.mesh = satMesh;
  });

  mesh.position.x = position;
  scene.add(object);

  return { mesh, object, satellites };
}
