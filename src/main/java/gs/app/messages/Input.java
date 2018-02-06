package gs.app.messages;

public class Input {
    private Boolean up;
    private Boolean down;
    private Boolean left;
    private Boolean right;
    private Boolean melee;
    private Boolean click;
    private Integer mouseX;
    private Integer mouseY;
    private Integer clickX;
    private Integer clickY;

    public Input() {
    }


    public Boolean getUp() {
        return up;
    }

    public Boolean getDown() {
        return down;
    }


    public Boolean getLeft() {
        return left;
    }


    public Boolean getRight() {
        return right;
    }

    public Boolean getMelee() {
        return melee;
    }

    public Boolean getClick() {
        return click;
    }

    public Integer getMouseX() {
        return mouseX;
    }

    public Integer getMouseY() {
        return mouseY;
    }

    public Integer getClickX() {
        return clickX;
    }

    public Integer getClickY() {
        return clickY;
    }

    public void setUp(Boolean up) {
        this.up = up;
    }

    public void setDown(Boolean down) {
        this.down = down;
    }

    public void setLeft(Boolean left) {
        this.left = left;
    }

    public void setRight(Boolean right) {
        this.right = right;
    }

    public void setMelee(Boolean melee) {
        this.melee = melee;
    }

    public void setClick(Boolean click) {
        this.click = click;
    }

    public void setMouseX(Integer mouseX) {
        this.mouseX = mouseX;
    }

    public void setMouseY(Integer mouseY) {
        this.mouseY = mouseY;
    }

    public void setClickX(Integer clickX) {
        this.clickX = clickX;
    }

    public void setClickY(Integer clickY) {
        this.clickY = clickY;
    }

}
