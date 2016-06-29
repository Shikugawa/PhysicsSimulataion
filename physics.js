var main = function () {
  var scene = new THREE.Scene();

  // camera
  var width = document.getElementById('canvas-frame').clientWidth;
  var height = document.getElementById('canvas-frame').clientHeight;
  var camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
  camera.position.set(0,0,50);

  // renderer
  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(width, height);
  document.getElementById('canvas-frame').appendChild(renderer.domElement);

  // light
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0,0.7,0.7);
  scene.add(directionalLight);

  // objexts
  axis = new THREE.AxisHelper(800);
  scene.add(axis);

  /*
    (function loop(){ })();
  */

  renderer.render(scene, camera);
};
 
window.addEventListener( 'DOMContentLoaded', main, false );