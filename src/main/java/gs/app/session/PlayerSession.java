package gs.app.session;

import gs.app.messages.Input;

public class PlayerSession {
    Integer playerX = 2048 / 2;
    Integer playerY = 2048 / 2;
    Integer mouseX;
    Integer mouseY;
    Integer clickX;
    Integer clickY;
    Integer speed = 3;
    String id;
    private Input input;
    //String avatar = "/images/shooter/rifle/idle/survivor-idle_rifle_0.png";

    //public PlayerSession(){}
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

    public Integer getPlayerX(){
        return this.playerX;
    }

    public Integer getPlayerY() {
        return playerY;
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

    public void setInput(Input input) {
        this.input = input;
    }

    public void process() {
        this.mouseX = input.getMouseX();
        this.mouseY = input.getMouseY();

        if (input.getUp()) {
            this.playerY -= 1 * speed;
        }
        if (input.getDown()) {
            this.playerY += 1*speed;
        }
        if (input.getLeft()) {
            this.playerX -= 1*speed;
        }
        if (input.getRight()) {
            this.playerX += 1 *speed;
        }
        if (input.getClick()) {
            this.clickX = input.getClickX();
            this.clickY = input.getClickY();
        }
        if (input.getMelee()) {
            // melee
        }
    }
}
