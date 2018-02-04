
function Player(id) {
    BaseCharacter.call(this,id,512,512,20,20,8,100,RIFLE.IDLE[0]);
    this.weapon = new Weapon(.5,1);
}
Player.prototype.draw = function () {
    //ctx.clearRect(0, 0, canvas.height, canvas.width);
    ctx.save();                          // save original transformation
    ctx.translate(this.x, this.y);        // move origin to x y

    // get xy in relation to origin, calc arc tangent, then flip
    ctx.rotate(Math.atan2(this.y - mouse.y, this.x - mouse.x) - Math.PI / 2);

    // since origin is x y, to center the image, i have to move the image half its height upward and half its height left
    ctx.drawImage(this.image, -((this.image.width / 2 * .5)), -(this.image.height / 2 * .5), this.image.width * .5, this.image.height * .5);
    ctx.restore();                       // restore transformation
};

Player.prototype.moveUp = function () {
    this.y -=this.s;
};

Player.prototype.moveDown = function () {
    this.y +=this.s;
};

Player.prototype.moveLeft = function () {
    this.x -=this.s;
};

Player.prototype.moveRight = function () {
    this.x +=this.s;
};

Player.prototype.getPoint = function(){
    return new Point(this.x,this.y,this.h,this.w);
};

Player.prototype.fire = function(){
    return weapon.fire(new Point(this.x,this.y,this.h,this.w),new Point(mouse.x,mouse.y,this.h,this.w));
}

Player.prototype.damage = function(){
    this.l-=1;
};

Player.prototype._d_laser = function(){
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(mouse.x,mouse.y);
    ctx.strokeStyle="red";
    ctx.stroke();
};

//Player.prototype = Object.create(BaseCharacter.prototype);
