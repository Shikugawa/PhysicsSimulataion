var g = 9.8;
var t = 0;
var dt = 0.001;
var skip = 400;

var Ball = function(m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2){
  this.m1 = m1;
  this.x1 = x1;
  this.y1 = y1;
  this.z1 = z1;
  this.vx1 = vx1;
  this.vy1 = vy1;
  this.vz1 = vz1;
  this.m2 = m2;
  this.x2 = x2;
  this.y2 = y2;
  this.z2 = z2;
  this.vx2 = vx2;
  this.vy2 = vy2;
  this.vz2 = vz2;
};

var Poll = function(x, y, z){
  this.x = x;
  this.y = y;
  this.z = z;
};

var poll = new Poll(0, 0, 100);
var ball = new Ball( ,0, 60, 100, 0, 0, 0, , 0, 120, 100, 0, 0, 0);

Ball.prototype.fx1 = function(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2){
  return vx1;
};

Ball.prototype.fvx1 = function(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2){
  var l01 = Math.sqrt(Math.pow(x1 - poll.x, 2) + Math.pow(y1 - poll.y, 2) + Math.pow(z1 - poll.z, 2));
  var l12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2- z1, 2));
  var cos_12 = ((x1 - poll.x)*(x2 - x1)+(y1 - poll.y)*(y2 - y1)+(z1 - poll.z)*(z2-z1)) / (l01*l12);
  var lamda1 = (l12 * (m1+m2) * ( (Math.pow(vx1,2) + Math.pow(vy1,2) + Math.pow(vz1,2)) - g * (z1 -poll.z) ) + m2 * l01 * cos_12 * (Math.pow(vx2-vx1,2)+Math.pow(vy2-vy1,2)+Math.pow(vz2-vz1,2)) ) / (Math.pow(l01,2)*l12*(m1+m2*(1.0-Math.pow(cos_12,2))));
  var lamda2 = (l12 * cos_12 * ( (Math.pow(vx1,2) + Math.pow(vy1,2) + Math.pow(vz1,2)) - g * (z1 -poll.z) ) + l01 * (Math.pow(vx2-vx1,2)+Math.pow(vy2-vy1,2)+Math.pow(vz2-vz1,2)) ) / (Math.pow(l01,2)*l01*(m1+m2*(1.0-Math.pow(cos_12,2))));
  return -lamda1*(x1-poll.x) -m2*lamda2*(x1-x2);
};

Ball.prototype.fy1 = function(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2){
  return vy1;
};

Ball.prototype.fvy1 = function(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2){
  var l01 = Math.sqrt(Math.pow(x1 - poll.x, 2) + Math.pow(y1 - poll.y, 2) + Math.pow(z1 - poll.z, 2));
  var l12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2- z1, 2));
  var cos_12 = ((x1 - poll.x)*(x2 - x1)+(y1 - poll.y)*(y2 - y1)+(z1 - poll.z)*(z2-z1)) / (l01*l12);
  var lamda1 = (l12 * (m1+m2) * ( (Math.pow(vx1,2) + Math.pow(vy1,2) + Math.pow(vz1,2)) - g * (z1 -poll.z) ) + m2 * l01 * cos_12 * (Math.pow(vx2-vx1,2)+Math.pow(vy2-vy1,2)+Math.pow(vz2-vz1,2)) ) / (Math.pow(l01,2)*l12*(m1+m2*(1.0-Math.pow(cos_12,2))));
  var lamda2 = (l12 * cos_12 * ( (Math.pow(vx1,2) + Math.pow(vy1,2) + Math.pow(vz1,2)) - g * (z1 -poll.z) ) + l01 * (Math.pow(vx2-vx1,2)+Math.pow(vy2-vy1,2)+Math.pow(vz2-vz1,2)) ) / (Math.pow(l01,2)*l01*(m1+m2*(1.0-Math.pow(cos_12,2))));
  return -lamda1*(x1-poll.x) -m2*lamda2*(x1-x2);
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

var scene = new THREE.Scene();
var width = document.getElementById('canvas-frame').clientWidth;
var height = document.getElementById('canvas-frame').clientHeight;
var camera;
var directionalLight;
var ambientLight;
var renderer;

function initCamera(){
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(300,0,100);
  camera.up.set(0,0,1);
  camera.lookAt({x:0, y:0, z:20});
}

function initRender(){
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(width, height);
  renderer.setClearColor(0x191970);
  document.getElementById('canvas-frame').appendChild(renderer.domElement);
}

function initLight(){
  directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0,0.7,0.7);
  scene.add(directionalLight);

  ambientLight = new THREE.AmbientLight(0x555555);
  scene.add(ambientLight);
}

function initObjects(){
  var fe = new THREE.Color( 0.560, 0.570, 0.580 );
  var au = new THREE.Color( 1.000, 0.766, 0.336 );

  var axis = new THREE.AxisHelper(800);
  scene.add(axis);

  poll.object = new THREE.Mesh(
    new THREE.CubeGeometry(5, 5, 5),
    new THREE.MeshLambertMaterial(fe)
  );
  poll.object.position.set(poll.x, poll.y, poll.z);
  scene.add(poll.object);

  ball.object = new THREE.Mesh(
      new THREE.SphereGeometry(5, 5, 5),
      new THREE.MeshLambertMaterial(au)
    );
  scene.add(ball.object);

  ball_second.object = new THREE.Mesh(
      new THREE.SphereGeometry(5, 5, 5),
      new THREE.MeshLambertMaterial(au)
    );
  scene.add(ball_second.object);
}

  function loop() {
    for(var i=1; i<=skip; i++ ){
      ball.RungeKutta4();
    }

    t += dt * skip;
    ball.object.position.set(ball.x, ball.y, ball.z); 
       
    var geometry = new THREE.Geometry(); 
    var material = new THREE.LineBasicMaterial({color: 0x000000});
    geometry.vertices.push(
        new THREE.Vector3(poll.x, poll.y, poll.z),
        new THREE.Vector3(ball.x,ball.y,ball.z)
      );
    var line = new THREE.Line(geometry, material);
    scene.add(line);
      
    renderer.clear();
    renderer.render(scene, camera);
    scene.remove( line );   
    window.requestAnimationFrame(loop);
  }
  

function main(){
  initRender();
  initCamera();
  initLight();
  initObjects();
  loop();
}

main();