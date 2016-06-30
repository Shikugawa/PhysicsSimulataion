var Ball = function(x, y, z, vx, vy, vz){
  this.x = x;
  this.y = y;
  this.z = z;
  this.vx = vx;
  this.vy = vy;
  this.vz = vz;
};

  var t = 0;
  var dt = 0.001;
  var skip = 500;
  var g = 9.8;

  Ball.prototype.fx = function(t, x, y, z, vx, vy, vz){
    return vx;
  };

  Ball.prototype.fvx = function(t, x, y, z, vx, vy, vz){
    var l2 = Math.pow(x,2)  + Math.pow(y,2)  + Math.pow(z,2);
    var v2 = Math.pow(vx,2) + Math.pow(vy,2) + Math.pow(vz,2);
    return (g*z-v2) * x / l2 ;
  };

  Ball.prototype.fy = function(t, x, y, z, vx, vy, vz){
    return vy;
  };

  Ball.prototype.fvy = function(t, x, y, z, vx, vy, vz){
    var l2 = Math.pow(x,2)  + Math.pow(y,2)  + Math.pow(z,2);
    var v2 = Math.pow(vx,2) + Math.pow(vy,2) + Math.pow(vz,2);
    return (g*z-v2) * y / l2 ;
  };

  Ball.prototype.fz = function(t, x, y, z, vx, vy, vz){
    return vz;
  };

  Ball.prototype.fvz = function(t, x, y, z, vx, vy, vz){
    var l2 = Math.pow(x,2)  + Math.pow(y,2)  + Math.pow(z,2);
    var v2 = Math.pow(vx,2) + Math.pow(vy,2) + Math.pow(vz,2);
    return -g + (g*z-v2) * z / l2 ;
  };

  Ball.prototype.RungeKutta4 = function(){
    var k1 = new Array(6);
    var k2 = new Array(6);
    var k3 = new Array(6);
    var k4 = new Array(6);
   
    var x = this.x - poll.x;
    var y = this.y - poll.y;  
    var z = this.z - poll.z;
    var vx = this.vx;
    var vy = this.vy;  
    var vz = this.vz;  
    k1[0]=dt*this.fx(t,x,y,z,vx,vy,vz);
    k1[1]=dt*this.fvx(t,x,y,z,vx,vy,vz);
    k1[2]=dt*this.fy(t,x,y,z,vx,vy,vz);
    k1[3]=dt*this.fvy(t,x,y,z,vx,vy,vz);
    k1[4]=dt*this.fz(t,x,y,z,vx,vy,vz);
    k1[5]=dt*this.fvz(t,x,y,z,vx,vy,vz);
    k2[0]=dt*this.fx(t+dt/2.0, x+k1[0]/2.0,y+k1[2]/2.0,z+k1[4]/2.0,vx+k1[1]/2.0,vy+k1[3]/2.0,vz+k1[5]/2.0);
    k2[1]=dt*this.fvx(t+dt/2.0,x+k1[0]/2.0,y+k1[2]/2.0,z+k1[4]/2.0,vx+k1[1]/2.0,vy+k1[3]/2.0,vz+k1[5]/2.0);
    k2[2]=dt*this.fy(t+dt/2.0, x+k1[0]/2.0,y+k1[2]/2.0,z+k1[4]/2.0,vx+k1[1]/2.0,vy+k1[3]/2.0,vz+k1[5]/2.0);
    k2[3]=dt*this.fvy(t+dt/2.0,x+k1[0]/2.0,y+k1[2]/2.0,z+k1[4]/2.0,vx+k1[1]/2.0,vy+k1[3]/2.0,vz+k1[5]/2.0);
    k2[4]=dt*this.fz(t+dt/2.0, x+k1[0]/2.0,y+k1[2]/2.0,z+k1[4]/2.0,vx+k1[1]/2.0,vy+k1[3]/2.0,vz+k1[5]/2.0);
    k2[5]=dt*this.fvz(t+dt/2.0,x+k1[0]/2.0,y+k1[2]/2.0,z+k1[4]/2.0,vx+k1[1]/2.0,vy+k1[3]/2.0,vz+k1[5]/2.0);
    k3[0]=dt*this.fx(t+dt/2.0, x+k2[0]/2.0,y+k2[2]/2.0,z+k2[4]/2.0,vx+k2[1]/2.0,vy+k2[3]/2.0,vz+k2[5]/2.0);
    k3[1]=dt*this.fvx(t+dt/2.0,x+k2[0]/2.0,y+k2[2]/2.0,z+k2[4]/2.0,vx+k2[1]/2.0,vy+k2[3]/2.0,vz+k2[5]/2.0);
    k3[2]=dt*this.fy(t+dt/2.0, x+k2[0]/2.0,y+k2[2]/2.0,z+k2[4]/2.0,vx+k2[1]/2.0,vy+k2[3]/2.0,vz+k2[5]/2.0);
    k3[3]=dt*this.fvy(t+dt/2.0,x+k2[0]/2.0,y+k2[2]/2.0,z+k2[4]/2.0,vx+k2[1]/2.0,vy+k2[3]/2.0,vz+k2[5]/2.0);
    k3[4]=dt*this.fz(t+dt/2.0, x+k2[0]/2.0,y+k2[2]/2.0,z+k2[4]/2.0,vx+k2[1]/2.0,vy+k2[3]/2.0,vz+k2[5]/2.0);
    k3[5]=dt*this.fvz(t+dt/2.0,x+k2[0]/2.0,y+k2[2]/2.0,z+k2[4]/2.0,vx+k2[1]/2.0,vy+k2[3]/2.0,vz+k2[5]/2.0);
    k4[0]=dt*this.fx(t+dt/2.0, x+k3[0],y+k3[2],z+k3[4],vx+k3[1],vy+k3[3],vz+k3[5]);
    k4[1]=dt*this.fvx(t+dt/2.0,x+k3[0],y+k3[2],z+k3[4],vx+k3[1],vy+k3[3],vz+k3[5]);
    k4[2]=dt*this.fy(t+dt/2.0, x+k3[0],y+k3[2],z+k3[4],vx+k3[1],vy+k3[3],vz+k3[5]);
    k4[3]=dt*this.fvy(t+dt/2.0,x+k3[0],y+k3[2],z+k3[4],vx+k3[1],vy+k3[3],vz+k3[5]);
    k4[4]=dt*this.fz(t+dt/2.0, x+k3[0],y+k3[2],z+k3[4],vx+k3[1],vy+k3[3],vz+k3[5]);
    k4[5]=dt*this.fvz(t+dt/2.0,x+k3[0],y+k3[2],z+k3[4],vx+k3[1],vy+k3[3],vz+k3[5]);
    this.x  +=  (k1[0]+2.0*k2[0]+2.0*k3[0]+k4[0])/6.0;
    this.vx +=  (k1[1]+2.0*k2[1]+2.0*k3[1]+k4[1])/6.0;
    this.y  +=  (k1[2]+2.0*k2[2]+2.0*k3[2]+k4[2])/6.0;
    this.vy +=  (k1[3]+2.0*k2[3]+2.0*k3[3]+k4[3])/6.0;
    this.z  +=  (k1[4]+2.0*k2[4]+2.0*k3[4]+k4[4])/6.0;
    this.vz +=  (k1[5]+2.0*k2[5]+2.0*k3[5]+k4[5])/6.0;
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

  var ball_property = new Ball(0, 60, 100, 0, 0, 0);
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

  (function loop(){ 
    for(var i=1; i <= skip; i++){
      ball_property.prototype.RungeKutta4();
    }
    t += dt*skip;

    window.requestAnimationFrame(loop);
  })();
  

  renderer.render(scene, camera);
};
 
window.addEventListener( 'DOMContentLoaded', main, false );