import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//Creating a scene for 3d objects etc
const scene = new THREE.Scene();

//setting scene background
scene.background = new THREE.Color("#000000");

//a view port for the scene to be rendered on
const camera = new THREE.PerspectiveCamera(
	//field of view
	75,
	//Setting the aspect ratio
	//window.innerWidth / window.innerHeight, or can set manually
	200 / 200,
	//if something things is dissapearing, set this to a higher value for the near plane and lower for the far plane
	//near plane
	0.1,
	//far plane
	1000
);
camera.position.z = 2;

//second camera
const camera2 = new THREE.OrthographicCamera(-2, 2, 2, -2);
camera2.position.z = 2;

/*
//setting the renderer
const renderer = new THREE.WebGLRenderer();
//one thing you need to set is the window size of the website
renderer.setSize(window.innerWidth, window.innerHeight);
//add the canvas to the HTML page body
document.body.appendChild(renderer.domElement);
*/

// OR

// *****************************************************************************
//using a canvas that already exist
const canvas = document.getElementById("c1") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
//renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize(200, 200);
// *****************************************************************************

//Adding other renders
const canvas2 = document.getElementById("c2") as HTMLCanvasElement;
const canvas3 = document.getElementById("c3") as HTMLCanvasElement;
const canvas4 = document.getElementById("c4") as HTMLCanvasElement;

const renderer2 = new THREE.WebGLRenderer({
	canvas: canvas2,
});
renderer2.setSize(200, 200);
// renderer2.setSize(window.innerWidth, window.innerHeight);
const renderer3 = new THREE.WebGLRenderer({
	canvas: canvas3,
});
renderer3.setSize(200, 200);
const renderer4 = new THREE.WebGLRenderer({
	canvas: canvas4,
});
renderer4.setSize(200, 200);

//setting the controls of the camera
const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
	color: 0x00ff00,
	wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//executes when the window change sizes, will update the aspect ratio and the length of the sceeen for the renderer
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	render();
}

function animate() {
	requestAnimationFrame(animate);

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	controls.update();

	render();
}

function render() {
	renderer.render(scene, camera);
	renderer2.render(scene, camera2);
	renderer3.render(scene, camera);
	renderer4.render(scene, camera);
}
animate();
