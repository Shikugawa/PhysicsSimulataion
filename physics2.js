var g = 9.8;
var t = 0;
var dt = 0.001;
var skip = 400;
var test = document.getElementById('sphere1_x').value;

var Ball = function(m, x, y, z, vx, vy, vz){
  this.m = m;
  this.x = x;
  this.y = y;
  this.z = z;
  this.vx = vx;
  this.vy = vy;
  this.vz = vz;
};

var Poll = function(x, y, z){
  this.x = x;
  this.y = y;
  this.z = z;
};

var Pendulum = function(x, y, z, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2){
  this.poll = new Poll(x, y, z);
  this.ball1 = new Ball(m1, x1, y1, z1, vx1, vy1, vz1);
  this.ball2 = new Ball(m2, x2, y2, z2, vx2, vy2, vz2);
  this.L01 = 0;
  this.L12 = 0;
  this.cos12 = 0;                       
  this.lambda1 = 0;
  this.lambda2 = 0;
  this.S01 = 0;
  this.S12 = 0;
  this.T = 0; 
  this.V = 0; 
  this.E  = 0;
  this.tension01_max = 1;
  this.tension12_max = 1;
};

Pendulum.prototype.cul = function(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2){
  this.L01 = Math.sqrt(Math.pow(x1-this.poll.x,2)+Math.pow(y1-this.poll.y,2)+Math.pow(z1-this.poll.z,2));
  this.L12 = Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2)+Math.pow(z2-z1,2));
  var L01 = this.L01, L12 = this.L12;
  this.cos12 = ((x1-this.poll.x)*(x2-x1)+(y1-this.poll.y)*(y2-y1)+(z1-this.poll.z)*(z2-z1))/(L01*L12);
  var cos12 = this.cos12;
  this.lambda1 = -m1 * (L12 * (m1+m2) * ( (Math.pow(vx1,2) + Math.pow(vy1,2) + Math.pow(vz1,2)) - g * (z1 -this.poll.z) ) + m2 * L01 * cos12 * (Math.pow(vx2-vx1,2)+Math.pow(vy2-vy1,2)+Math.pow(vz2-vz1,2)) ) / (Math.pow(L01,2)*L12*(m1+m2*(1.0-Math.pow(cos12,2))));
  this.lambda2 = -m2 * m1 *(L12 * cos12 * ( (Math.pow(vx1,2) + Math.pow(vy1,2) + Math.pow(vz1,2)) - g * (z1 -this.poll.z) ) + L01 * (Math.pow(vx2-vx1,2)+Math.pow(vy2-vy1,2)+Math.pow(vz2-vz1,2)) ) / (L01*Math.pow(L12,2)*(m1+m2*(1.0-Math.pow(cos12,2))));
};

Pendulum.prototype.tension = function() {
  this.cul(t, this.ball1.m, this.ball1.x, this.ball1.y, this.ball1.z, this.ball1.vx, this.ball1.vy, this.ball1.vz, this.ball2.m, this.ball2.x, this.ball2.y, this.ball2.z, this.ball2.vx, this.ball2.vy, this.ball2.vz); 
  this.S01 = Math.abs(this.lambda1) * this.L01;
  this.S12 = Math.abs(this.lambda2) * this.L12;
  if( this.tension01_max< this.S01) this.tension01_max = this.S01;
  if( this.tension12_max< this.S12) this.tension12_max = this.S12;
  this.T = this.ball1.m * (Math.pow(this.ball1.vx,2)+Math.pow(this.ball1.vy,2)+Math.pow(this.ball1.vz,2))/2 + this.ball2.m * (Math.pow(this.ball2.vx,2)+Math.pow(this.ball2.vy,2)+Math.pow(this.ball2.vz,2))/2;
  this.V = this.ball1.m * g * this.ball1.z + this.ball2.m * g * this.ball2.z;
  this.E = this.T + this.V;
}; 

Pendulum.prototype.fx1 = function(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2){
  return vx1;
};

