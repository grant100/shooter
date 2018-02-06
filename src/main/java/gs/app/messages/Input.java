package gs.app.messages;

public class Input {
    private Boolean up;
    private Boolean down;
    private Boolean left;
    private Boolean right;
    private Boolean melee;
    private Boolean click;
    public Input(){}

    public void setUp(Boolean up){
        this.up = up;
    }

    public void setDown(Boolean down){
        this.down = down;
    }

    public void setLeft(Boolean left){
        this.left = left;
    }

    public void setRight(Boolean right){
        this.right = right;
    }

    public void setMelee(Boolean melee){
        this.melee = melee;
    }

    public void setClick(Boolean click){
        this.click = click;
    }

    public Boolean getUp() {
        return this.up;
    }

    public Boolean getDown() {
        return this.down;
    }

    public Boolean getLeft(){
        return this.left;
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
}
