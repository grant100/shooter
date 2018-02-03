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
}
Bullet.prototype.move = function(){
    var deltax = tPoint.x - fPoint.x;
    var deltay = tPoint.y - fPoint.y;
    this.fPoint.x = fPoint.x + (this.coeffz*deltax);
    this.fPoint.y = fPoint.y + (this.coeffz*deltay);
};

function Weapon(rate,damage){
    this.rate = rate;
    this.damage = damage;
}

Weapon.prototype.fire = function(fPoint,tPoint){
    return new Bullet(fPoint,tPoint);
}
