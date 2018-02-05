function Bullet(fPoint,tPoint,rate){
    this.fPoint = fPoint;
    this.tPoint = tPoint;
    this.rate = rate;
}
Bullet.prototype.getFPoint = function(){
    return this.fPoint;
};

Bullet.prototype.getTPoint = function () {
    return this.tPoint;
};
Bullet.prototype._b_draw = function(){

    // normalize vector

    var deltax = this.tPoint.x - this.fPoint.x;
    var deltay = this.tPoint.y - this.fPoint.y;

    var distance = Math.sqrt((deltax*deltax)+(deltay*deltay));

    this.fPoint.x +=deltax/distance * this.rate;//this.fPoint.x + (this.rate*deltax);
    this.fPoint.y +=deltay/distance * this.rate;//this.fPoint.y + (this.rate*deltay);
    ctx.fillStyle="yellow";
    ctx.fillRect(this.fPoint.x, this.fPoint.y, 5, 5);
};

function Weapon(rate,damage){
    this.rate = rate;
    this.damage = damage;
}

Weapon.prototype.fire = function(fPoint,tPoint){
    bullet.push(new Bullet(fPoint,tPoint,this.rate));
};
