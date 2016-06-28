PHYSICS.PhysLab = function(paramater){
  paramater = paramater||();
  this.frameID = null;
  this.playButtonID = null;
  this.pictureID =  null;
  this.g = 9.8;
  this.dt = 0.001;
  this.step = 0;
  this.skipRendering = 40;
  this.displayFPS = true;
  this.draggable = false;
  this.allowdrug = false;
  this.locusFlag = true;
  this.velocityVectorFlag = "pause";
  this.boundingBoxFlag = "dragg";

  this.renderer = {
    clearColor : 0xFFFFFF,
    clearAlpha : 1.0,
    paramaters : {
      antialias : true,
      stencil : true,
    }
  }

  this.camera = {
    type : "Perspective",
    position : {x:15, y:0, z:15},
    up : {x:0, y:0, z:1},
    target : {x:0, y:0, z:0},
    fov : 45,
    near : 0.1,
    far : 500,
    left : -10,
    right : 10,
    top : 10,
    bottom : -10,
  };

  this.light = {
    type : "Directional",
    position: {x:0, y:0, z:10},
    target: {x:0, y:0, z:0},
    color: 0xFFFFFF,
    intensity: 1.0,
    distance: 0,
    angle: Math.PI / 4,
    exponent:  20,
    ambient: null
  };

  this.shadow = {
    shadowMapEnabled: false,
    shadowMapWidth: 512,
    shadowMapHeight:  512,
    shadowCameraVisible: false,
    shadowCameraNear: 0.1,
    shadowCameraFar: 50,
    shadowCameraFov: 120,
    shadowCameraRight: 10,
    shadowCameraLeft: -10,
    shadowCameraTop: 10,
    shadowCameraBottom: -10,
    shadowDarkNess: 0.5
  };

  this.trackball = {
    enabled: false,
    noRotate: false,
    rotateSpeed: 2.0,
    noZoom: false,
    zoomSpeed: 1.0,
    noPan: false,
    panSpeed: 1.0,
    staticMobing: true,
    dymamicDampingFactor: 0.3,
  }

  this.objects = [];
  this.initFlag = true;
  this.pauseFlag = true;
  this.resetFlag = false;
  this.makePictureDrag = true;

  this.draggableObjects = [];
  this.stats = ;
}