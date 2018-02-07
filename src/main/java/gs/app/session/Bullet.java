package gs.app.session;


public class Bullet{
    Double fx;
    Double fy;
    Double tx;
    Double ty;
    Double ttl = 100.0;
    Double rate = 10.0;

    public Bullet(Double fx,Double fy,Double tx,Double ty){
        this.fx = fx;
        this.fy = fy;
        this.tx = tx;
        this.ty = ty;
    }

    public void shift(){
        Double deltax = this.tx - this.fx;
        Double deltay = this.ty - this.fy;

        Double distance = Math.sqrt((deltax*deltax)+(deltay*deltay));

        this.fx +=(deltax/distance * this.rate);//this.fPoint.x + (this.rate*deltax);
        this.fy +=(deltay/distance * this.rate);//this.fPoint.y + (this.rate*deltay);
    }

    public Double getTtl(){
        return this.ttl;
    }

    public void setTtl(Double ttl){
        this.ttl = ttl;
    }

    public Double getFx() {
        return fx;
    }

    public void setFx(Double fx) {
        this.fx = fx;
    }

    public Double getFy() {
        return fy;
    }

    public void setFy(Double fy) {
        this.fy = fy;
    }

    public Double getTx() {
        return tx;
    }

    public void setTx(Double tx) {
        this.tx = tx;
    }

    public Double getTy() {
        return ty;
    }

    public void setTy(Double ty) {
        this.ty = ty;
    }
}