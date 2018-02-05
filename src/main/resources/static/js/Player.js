function Player(id) {
    BaseCharacter.call(this, id, 512, 512, 20, 20, 8, 100, RIFLE.IDLE[0]);
    this.weapon = new Weapon(30, 1);
}

Player.prototype._d_draw = function () {
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
    this.y -= this.s;
};

Player.prototype.moveDown = function () {
    this.y += this.s;
};

Player.prototype.moveLeft = function () {
    this.x -= this.s;
};

Player.prototype.moveRight = function () {
    this.x += this.s;
};

Player.prototype.getPoint = function () {
    return new Point(this.x, this.y, this.h, this.w);
};

Player.prototype.fire = function () {
    this.weapon.fire(this.getPoint(), new Point(mouse.x, mouse.y, this.h, this.w),this.weapon.rate);
}

Player.prototype.damage = function () {
    this.l -= 1;
};

Player.prototype._d_laser = function () {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.strokeStyle = "red";
    ctx.stroke();
};
Player.prototype._a_idle = function () {
    RIFLE.IDLE.tickCount += 1;
    if (RIFLE.IDLE.tickCount > RIFLE.IDLE.ticksPerFrame) {
        RIFLE.IDLE.tickCount = 0;
        RIFLE.IDLE.frameCount += 1;
        if (RIFLE.IDLE.frameCount > 18) {
            RIFLE.IDLE.frameCount = 0;
        }
    }
    this.image.src = RIFLE.IDLE.FRAME[RIFLE.IDLE.frameCount];
    this._d_draw();
};
Player.prototype._a_mele = function () {
    RIFLE.MELE.tickCount += 1;
    if (RIFLE.MELE.tickCount > RIFLE.MELE.ticksPerFrame) {
        RIFLE.MELE.tickCount = 0;
        RIFLE.MELE.frameCount += 1;
        if (RIFLE.MELE.frameCount > 14) {
            RIFLE.MELE.frameCount = 0;
        }
    }
    this.image.src = RIFLE.MELE.FRAME[RIFLE.MELE.frameCount];
    this._d_draw();
};
Player.prototype._a_recl = function () {

    RIFLE.FIRE.tickCount += 1;
    if (RIFLE.FIRE.tickCount > RIFLE.FIRE.ticksPerFrame) {
        RIFLE.FIRE.tickCount = 0;
        RIFLE.FIRE.frameCount += 1;
        if (RIFLE.FIRE.frameCount > 2) {
            RIFLE.FIRE.frameCount = 0;
        }
    }
    this.image.src = RIFLE.FIRE.FRAME[RIFLE.FIRE.frameCount];
    this._a_bult();
    this._d_draw();

};

Player.prototype._a_bult = function () {
    RIFLE.FIRE.tickColorCount+=1;
    if(RIFLE.FIRE.tickColorCount>RIFLE.FIRE.ticksColorPerFrame){
        RIFLE.FIRE.tickColorCount=0;
        RIFLE.FIRE.flipColor();
    }
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.strokeStyle = RIFLE.FIRE.color;
    ctx.stroke();
};
//Player.prototype = Object.create(BaseCharacter.prototype);
