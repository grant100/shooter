function Bullet(){
}
Bullet.prototype._b_draw = function(x,y,h,w){
    ctx.fillStyle="yellow";
    ctx.fillRect(x,y,h,w);
};
