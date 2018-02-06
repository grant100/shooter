package gs.app.session;

import gs.app.messages.Input;

public class PlayerSession {
    Integer x = 1024 / 2;
    Integer y = 1024 / 2;
    Integer height = 10;
    Integer width = 10;
    Integer mouseX;
    Integer mouseY;
    Integer clickX;
    Integer clickY;
    Boolean melee;
    Boolean click;
    Boolean collision;
    Integer speed = 5;
    String id;


    private Input input;
    public PlayerSession(String id) {
        this.id = id;
    }

    public Integer getSpeed(){
        return this.speed;
    }
    public String getId() {
        return this.id;
    }

    private Input getInput() {
        return this.input;
    }

    public Integer getX(){
        return this.x;
    }

    public Integer getY() {
        return this.y;
    }

    public Integer getMouseY() {
        return mouseY;
    }

    public Integer getMouseX() {
        return mouseX;
    }

    public Integer getClickY() {
        return clickY;
    }

    public Integer getClickX() {
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

    public void process() {
        this.mouseX = input.getMouseX();
        this.mouseY = input.getMouseY();
        this.melee = input.getMelee();
        this.click = input.getClick();

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
    }
}
