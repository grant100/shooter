package gs.app.session;

import java.util.*;

public class Zombie {
    Double x;
    Double y;
    Double height = 10.0;
    Double width = 10.0;
    Double speed = 5.0;
    Double coeff;// = .05;
    Boolean isChasing = false;
    PlayerSession target;

    public Zombie(Double x, Double y){
        this.x = x;
        this.y = y;
        this.coeff = Math.random() * .05;
    }

    public Double getX() {
        return x;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getWidth() {
        return width;
    }

    public void setWidth(Double width) {
        this.width = width;
    }

    public Double getSpeed() {
        return speed;
    }

    public void setSpeed(Double speed) {
        this.speed = speed;
    }

    public Double getCoeff(){
        return this.coeff;
    }

    public Boolean isChasing(){
        return this.isChasing;
    }

    public void isChasing(Boolean isChasing){
        this.isChasing =isChasing;
    }
    public void setTarget(PlayerSession target){
        this.target = target;
    }


    public Double getTargetX(){
        return this.target.getX();
    }

    public Double getTargetY(){
        return this.target.getY();
    }
    public void follow(){
        Double deltax = this.target.getX() - this.x;
        Double deltay = this.target.getY() - this.y;

        this.x = this.x + (this.coeff*deltax);
        this.y = this.y + (this.coeff*deltay);
    }

    public static void setChase(List<Zombie> zombies, List<PlayerSession> players){
        for(Zombie zombie : zombies){
            if(!zombie.isChasing()){
                PlayerSession player = findNearest(zombie,players);
                zombie.setTarget(player);
                zombie.follow();
                zombie.isChasing(true);
            }else{
                zombie.follow();
            }
        }
    }

    public static PlayerSession findNearest(Zombie zombie, List<PlayerSession> players){
        TreeMap<Double,PlayerSession> distances = new TreeMap<>();
        for(PlayerSession player : players){
            Double deltax = player.getX() - zombie.getX();
            Double deltay = player.getY() - zombie.getY();
            Double distance = Math.sqrt((deltax*deltax)+(deltay*deltay));
            distances.put(distance,player);
        }

        return distances.firstEntry().getValue();
    }
}
