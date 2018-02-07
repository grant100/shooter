function Player(id) {
    this.image = new Image();
    this.image.src = RIFLE.IDLE.FRAME[0]
}

Player.prototype._d_draw = function (px,py,mx,my) {
    buffer.save();                          // save original transformation
    buffer.translate(px, py);        // move origin to x y

    // get xy in relation to origin, calc arc tangent, then flip
    buffer.rotate(Math.atan2(py - my, px - mx) - Math.PI / 2);

    // since origin is x y, to center the image, i have to move the image half its height upward and half its height left
    buffer.drawImage(this.image, -((this.image.width / 2 * .5)), -(this.image.height / 2 * .5), this.image.width * .5, this.image.height * .5);
    buffer.restore();                       // restore transformation

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
    buffer.beginPath();
    buffer.moveTo(px, py);
    buffer.lineTo(mx, my);
    buffer.strokeStyle = "red";
    buffer.stroke();
};
Player.prototype._a_idle = function (px,py,mx,my) {
    RIFLE.IDLE.tickCount += 1;
    if (RIFLE.IDLE.tickCount > RIFLE.IDLE.ticksPerFrame) {
        RIFLE.IDLE.tickCount = 0;
        RIFLE.IDLE.frameCount += 1;
        if (RIFLE.IDLE.frameCount > 18) {
            RIFLE.IDLE.frameCount = 0;
        }
    }
    this.image.src = RIFLE.IDLE.FRAME[RIFLE.IDLE.frameCount];
    this._d_draw(px,py,mx,my);
};
Player.prototype._a_mele = function (px,py,mx,my)  {
    RIFLE.MELE.tickCount += 1;
    if (RIFLE.MELE.tickCount > RIFLE.MELE.ticksPerFrame) {
        RIFLE.MELE.tickCount = 0;
        RIFLE.MELE.frameCount += 1;
        if (RIFLE.MELE.frameCount > 14) {
            RIFLE.MELE.frameCount = 0;
        }
    }
    this.image.src = RIFLE.MELE.FRAME[RIFLE.MELE.frameCount];
    this._d_draw(px,py,mx,my);
};
Player.prototype._a_recl = function (px,py,mx,my)  {

    RIFLE.FIRE.tickCount += 1;
    if (RIFLE.FIRE.tickCount > RIFLE.FIRE.ticksPerFrame) {
        RIFLE.FIRE.tickCount = 0;
        RIFLE.FIRE.frameCount += 1;
        if (RIFLE.FIRE.frameCount > 2) {
            RIFLE.FIRE.frameCount = 0;
        }
    }
    this.image.src = RIFLE.FIRE.FRAME[RIFLE.FIRE.frameCount];
    this._a_bult(px,py,mx,my);
    this._d_draw(px,py,mx,my);

};

Player.prototype._a_bult = function (px,py,mx,my) {
    RIFLE.FIRE.tickColorCount+=1;
    if(RIFLE.FIRE.tickColorCount>RIFLE.FIRE.ticksColorPerFrame){
        RIFLE.FIRE.tickColorCount=0;
        RIFLE.FIRE.flipColor();
    }
    buffer.beginPath();
    buffer.moveTo(px.x, py.y);
    buffer.lineTo(mx, my);
    buffer.strokeStyle = RIFLE.FIRE.color;
    buffer.stroke();
};
//Player.prototype = Object.create(BaseCharacter.prototype);