Pendulum.prototype.fy1 = function(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2){
  return vy1;
};

Pendulum.prototype.fz1 = function(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2){
  return vz1;
};

Pendulum.prototype.fvx1 = function(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2){
  this.cul(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2);
  return this.lambda1*(x1-this.poll.x)/m1 + this.lambda2*(x1-x2)/m1;
};

Pendulum.prototype.fvy1 = function(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2){
  this.cul(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2);
  return this.lambda1*(y1-this.poll.y)/m1 +this.lambda2*(y1-y2)/m1;
};

Pendulum.prototype.fvz1 = function(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2){
  this.cul(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2);
  return - g + this.lambda1*(z1-this.poll.z)/m1 + this.lambda2*(z1-z2)/m1;
};

Pendulum.prototype.fx2 = function(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2){
  return vx2;
};

Pendulum.prototype.fy2 = function(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2){
  return vy2;
};

Pendulum.prototype.fz2 = function(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2){
  return vz2;
};

Pendulum.prototype.fvx2 = function(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2){
  this.cul(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2);
  return this.lambda2*(x2-x1)/m2;
};

Pendulum.prototype.fvy2 = function(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2){
  this.cul(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2);
  return this.lambda2*(y2-y1)/m2;
};

Pendulum.prototype.fvz2 = function(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2){
  this.cul(t, m1, x1, y1, z1, vx1, vy1, vz1, m2, x2, y2, z2, vx2, vy2, vz2);
  return -g + this.lambda2*(z2-z1)/m2;
};

