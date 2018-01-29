package gs.app.messages;

public class Coordinate {
    private Integer x;
    private Integer y;

    public Coordinate(){}
    public Coordinate(Integer x, Integer y){
        this.x = x;
        this.y = y;
    }

    public Integer getX(){
        return this.x;
    }

    public Integer getY(){
        return this.y;
    }

    public void setX(Integer x){
        this.x = x;
    }

    public void setY(Integer y){
        this.y = y;
    }
}
