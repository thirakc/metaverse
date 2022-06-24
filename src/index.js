import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";

//Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9fd4f5);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

//Control
const controls = new OrbitControls(camera, renderer.domElement);

//Light
const ambientLight = new THREE.AmbientLight(0xbda355);
const directionalLight = new THREE.DirectionalLight(0xffffff);
ambientLight.add(directionalLight);
scene.add(ambientLight);

const textureLoader = new THREE.TextureLoader();

//Ground
const groundTexture = textureLoader.load("src/textures/grasslight-big.jpeg");
groundTexture.repeat.set(1000, 1000);
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.encoding = THREE.sRGBEncoding;

const groundGeometry = new THREE.PlaneGeometry(16000, 16000);
const groundMaterial = new THREE.MeshPhongMaterial({map: groundTexture});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.rotateX(-Math.PI/2);
scene.add(groundMesh);

//Box
const boxTexture = textureLoader.load("src/textures/crate.gif")
const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
const boxMaterial = new THREE.MeshPhongMaterial({map: boxTexture});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.translateY(10);
scene.add(boxMesh);

//Cone
const coneTexture = textureLoader.load("src/textures/golfball.jpeg");
const coneGeometry = new THREE.ConeGeometry(5, 20, 32);
const coneMaterial = new THREE.MeshPhongMaterial({map: coneTexture});
const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);
coneMesh.translateX(-30).translateY(15);
scene.add(coneMesh);

//Cylinder
const cylinderTexture = textureLoader.load("src/textures/brick_bump.jpeg");
const cylinderGeometry = new THREE.CylinderGeometry(5, 5, 20, 32);
const cylinderMaterial = new THREE.MeshPhongMaterial({map: cylinderTexture});
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinderMesh.translateX(25).translateY(15);
scene.add(cylinderMesh);

camera.translateZ(40).translateY(5);

function animate() {

    boxMesh.rotateX(0.005);
    boxMesh.rotateY(0.01);

    coneMesh.rotateX(0.005);
    coneMesh.rotateY(0.01);

    cylinderMesh.rotateX(0.005);
    cylinderMesh.rotateY(0.01);

    controls.update();
    renderer.render(scene, camera);
}