Pendulum.prototype.RungeKutta4 = function(){
  var k1 = new Array(2); 
  var k2 = new Array(2); 
  var k3 = new Array(2);
  var k4 = new Array(2);  
  for (var i = 0; i < 2; i++) {
    k1[i] = new Array(6);
    k2[i] = new Array(6);
    k3[i] = new Array(6);
    k4[i] = new Array(6);       
  } 
  var m1 = this.ball1.m, x1 = this.ball1.x, y1 = this.ball1.y, z1 = this.ball1.z, vx1 = this.ball1.vx, vy1 = this.ball1.vy, vz1 = this.ball1.vz;
  var m2 = this.ball2.m ,x2 = this.ball2.x, y2 = this.ball2.y, z2 = this.ball2.z, vx2 = this.ball2.vx, vy2 = this.ball2.vy, vz2 = this.ball2.vz ;

  k1[0][0]=dt*this.fx1( t,m1,x1,y1,z1,vx1,vy1,vz1,m2,x2,y2,z2,vx2,vy2,vz2);
  k1[0][1]=dt*this.fvx1(t,m1,x1,y1,z1,vx1,vy1,vz1,m2,x2,y2,z2,vx2,vy2,vz2);
  k1[0][2]=dt*this.fy1( t,m1,x1,y1,z1,vx1,vy1,vz1,m2,x2,y2,z2,vx2,vy2,vz2);
  k1[0][3]=dt*this.fvy1(t,m1,x1,y1,z1,vx1,vy1,vz1,m2,x2,y2,z2,vx2,vy2,vz2);
  k1[0][4]=dt*this.fz1( t,m1,x1,y1,z1,vx1,vy1,vz1,m2,x2,y2,z2,vx2,vy2,vz2);
  k1[0][5]=dt*this.fvz1(t,m1,x1,y1,z1,vx1,vy1,vz1,m2,x2,y2,z2,vx2,vy2,vz2);
  k1[1][0]=dt*this.fx2( t,m1,x1,y1,z1,vx1,vy1,vz1,m2,x2,y2,z2,vx2,vy2,vz2);
  k1[1][1]=dt*this.fvx2(t,m1,x1,y1,z1,vx1,vy1,vz1,m2,x2,y2,z2,vx2,vy2,vz2);
  k1[1][2]=dt*this.fy2( t,m1,x1,y1,z1,vx1,vy1,vz1,m2,x2,y2,z2,vx2,vy2,vz2);
  k1[1][3]=dt*this.fvy2(t,m1,x1,y1,z1,vx1,vy1,vz1,m2,x2,y2,z2,vx2,vy2,vz2);
  k1[1][4]=dt*this.fz2( t,m1,x1,y1,z1,vx1,vy1,vz1,m2,x2,y2,z2,vx2,vy2,vz2);
  k1[1][5]=dt*this.fvz2(t,m1,x1,y1,z1,vx1,vy1,vz1,m2,x2,y2,z2,vx2,vy2,vz2);
  
  k2[0][0]=dt*this.fx1( t+dt/2.0,m1,x1+k1[0][0]/2.0,y1+k1[0][2]/2.0,z1+k1[0][4]/2.0,vx1+k1[0][1]/2.0,vy1+k1[0][3]/2.0,vz1+k1[0][5]/2.0, m2,x2+k1[1][0]/2.0,y2+k1[1][2]/2.0,z2+k1[1][4]/2.0,vx2+k1[1][1]/2.0,vy2+k1[1][3]/2.0,vz2+k1[1][5]/2.0);
  k2[0][1]=dt*this.fvx1(t+dt/2.0,m1,x1+k1[0][0]/2.0,y1+k1[0][2]/2.0,z1+k1[0][4]/2.0,vx1+k1[0][1]/2.0,vy1+k1[0][3]/2.0,vz1+k1[0][5]/2.0, m2,x2+k1[1][0]/2.0,y2+k1[1][2]/2.0,z2+k1[1][4]/2.0,vx2+k1[1][1]/2.0,vy2+k1[1][3]/2.0,vz2+k1[1][5]/2.0);
  k2[0][2]=dt*this.fy1( t+dt/2.0,m1,x1+k1[0][0]/2.0,y1+k1[0][2]/2.0,z1+k1[0][4]/2.0,vx1+k1[0][1]/2.0,vy1+k1[0][3]/2.0,vz1+k1[0][5]/2.0, m2,x2+k1[1][0]/2.0,y2+k1[1][2]/2.0,z2+k1[1][4]/2.0,vx2+k1[1][1]/2.0,vy2+k1[1][3]/2.0,vz2+k1[1][5]/2.0);
  k2[0][3]=dt*this.fvy1(t+dt/2.0,m1,x1+k1[0][0]/2.0,y1+k1[0][2]/2.0,z1+k1[0][4]/2.0,vx1+k1[0][1]/2.0,vy1+k1[0][3]/2.0,vz1+k1[0][5]/2.0, m2,x2+k1[1][0]/2.0,y2+k1[1][2]/2.0,z2+k1[1][4]/2.0,vx2+k1[1][1]/2.0,vy2+k1[1][3]/2.0,vz2+k1[1][5]/2.0);
  k2[0][4]=dt*this.fz1( t+dt/2.0,m1,x1+k1[0][0]/2.0,y1+k1[0][2]/2.0,z1+k1[0][4]/2.0,vx1+k1[0][1]/2.0,vy1+k1[0][3]/2.0,vz1+k1[0][5]/2.0, m2,x2+k1[1][0]/2.0,y2+k1[1][2]/2.0,z2+k1[1][4]/2.0,vx2+k1[1][1]/2.0,vy2+k1[1][3]/2.0,vz2+k1[1][5]/2.0);
  k2[0][5]=dt*this.fvz1(t+dt/2.0,m1,x1+k1[0][0]/2.0,y1+k1[0][2]/2.0,z1+k1[0][4]/2.0,vx1+k1[0][1]/2.0,vy1+k1[0][3]/2.0,vz1+k1[0][5]/2.0, m2,x2+k1[1][0]/2.0,y2+k1[1][2]/2.0,z2+k1[1][4]/2.0,vx2+k1[1][1]/2.0,vy2+k1[1][3]/2.0,vz2+k1[1][5]/2.0);
  k2[1][0]=dt*this.fx2( t+dt/2.0,m1,x1+k1[0][0]/2.0,y1+k1[0][2]/2.0,z1+k1[0][4]/2.0,vx1+k1[0][1]/2.0,vy1+k1[0][3]/2.0,vz1+k1[0][5]/2.0, m2,x2+k1[1][0]/2.0,y2+k1[1][2]/2.0,z2+k1[1][4]/2.0,vx2+k1[1][1]/2.0,vy2+k1[1][3]/2.0,vz2+k1[1][5]/2.0);
  k2[1][1]=dt*this.fvx2(t+dt/2.0,m1,x1+k1[0][0]/2.0,y1+k1[0][2]/2.0,z1+k1[0][4]/2.0,vx1+k1[0][1]/2.0,vy1+k1[0][3]/2.0,vz1+k1[0][5]/2.0, m2,x2+k1[1][0]/2.0,y2+k1[1][2]/2.0,z2+k1[1][4]/2.0,vx2+k1[1][1]/2.0,vy2+k1[1][3]/2.0,vz2+k1[1][5]/2.0);
  k2[1][2]=dt*this.fy2( t+dt/2.0,m1,x1+k1[0][0]/2.0,y1+k1[0][2]/2.0,z1+k1[0][4]/2.0,vx1+k1[0][1]/2.0,vy1+k1[0][3]/2.0,vz1+k1[0][5]/2.0, m2,x2+k1[1][0]/2.0,y2+k1[1][2]/2.0,z2+k1[1][4]/2.0,vx2+k1[1][1]/2.0,vy2+k1[1][3]/2.0,vz2+k1[1][5]/2.0);
  k2[1][3]=dt*this.fvy2(t+dt/2.0,m1,x1+k1[0][0]/2.0,y1+k1[0][2]/2.0,z1+k1[0][4]/2.0,vx1+k1[0][1]/2.0,vy1+k1[0][3]/2.0,vz1+k1[0][5]/2.0, m2,x2+k1[1][0]/2.0,y2+k1[1][2]/2.0,z2+k1[1][4]/2.0,vx2+k1[1][1]/2.0,vy2+k1[1][3]/2.0,vz2+k1[1][5]/2.0);
  k2[1][4]=dt*this.fz2( t+dt/2.0,m1,x1+k1[0][0]/2.0,y1+k1[0][2]/2.0,z1+k1[0][4]/2.0,vx1+k1[0][1]/2.0,vy1+k1[0][3]/2.0,vz1+k1[0][5]/2.0, m2,x2+k1[1][0]/2.0,y2+k1[1][2]/2.0,z2+k1[1][4]/2.0,vx2+k1[1][1]/2.0,vy2+k1[1][3]/2.0,vz2+k1[1][5]/2.0);
  k2[1][5]=dt*this.fvz2(t+dt/2.0,m1,x1+k1[0][0]/2.0,y1+k1[0][2]/2.0,z1+k1[0][4]/2.0,vx1+k1[0][1]/2.0,vy1+k1[0][3]/2.0,vz1+k1[0][5]/2.0, m2,x2+k1[1][0]/2.0,y2+k1[1][2]/2.0,z2+k1[1][4]/2.0,vx2+k1[1][1]/2.0,vy2+k1[1][3]/2.0,vz2+k1[1][5]/2.0);
  
  k3[0][0]=dt*this.fx1( t+dt/2.0,m1,x1+k2[0][0]/2.0,y1+k2[0][2]/2.0,z1+k2[0][4]/2.0,vx1+k2[0][1]/2.0,vy1+k2[0][3]/2.0,vz1+k2[0][5]/2.0   ,m2,x2+k2[1][0]/2.0,y2+k2[1][2]/2.0,z2+k2[1][4]/2.0,vx2+k2[1][1]/2.0,vy2+k2[1][3]/2.0,vz2+k2[1][5]/2.0);
  k3[0][1]=dt*this.fvx1(t+dt/2.0,m1,x1+k2[0][0]/2.0,y1+k2[0][2]/2.0,z1+k2[0][4]/2.0,vx1+k2[0][1]/2.0,vy1+k2[0][3]/2.0,vz1+k2[0][5]/2.0   ,m2,x2+k2[1][0]/2.0,y2+k2[1][2]/2.0,z2+k2[1][4]/2.0,vx2+k2[1][1]/2.0,vy2+k2[1][3]/2.0,vz2+k2[1][5]/2.0);
  k3[0][2]=dt*this.fy1( t+dt/2.0,m1,x1+k2[0][0]/2.0,y1+k2[0][2]/2.0,z1+k2[0][4]/2.0,vx1+k2[0][1]/2.0,vy1+k2[0][3]/2.0,vz1+k2[0][5]/2.0   ,m2,x2+k2[1][0]/2.0,y2+k2[1][2]/2.0,z2+k2[1][4]/2.0,vx2+k2[1][1]/2.0,vy2+k2[1][3]/2.0,vz2+k2[1][5]/2.0);
  k3[0][3]=dt*this.fvy1(t+dt/2.0,m1,x1+k2[0][0]/2.0,y1+k2[0][2]/2.0,z1+k2[0][4]/2.0,vx1+k2[0][1]/2.0,vy1+k2[0][3]/2.0,vz1+k2[0][5]/2.0   ,m2,x2+k2[1][0]/2.0,y2+k2[1][2]/2.0,z2+k2[1][4]/2.0,vx2+k2[1][1]/2.0,vy2+k2[1][3]/2.0,vz2+k2[1][5]/2.0);
  k3[0][4]=dt*this.fz1( t+dt/2.0,m1,x1+k2[0][0]/2.0,y1+k2[0][2]/2.0,z1+k2[0][4]/2.0,vx1+k2[0][1]/2.0,vy1+k2[0][3]/2.0,vz1+k2[0][5]/2.0   ,m2,x2+k2[1][0]/2.0,y2+k2[1][2]/2.0,z2+k2[1][4]/2.0,vx2+k2[1][1]/2.0,vy2+k2[1][3]/2.0,vz2+k2[1][5]/2.0);
  k3[0][5]=dt*this.fvz1(t+dt/2.0,m1,x1+k2[0][0]/2.0,y1+k2[0][2]/2.0,z1+k2[0][4]/2.0,vx1+k2[0][1]/2.0,vy1+k2[0][3]/2.0,vz1+k2[0][5]/2.0   ,m2,x2+k2[1][0]/2.0,y2+k2[1][2]/2.0,z2+k2[1][4]/2.0,vx2+k2[1][1]/2.0,vy2+k2[1][3]/2.0,vz2+k2[1][5]/2.0);
  k3[1][0]=dt*this.fx2( t+dt/2.0,m1,x1+k2[0][0]/2.0,y1+k2[0][2]/2.0,z1+k2[0][4]/2.0,vx1+k2[0][1]/2.0,vy1+k2[0][3]/2.0,vz1+k2[0][5]/2.0   ,m2,x2+k2[1][0]/2.0,y2+k2[1][2]/2.0,z2+k2[1][4]/2.0,vx2+k2[1][1]/2.0,vy2+k2[1][3]/2.0,vz2+k2[1][5]/2.0);
  k3[1][1]=dt*this.fvx2(t+dt/2.0,m1,x1+k2[0][0]/2.0,y1+k2[0][2]/2.0,z1+k2[0][4]/2.0,vx1+k2[0][1]/2.0,vy1+k2[0][3]/2.0,vz1+k2[0][5]/2.0   ,m2,x2+k2[1][0]/2.0,y2+k2[1][2]/2.0,z2+k2[1][4]/2.0,vx2+k2[1][1]/2.0,vy2+k2[1][3]/2.0,vz2+k2[1][5]/2.0);
  k3[1][2]=dt*this.fy2( t+dt/2.0,m1,x1+k2[0][0]/2.0,y1+k2[0][2]/2.0,z1+k2[0][4]/2.0,vx1+k2[0][1]/2.0,vy1+k2[0][3]/2.0,vz1+k2[0][5]/2.0   ,m2,x2+k2[1][0]/2.0,y2+k2[1][2]/2.0,z2+k2[1][4]/2.0,vx2+k2[1][1]/2.0,vy2+k2[1][3]/2.0,vz2+k2[1][5]/2.0);
  k3[1][3]=dt*this.fvy2(t+dt/2.0,m1,x1+k2[0][0]/2.0,y1+k2[0][2]/2.0,z1+k2[0][4]/2.0,vx1+k2[0][1]/2.0,vy1+k2[0][3]/2.0,vz1+k2[0][5]/2.0   ,m2,x2+k2[1][0]/2.0,y2+k2[1][2]/2.0,z2+k2[1][4]/2.0,vx2+k2[1][1]/2.0,vy2+k2[1][3]/2.0,vz2+k2[1][5]/2.0);
  k3[1][4]=dt*this.fz2( t+dt/2.0,m1,x1+k2[0][0]/2.0,y1+k2[0][2]/2.0,z1+k2[0][4]/2.0,vx1+k2[0][1]/2.0,vy1+k2[0][3]/2.0,vz1+k2[0][5]/2.0   ,m2,x2+k2[1][0]/2.0,y2+k2[1][2]/2.0,z2+k2[1][4]/2.0,vx2+k2[1][1]/2.0,vy2+k2[1][3]/2.0,vz2+k2[1][5]/2.0);
  k3[1][5]=dt*this.fvz2(t+dt/2.0,m1,x1+k2[0][0]/2.0,y1+k2[0][2]/2.0,z1+k2[0][4]/2.0,vx1+k2[0][1]/2.0,vy1+k2[0][3]/2.0,vz1+k2[0][5]/2.0   ,m2,x2+k2[1][0]/2.0,y2+k2[1][2]/2.0,z2+k2[1][4]/2.0,vx2+k2[1][1]/2.0,vy2+k2[1][3]/2.0,vz2+k2[1][5]/2.0);
  
  k4[0][0]=dt*this.fx1( t+dt/2.0,m1,x1+k3[0][0],y1+k3[0][2],z1+k3[0][4],vx1+k3[0][1],vy1+k3[0][3],vz1+k3[0][5]  ,m2,x2+k3[1][0],y2+k3[1][2],z2+k3[1][4],vx2+k3[1][1],vy2+k3[1][3],vz2+k3[1][5]);
  k4[0][1]=dt*this.fvx1(t+dt/2.0,m1,x1+k3[0][0],y1+k3[0][2],z1+k3[0][4],vx1+k3[0][1],vy1+k3[0][3],vz1+k3[0][5]  ,m2,x2+k3[1][0],y2+k3[1][2],z2+k3[1][4],vx2+k3[1][1],vy2+k3[1][3],vz2+k3[1][5]);
  k4[0][2]=dt*this.fy1( t+dt/2.0,m1,x1+k3[0][0],y1+k3[0][2],z1+k3[0][4],vx1+k3[0][1],vy1+k3[0][3],vz1+k3[0][5]  ,m2,x2+k3[1][0],y2+k3[1][2],z2+k3[1][4],vx2+k3[1][1],vy2+k3[1][3],vz2+k3[1][5]);
  k4[0][3]=dt*this.fvy1(t+dt/2.0,m1,x1+k3[0][0],y1+k3[0][2],z1+k3[0][4],vx1+k3[0][1],vy1+k3[0][3],vz1+k3[0][5]  ,m2,x2+k3[1][0],y2+k3[1][2],z2+k3[1][4],vx2+k3[1][1],vy2+k3[1][3],vz2+k3[1][5]);
  k4[0][4]=dt*this.fz1( t+dt/2.0,m1,x1+k3[0][0],y1+k3[0][2],z1+k3[0][4],vx1+k3[0][1],vy1+k3[0][3],vz1+k3[0][5]  ,m2,x2+k3[1][0],y2+k3[1][2],z2+k3[1][4],vx2+k3[1][1],vy2+k3[1][3],vz2+k3[1][5]);
  k4[0][5]=dt*this.fvz1(t+dt/2.0,m1,x1+k3[0][0],y1+k3[0][2],z1+k3[0][4],vx1+k3[0][1],vy1+k3[0][3],vz1+k3[0][5]  ,m2,x2+k3[1][0],y2+k3[1][2],z2+k3[1][4],vx2+k3[1][1],vy2+k3[1][3],vz2+k3[1][5]);
  k4[1][0]=dt*this.fx2( t+dt/2.0,m1,x1+k3[0][0],y1+k3[0][2],z1+k3[0][4],vx1+k3[0][1],vy1+k3[0][3],vz1+k3[0][5]  ,m2,x2+k3[1][0],y2+k3[1][2],z2+k3[1][4],vx2+k3[1][1],vy2+k3[1][3],vz2+k3[1][5]);
  k4[1][1]=dt*this.fvx2(t+dt/2.0,m1,x1+k3[0][0],y1+k3[0][2],z1+k3[0][4],vx1+k3[0][1],vy1+k3[0][3],vz1+k3[0][5]  ,m2,x2+k3[1][0],y2+k3[1][2],z2+k3[1][4],vx2+k3[1][1],vy2+k3[1][3],vz2+k3[1][5]);
  k4[1][2]=dt*this.fy2( t+dt/2.0,m1,x1+k3[0][0],y1+k3[0][2],z1+k3[0][4],vx1+k3[0][1],vy1+k3[0][3],vz1+k3[0][5]  ,m2,x2+k3[1][0],y2+k3[1][2],z2+k3[1][4],vx2+k3[1][1],vy2+k3[1][3],vz2+k3[1][5]);
  k4[1][3]=dt*this.fvy2(t+dt/2.0,m1,x1+k3[0][0],y1+k3[0][2],z1+k3[0][4],vx1+k3[0][1],vy1+k3[0][3],vz1+k3[0][5]  ,m2,x2+k3[1][0],y2+k3[1][2],z2+k3[1][4],vx2+k3[1][1],vy2+k3[1][3],vz2+k3[1][5]);
  k4[1][4]=dt*this.fz2( t+dt/2.0,m1,x1+k3[0][0],y1+k3[0][2],z1+k3[0][4],vx1+k3[0][1],vy1+k3[0][3],vz1+k3[0][5]  ,m2,x2+k3[1][0],y2+k3[1][2],z2+k3[1][4],vx2+k3[1][1],vy2+k3[1][3],vz2+k3[1][5]);
  k4[1][5]=dt*this.fvz2(t+dt/2.0,m1,x1+k3[0][0],y1+k3[0][2],z1+k3[0][4],vx1+k3[0][1],vy1+k3[0][3],vz1+k3[0][5]  ,m2,x2+k3[1][0],y2+k3[1][2],z2+k3[1][4],vx2+k3[1][1],vy2+k3[1][3],vz2+k3[1][5]);
  
  this.ball1.x  += (k1[0][0]+2.0*k2[0][0]+2.0*k3[0][0]+k4[0][0])/6.0;
  this.ball1.vx += (k1[0][1]+2.0*k2[0][1]+2.0*k3[0][1]+k4[0][1])/6.0;
  this.ball1.y  += (k1[0][2]+2.0*k2[0][2]+2.0*k3[0][2]+k4[0][2])/6.0;
  this.ball1.vy += (k1[0][3]+2.0*k2[0][3]+2.0*k3[0][3]+k4[0][3])/6.0;
  this.ball1.z  += (k1[0][4]+2.0*k2[0][4]+2.0*k3[0][4]+k4[0][4])/6.0;
  this.ball1.vz += (k1[0][5]+2.0*k2[0][5]+2.0*k3[0][5]+k4[0][5])/6.0;
  this.ball2.x  += (k1[1][0]+2.0*k2[1][0]+2.0*k3[1][0]+k4[1][0])/6.0;
  this.ball2.vx += (k1[1][1]+2.0*k2[1][1]+2.0*k3[1][1]+k4[1][1])/6.0;
  this.ball2.y  += (k1[1][2]+2.0*k2[1][2]+2.0*k3[1][2]+k4[1][2])/6.0;
  this.ball2.vy += (k1[1][3]+2.0*k2[1][3]+2.0*k3[1][3]+k4[1][3])/6.0;
  this.ball2.z  += (k1[1][4]+2.0*k2[1][4]+2.0*k3[1][4]+k4[1][4])/6.0;
  this.ball2.vz += (k1[1][5]+2.0*k2[1][5]+2.0*k3[1][5]+k4[1][5])/6.0;
};

