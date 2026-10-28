import * as THREE from 'three';

// ESCENA
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x141826);

// CÁMARA 
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// WEBGL RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// ILUMINACIÓN
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);


// ==========================================
// SEMÁFORO (REEMPLAZA AL CUBO)
// ==========================================
const semaforoGroup = new THREE.Group();

// 1. Caja del semáforo (cubo alargado en vertical)
const cajaGeo = new THREE.BoxGeometry(1.2, 3.8, 1);
const cajaMat = new THREE.MeshStandardMaterial({
  color: 0x222222,
  roughness: 0.5,
  metalness: 0.2
});
const cajaSemaforo = new THREE.Mesh(cajaGeo, cajaMat);
semaforoGroup.add(cajaSemaforo);

// 2. Tres esferas (THREE.SphereGeometry)
const esferaGeo = new THREE.SphereGeometry(0.4, 32, 32);

// Esfera Roja (y = 1.2)
const esferaRoja = new THREE.Mesh(
  esferaGeo,
  new THREE.MeshStandardMaterial({ color: 0xff0000, roughness: 0.2 })
);
esferaRoja.position.set(0, 1.2, 0.3);
semaforoGroup.add(esferaRoja);

// Esfera Amarilla (y = 0)
const esferaAmarilla = new THREE.Mesh(
  esferaGeo,
  new THREE.MeshStandardMaterial({ color: 0xffff00, roughness: 0.2 })
);
esferaAmarilla.position.set(0, 0, 0.3);
semaforoGroup.add(esferaAmarilla);

// Esfera Verde (y = -1.2)
const esferaVerde = new THREE.Mesh(
  esferaGeo,
  new THREE.MeshStandardMaterial({ color: 0x00ff00, roughness: 0.2 })
);
esferaVerde.position.set(0, -1.2, 0.3);
semaforoGroup.add(esferaVerde);

// Agregar el semáforo a la escena
scene.add(semaforoGroup);


// ==========================================
// ANIMACIÓN (ROTACIÓN 3D CONTINUA)
// ==========================================
function animate() {
  requestAnimationFrame(animate);

  // Misma rotación continua que tenía el cubo en el video
  semaforoGroup.rotation.x += 0.01;
  semaforoGroup.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

// RESPONSIVIDAD 
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});