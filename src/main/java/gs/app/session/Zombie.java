package gs.app.session;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

public class Zombie {
    Double x;
    Double y;
    Integer height = 10;
    Integer width = 10;
    Integer speed = 5;
    Double coeff;// = .05;
    Boolean isChasing = false;

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

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Integer getWidth() {
        return width;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    public Integer getSpeed() {
        return speed;
    }

    public void setSpeed(Integer speed) {
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


    public void follow(PlayerSession player){
        Double deltax = player.getX() - this.x;
        Double deltay = player.getY() - this.y;

        this.x = this.x + (this.coeff*deltax);
        this.y = this.y + (this.coeff*deltay);
    }

    public static void setChase(List<Zombie> zombies, List<PlayerSession> players){
        for(Zombie zombie : zombies){
            /*if(!zombie.isChasing() && player != null){
                zombie.follow(player);
                zombie.isChasing(true);
            }*/
            PlayerSession player = findNearest(zombie,players);
        }
    }

    public static PlayerSession findNearest(Zombie zombie, List<PlayerSession> players){
        HashMap<Double,Object> distances = new HashMap<>();
        for(PlayerSession player : players){
            Double deltax = player.getX() - zombie.getX();
            Double deltay = player.getY() - zombie.getY();
            Double distance = Math.sqrt((deltax*deltax)+(deltay*deltay));
            distances.put(distance,player);
        }
    }
}
