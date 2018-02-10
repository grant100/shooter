function Player() {
    this.rifle = new Rifle();
}

Player.prototype._d_draw = function (px,py,mx,my,obj) {
    // extra layer jic
    _d_draw(px,py,mx,my,obj);
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
    this.rifle.setLaser(px,py,mx,my);
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
    this._d_draw(px,py,mx,my,this.rifle.recoil);
};

Player.prototype._b_draw =  function(x,y,h,w){
    this.rifle._b_draw(x,y,h,w);
};

/** Zombie **/

function Zombie(){
    // animations
    this.idle ={
        img : new Image(),
        src : "/images/Zombie.png",
        y : 10,
        x : [10], // [] to be consistent with _draw api
        w : 294,
        h : 318,
        frame:0,
        scale:.5
    };
}

Zombie.prototype._d_draw =function (px,py,mx,my) {
    _d_draw(px,py,mx,my,this.idle);
};

/** Draw **/

function _d_draw(px,py,mx,my,obj){
    obj.img.src = obj.src;

    ctx.save();                   // save original transformation
    ctx.translate(px, py);        // move origin to x y

    // get xy in relation to origin, calc arc tangent, then flip
    ctx.rotate(Math.atan2(py - my, px - mx) - Math.PI / 2);

    // since origin is x y, to center the image, i have to move the image half its height upward and half its height left
    ctx.drawImage(obj.img, obj.x[obj.frame],obj.y,obj.w,obj.h,-((obj.w / 2 * .5)), -(obj.h / 2 * .5), obj.w * .5, obj.h * .5);
    ctx.restore();                       // restore transformation
}
