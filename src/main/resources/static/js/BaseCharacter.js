function Point(x,y,h,w){
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
}
function BaseCharacter(id,x,y,h,w,s,l,src){
    this.id = id;
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.s = s;
    this.l = l;
    this.image = new Image();
    this.image.src=src;
}

/*BaseCharacter.prototype.getPoint = function(){
    return new Point(this.x,this.y.,this.h,this.w);
};*/