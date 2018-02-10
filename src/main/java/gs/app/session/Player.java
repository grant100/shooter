package gs.app.session;

import gs.app.messages.Input;

import java.util.ArrayList;
import java.util.List;

public class Player {
    Double x = 1024.0;
    Double y = 1024.0;
    Double height = 10.0;
    Double width = 10.0;
    Double mouseX;
    Double mouseY;
    Double clickX;
    Double clickY;
    Boolean melee;
    Boolean click;
    Boolean collision;
    Double speed = 5.0;
    String id;


    volatile List<Bullet> bullets = new ArrayList<>();



    private Input input;
    public Player(String id) {
        this.id = id;
    }

    public Double getSpeed(){
        return this.speed;
    }
    public String getId() {
        return this.id;
    }

    private Input getInput() {
        return this.input;
    }

    public Double getX(){
        return this.x;
    }

    public Double getY() {
        return this.y;
    }

    public Double getMouseY() {
        return mouseY;
    }

    public Double getMouseX() {
        return mouseX;
    }

    public Double getClickY() {
        return clickY;
    }

    public Double getClickX() {
        return clickX;
    }

    public Boolean getMelee() {
        return melee;
    }

    public Boolean getClick(){
        return this.click;
    }

    public Boolean getCollision(){
        return this.collision;
    }

    public void setInput(Input input) {
        this.input = input;
    }

    public void setCollision(Boolean collision){
        this.collision = collision;
    }


    public List<Bullet> getBullets() {
        return bullets;
    }

    public void setBullets(List<Bullet> bullets) {
        this.bullets = bullets;
    }

    synchronized public void  process() {
        this.mouseX = input.getMouseX();
        this.mouseY = input.getMouseY();
        this.melee = input.getMelee();
        this.click = input.getClick();
        if(input.getClick()){
            bullets.add(new Bullet(this.x,this.y,this.mouseX,this.mouseY));
        }

        if (input.getClick()) {
            this.clickX = input.getClickX();
            this.clickY = input.getClickY();
        }

        if(input.getUp()){
            this.y-=speed;
        }

        if(input.getDown()){
            this.y+=speed;
        }

        if(input.getLeft()){
            this.x-=speed;
        }

        if(input.getRight()){
            this.x+=speed;
        }

        // this may have an issue... ?
        this.bullets.removeIf(obj->obj.getTtl()<1);

        for(Bullet bullet : this.bullets){
            bullet.setTtl(bullet.getTtl()-1);
            bullet.shift();
        }

    }
}

