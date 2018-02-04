function Chaser(id,speed,coeffz) {
    BaseCharacter.call(this,id,512,512,20,20,speed,10,"/images/Zombie.png");
    this.coeffz = coeffz;
}
Chaser.prototype.draw = function (px,py) {
    //ctx.clearRect(0, 0, canvas.height, canvas.width);
    ctx.save();                          // save original transformation
    ctx.translate(this.x, this.y);        // move origin to x y

    // get xy in relation to origin, calc arc tangent, then flip
    ctx.rotate(Math.atan2(this.y - py, this.x - px) - Math.PI / 2);

    // since origin is x y, to center the image, i have to move the image half its height upward and half its height left
    ctx.drawImage(this.image, -((this.image.width / 2 * .5)), -(this.image.height / 2 * .5), this.image.width * .5, this.image.height * .5);
    ctx.restore();                       // restore transformation
};

Chaser.prototype.follow = function(px,py){
    var deltax = px - this.x;
    var deltay = py - this.y;

    this.x = this.x + (this.coeffz*deltax);
    this.y = this.y + (this.coeffz*deltay);
};

Chaser.prototype.getPoint = function(){
    return new Point(this.x,this.y,this.h,this.w);
};


Player.prototype.damage = function(){
    this.l-=1;
}

//Chaser.prototype = Object.create(BaseCharacter.prototype);