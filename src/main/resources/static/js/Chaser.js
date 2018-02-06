function Chaser() {
    this.image = new Image();
    this.image.src="/images/Zombie.png"
}
Chaser.prototype.draw = function (zx,zy,px,py) {
    //ctx.clearRect(0, 0, canvas.height, canvas.width);
    ctx.save();                          // save original transformation
    ctx.translate(zx, zy);        // move origin to x y

    // get xy in relation to origin, calc arc tangent, then flip
    ctx.rotate(Math.atan2(zy - py, zx - px) - Math.PI / 2);

    // since origin is x y, to center the image, i have to move the image half its height upward and half its height left
    ctx.drawImage(this.image, -((this.image.width / 2 * .5)), -(this.image.height / 2 * .5), this.image.width * .5, this.image.height * .5);
    ctx.restore();                       // restore transformation
};

Chaser.prototype.follow = function(zx,zy,px,py,coeff){
    var deltax = px - zx;
    var deltay = py - zy;

    zx = zx + (coeff*deltax);
    zy = zy + (coeff*deltay);
};

