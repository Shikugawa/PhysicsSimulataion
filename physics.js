var Ball = function(x, y, z){
  this.x = x;
  this.y = y;
  this.z = z;

  /* ルンゲクッタ法による振り子の座標を計算する。 初期条件(最初の座標と時間t)、タイムステップdt */
};

var main = function () {
  var scene = new THREE.Scene();

  // camera
  var width = document.getElementById('canvas-frame').clientWidth;
  var height = document.getElementById('canvas-frame').clientHeight;
  var camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(300,0,100);
  camera.up.set(0,0,1);
  camera.lookAt({x:0, y:0, z:0});

  // renderer
  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(width, height);
  renderer.setClearColor(0xffffff);
  document.getElementById('canvas-frame').appendChild(renderer.domElement);
  renderer.shadowMapEnabled = true;

  // light
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0,0.7,0.7);
  scene.add(directionalLight);

  var ambientlight = new THREE.AmbientLight(0x555555);
  scene.add(ambientlight);

  // objexts
  axis = new THREE.AxisHelper(800);
  scene.add(axis); // 赤: x　青: z 緑: y

  var fe = new THREE.Color( 0.560, 0.570, 0.580 );
  var au = new THREE.Color( 1.000, 0.766, 0.336 );

  floor = new THREE.Mesh(
      new THREE.PlaneGeometry(500,500,500),
      new THREE.MeshLambertMaterial({color: 0xa0a0a0})
    );
  scene.add(floor);

  var poll = new THREE.Mesh(
    new THREE.CubeGeometry(5, 5, 5),
    new THREE.MeshLambertMaterial(fe)
  );
  poll.castShadow = true;
  poll.position.set(0, 0, 100);
  scene.add(poll);

  var ball_property = new Ball(0, 60, 100);
  var ball = new THREE.Mesh(
    new THREE.SphereGeometry(5, 5, 5),
    new THREE.MeshLambertMaterial(au)
  );
  ball.castShadow = true;
  ball.position.set(ball_property.x, ball_property.y, ball_property.z);
  scene.add(ball);

  /*
  var ball2 = new THREE.Mesh(
    new THREE.SphereGeometry(5, 5, 5),
    new THREE.MeshLambertMaterial(au)
  );
  ball2.castShadow = true;
  ball2.position.set(0, 90, 100);
  scene.add(ball2);
  */

  var geometry = new THREE.Geometry(); 
  var material = new THREE.LineBasicMaterial({color: 0x000000});
  geometry.vertices.push(
      new THREE.Vector3(0,0,100),
      new THREE.Vector3(ball_property.x,ball_property.y,ball_property.z)
      /* new THREE.Vector3(0,90,100) */
    );
  var line = new THREE.Line(geometry, material);
  scene.add(line);

  /*
  var t = 0;
  (function loop(){ 
    window.requestAnimationFrame(loop);
    sphere.rotation.set(0, 0, (t++) / 100);
    renderer.render(scene, camera);
  })();
  */
  

  renderer.render(scene, camera);
};
 
window.addEventListener( 'DOMContentLoaded', main, false );