// Load dependencies
import * as THREE from './three.js-master/build/three.module.js';

// import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/loaders/RGBELoader.js';

// Initialize Three.js scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
// const renderer = new THREE.WebGLRenderer({ antialias: true });
const canv = document.getElementById("my_canvas");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas : canv });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



// Load custom 3D objects
let customObject;
const gltfLoader = new GLTFLoader().setPath('static/models/');
const rgbeLoader = new RGBELoader().setDataType(THREE.UnsignedByteType).setPath('static/world/');
gltfLoader.load("alb_ears.glb", function(gltf) {
  customObject = gltf.scene;
  customObject.rotation.y -= 0.7

  // customObject.scale.set(1.3, 1.3, 1.3)
  // mixer = new THREE.AnimationMixer( customObject.scene );
  // var action = mixer.clipAction( customObject.animations[ 0 ]);
  // var action_b = mixer.clipAction( customObject.animations[ 1 ]);
  // // var action_c = mixer.clipAction( gltf.animations[ 2 ]);
    
  // action.play();
  // action_b.play();
  // action_c.play();


  // render();
  scene.add(customObject);
  customObject.position.set(0, 0, 0);
  renderer.render(scene, camera);
});

rgbeLoader.load("skylne4K.pic", function(texture) {
  const envMap = new THREE.PMREMGenerator(renderer).fromEquirectangular(texture).texture;
  scene.environment = envMap;
  scene.background = envMap;

  // texture.dispose();
  // pmremGenerator.dispose();

  renderer.render(scene, camera);
});





// Animate the z-rotation of the custom object on scroll
let scrollPos = window.pageYOffset;
window.onscroll = function() {
  let newScrollPos = window.pageYOffset;
  let delta = newScrollPos - scrollPos;
  customObject.rotation.y += delta * 0.01;
  scrollPos = newScrollPos;
  renderer.render(scene, camera);
};

// Render the scene
renderer.render(scene, camera);

