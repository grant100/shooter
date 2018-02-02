var ctx;
var parent;
var canvas;
var player;
var image;
function Player(id){
    this.id = id;
    this.x = 512;
    this.y = 512;
    this.img_x = null;
    this.img_y = null;
    this.delta = .8;

}

Player.prototype.setX = function(x){
    this.x = x;
}

Player.prototype.setY = function(y){
    this.y = y;
}

Player.prototype.getId = function(){
    return this.id;
}

Player.prototype.rotate = function(){
    ctx.clearRect(0,0,canvas.height,canvas.width);
    ctx.save();                          // save original transformation
    ctx.translate(this.x,this.y);        // move origin to x y
    ctx.rotate((Math.PI/2) *this.delta); // rotate about x y

    // since origin is x y, to center the image, i have to move the image half its height upward and half its height left
    ctx.drawImage(image,-((image.width/2 *.25)),-(image.height/2 *.25),image.width*.25,image.height*.25);
    ctx.restore();                       // restore transformation
}

Player.prototype.shift = function(){
    ctx.clearRect(0,0,canvas.height,canvas.width);
    ctx.drawImage(image,this.x,this.y,image.width*.25,image.height*.25); // translate back to origin
}

Player.prototype.clear = function(){
    ctx.clearRect(0,0,canvas.height,canvas.width);
}
Player.prototype.fill = function(){
    ctx.fillStyle="red";
    ctx.fillRect(0,0,canvas.height,canvas.width);
}
$(function () {
    parent = document.getElementById("main");
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 1024;
    parent.appendChild(canvas);
    image = new Image();
    image.src = "/images/bender.jpg";

    player = new Player('grant');
    //player.draw();
    /*setTimeout(player.rotate(), 1000);
    ctx.clearRect(0,0,canvas.height,canvas.width);
    setTimeout(player.rotate(), 1000);
    ctx.clearRect(0,0,canvas.height,canvas.width);
    setTimeout(player.rotate(), 1000);
    ctx.clearRect(0,0,canvas.height,canvas.width);
    setTimeout(player.rotate(), 1000);
    ctx.clearRect(0,0,canvas.height,canvas.width);
    setTimeout(player.rotate(), 1000);*/
    //bender = new Image();
    //bender.src = "/images/bender.jpg";
});