var pendulum = new Pendulum(0, 0, 100, 1, 0, 60, 100, 0, 0, 0, 1, 0, 120, 100, 0, 0, 0);

var scene = new THREE.Scene();
var width = document.getElementById('canvas-frame').clientWidth;
var height = document.getElementById('canvas-frame').clientHeight;
var camera;
var directionalLight;
var ambientLight;
var renderer;
var floor;

function initCamera(){
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(300,0,100);
  camera.up.set(0,0,1);
  camera.lookAt({x:0, y:0, z:50});
}

function initRender(){
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(width, height);
  renderer.setClearColor(0xf0f8ff);
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

  var axis = new THREE.AxisHelper(400, 400, 400);
  scene.add(axis);

  floor = new THREE.Mesh(
      new THREE.PlaneGeometry(400, 400),
      new THREE.MeshLambertMaterial(fe)
    );
  scene.add(floor);
  floor.position.set(0, 0, -20);

  pendulum.poll.object = new THREE.Mesh(
    new THREE.CubeGeometry(5, 5, 5),
    new THREE.MeshLambertMaterial(fe)
  );
  pendulum.poll.object.position.set(pendulum.poll.x, pendulum.poll.y, pendulum.poll.z);
  scene.add(pendulum.poll.object);

  pendulum.ball1.object = new THREE.Mesh(
      new THREE.SphereGeometry(5, 5, 5),
      new THREE.MeshLambertMaterial(au)
    );
  scene.add(pendulum.ball1.object);

  pendulum.ball2.object = new THREE.Mesh(
      new THREE.SphereGeometry(5, 5, 5),
      new THREE.MeshLambertMaterial(au)
    );
  scene.add(pendulum.ball2.object);
}

function loop() {
  for(var i=1; i<=skip; i++ ){
    pendulum.RungeKutta4();
  }

  t += dt * skip;
  pendulum.ball1.object.position.set(pendulum.ball1.x, pendulum.ball1.y, pendulum.ball1.z);
  pendulum.ball2.object.position.set(pendulum.ball2.x, pendulum.ball2.y, pendulum.ball2.z); 
     
  var geometry = new THREE.Geometry(); 
  var material = new THREE.LineBasicMaterial({color: 0x000000});
  geometry.vertices.push(
      new THREE.Vector3(pendulum.poll.x, pendulum.poll.y, pendulum.poll.z),
      new THREE.Vector3(pendulum.ball1.x,pendulum.ball1.y,pendulum.ball1.z),
      new THREE.Vector3(pendulum.ball2.x,pendulum.ball2.y,pendulum.ball2.z)
    );
  var line = new THREE.Line(geometry, material);
  scene.add(line);
    
  renderer.clear();
  renderer.render(scene, camera);
  scene.remove( line );   
  window.requestAnimationFrame(loop);
}

  
function main(){
  console.log(test);
  initRender();
  initCamera();
  initLight();
  initObjects();
  loop();
}