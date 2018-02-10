function Player(id) {
    this.rifle = new Rifle();
}

Player.prototype._d_draw = function (px,py,mx,my,wpn) {
    wpn.img.src = wpn.src;

    ctx.save();                   // save original transformation
    ctx.translate(px, py);        // move origin to x y

    // get xy in relation to origin, calc arc tangent, then flip
    ctx.rotate(Math.atan2(py - my, px - mx) - Math.PI / 2);

    // since origin is x y, to center the image, i have to move the image half its height upward and half its height left
    ctx.drawImage(wpn.img, wpn.x[wpn.frame],wpn.y,wpn.w,wpn.h,-((wpn.w / 2 * .5)), -(wpn.h / 2 * .5), wpn.w * .5, wpn.h * .5);
    ctx.restore();                       // restore transformation

};
Player.prototype.moveUp = function (s) {
    this.y -= s;
};

Player.prototype.moveDown = function (s) {
    this.y += s;
};

Player.prototype.moveLeft = function (s) {
    this.x -= s;
};

Player.prototype.moveRight = function (s) {
    this.x += s;
};


Player.prototype._d_laser = function (px,py,mx,my) {
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(mx, my);
    ctx.strokeStyle = "red";
    ctx.stroke();
};
Player.prototype._a_idle = function (px,py,mx,my) {
    this.rifle.idle.setAnimationFrame();
    this._d_draw(px,py,mx,my,this.rifle.idle);
};
Player.prototype._a_mele = function (px,py,mx,my)  {
    this.rifle.melee.setAnimationFrame();
    this._d_draw(px,py,mx,my,this.rifle.melee);
};
Player.prototype._a_recl = function (px,py,mx,my)  {
    this.rifle.recoil.setAnimationFrame();
    this._a_bult(px,py,mx,my);
    this._d_draw(px,py,mx,my,this.rifle.recoil);
};

Player.prototype._a_bult = function (px,py,mx,my) {
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(mx, my);
    ctx.strokeStyle = 'green';
    ctx.stroke();
};
//Player.prototype = Object.create(BaseCharacter.prototype);
