var scene = new THREE.Scene();
var width = document.getElementById('canvas_frame').clientWidth;
var height = document.getElementById('canvas_frame').clientHeight;
var ambientLight;
var directionalLight;
var camera;

function initRenderer(){
  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(width, height);
  renderer.setClearColor(0xffff);
  document.getElementById('canvas_frame').appendChild(renderer.domElement);
}

function initCamera(){
  camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
  camera.position.set();
  camera.up.set(0, 0, 1);
  camera.lookAt({x:0, y:0, z:0});
}

function initLight(){
  directionalLight 
}