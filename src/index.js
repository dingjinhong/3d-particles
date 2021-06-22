import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Model from './model'

/*------------------------------
Renderer
------------------------------*/
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


/*------------------------------
Scene & Camera
------------------------------*/
const scene = new THREE.Scene();
scene.background = new THREE.Color('#d8e6e7');
const camera = new THREE.PerspectiveCamera( 
  50, 
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 5;
camera.position.y = 1;


/*------------------------------
Mesh
------------------------------*/
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial( { 
  color: 0x00ff00,
} );
const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );


/*------------------------------
OrbitControls
------------------------------*/
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true; 
controls.enableZoom = true;
controls.autoRotate = true;
controls.enablePan = true; 

/*------------------------------
mousemove
------------------------------*/
document.addEventListener('mousemove', onDocumentMouseMove, false);
var mouseX = 0, mouseY = 0;
function onDocumentMouseMove(event){
  mouseX = ( event.clientX - windowHalfX ) * 2;
  mouseY = ( event.clientY - windowHalfY ) * 2;
}
/*------------------------------
dat.GUI
------------------------------*/
// const gui = new dat.GUI();
// var guicontrols = new function(){
//   this.particleNum = 10000;
//   this.pointSize = 6.0;
// };
// gui.add(guicontrols, 'particleNum', 0, 30000);
// gui.add(guicontrols, 'pointSize', 0, 10.0);

/*------------------------------
Helpers
------------------------------*/
// const gridHelper = new THREE.GridHelper( 10, 10 );
// scene.add( gridHelper );
// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );

/*------------------------------
Models
------------------------------*/
const skull = new Model({
  name: 'skull',
  file: './models/horse.glb',
  scene: scene,
  placeOnLoad: true,
  color1: '#8EC0E4',
  color2: '#fd999a'
})
const horse = new Model({
  name: 'horse',
  file: './models/skull.glb',
  scene: scene,
  placeOnLoad: false,
  color1: '#eb9f9f',
  color2: '#ffffff'
})

// const trans = new Trans({
//   name: '1',
//   before: './models/skull.glb',
//   after: './models/horse.glb',
//   scene: scene,
//   placeOnLoad: true,
//   color1: '#1ec0ff',
//   color2: '#fd999a'
// })

/*------------------------------
Controllers
------------------------------*/

const buttons = document.querySelectorAll("button");
console.log(buttons)
buttons[0].addEventListener('click', ()=>{
  skull.remove()
  horse.add()
})
buttons[1].addEventListener('click', ()=>{
  horse.remove()
  skull.add()
})

/*------------------------------
Clock
------------------------------*/
const clock = new THREE.Clock();


/*------------------------------
Loop
------------------------------*/
const animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  controls.update();

  // skull.particalMaterial.uniforms.uSize.value = guicontrols.pointSize;

  if (skull.isActive){
    skull.particalMaterial.uniforms.uTime.value = clock.getElapsedTime();
  }
  if (horse.isActive){
    horse.particalMaterial.uniforms.uTime.value = clock.getElapsedTime();
  }

  


};
animate();


/*------------------------------
Resize
------------------------------*/
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );