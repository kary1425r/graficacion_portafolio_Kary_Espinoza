import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x10101b);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 4;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#mi-canvas'),
  antialias:true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


const luz = new THREE.DirectionalLight(0xffffff, 3);
luz.position.set(3, 4, 5);
scene.add(luz);

const geometry = new THREE.SphereGeometry(1.2, 32, 32);
const material = new THREE.MeshStandardMaterial({
  color: 0x2ecc71,
  metalness: 0.25,
  roughness: 0.35
});

const esfera = new THREE.Mesh(geometry, material);
scene.add(esfera);

function animate(tiempo) {
  requestAnimationFrame(animate);

  // Dos pulsos suaves seguidos de una pausa.
  const fase = (tiempo % 1200) / 1200;
  const pulso =
    Math.exp(-Math.pow((fase - 0.15) / 0.06, 2)) +
    0.6 * Math.exp(-Math.pow((fase - 0.32) / 0.07, 2));

  esfera.scale.setScalar(1 + pulso * 0.08);

  renderer.render(scene, camera);
}

requestAnimationFrame(animate);