var ctx;
var parent;
var canvas;
var player;
var image;
var mouse = {
    x: null,
    y: null
}
var Key = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    W:87,
    S: 83,
    A:65,
    D : 68,

    STATE:[]
};

function Player(id) {
    this.id = id;
    this.x = 512;
    this.y = 512;
    this.s = 2;
}

Player.prototype.setX = function (x) {
    this.x = x;
}

Player.prototype.setY = function (y) {
    this.y = y;
}

Player.prototype.getId = function () {
    return this.id;
}

Player.prototype.draw = function () {
    ctx.clearRect(0, 0, canvas.height, canvas.width);
    ctx.save();                          // save original transformation
    ctx.translate(this.x, this.y);        // move origin to x y

    // get xy in relation to origin, calc arc tangent, then flip
    ctx.rotate(Math.atan2(this.y - mouse.y, this.x - mouse.x) - Math.PI / 2);

    // since origin is x y, to center the image, i have to move the image half its height upward and half its height left
    ctx.drawImage(image, -((image.width / 2 * .25)), -(image.height / 2 * .25), image.width * .25, image.height * .25);
    ctx.restore();                       // restore transformation
};

Player.prototype.moveUp = function () {
    this.y -=this.s;
}

Player.prototype.moveDown = function () {
    this.y +=this.s;
}

Player.prototype.moveLeft = function () {
    this.x -=this.s;
}

Player.prototype.moveRight = function () {
    this.x +=this.s;
}

Player.prototype.shift = function(){
    ctx.clearRect(0, 0, canvas.height, canvas.width);
    //ctx.translate(this.x, this.y);
    ctx.drawImage(image,-((image.width / 2 * .25)),-((image.height / 2 * .25)),image.width * .25, image.height * .25);
}

function kps(e){
    Key.STATE[e.keyCode] = true;
    e.preventDefault();
};

function krs(e){
    Key.STATE[e.keyCode] = false;
    e.preventDefault();
}
function init() {
    parent = document.getElementById("main");
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 1024;
    parent.appendChild(canvas);
    image = new Image();
    image.src = "/images/bender.jpg";

    player = new Player('grant');


    $("canvas").mousemove(function (event) {
        mouse.x = event.pageX;
        mouse.y = event.pageY;
        player.draw();
    });

   document.addEventListener('keydown',kps,false);
   document.addEventListener('keyup',krs,false);

}

function move(){
    if(Key.STATE[Key.UP]||Key.STATE[Key.W]){
        player.moveUp();
    }

    if(Key.STATE[Key.DOWN]||Key.STATE[Key.S]){
        player.moveDown();
    }

    if(Key.STATE[Key.LEFT]||Key.STATE[Key.A]){
        player.moveLeft();
    }
    if(Key.STATE[Key.RIGHT]||Key.STATE[Key.D]){
        player.moveRight();
    }
    player.draw();
}

$(function () {
  /*  init();
   setInterval(function(){
       player.draw();
   },1000/80);)*/
  init();
  setInterval(function(){
      move();
  },1000/80)
});

