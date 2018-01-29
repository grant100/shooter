package gs.app.messages;

public class Coordinate {
    private String id;
    private Integer x;
    private Integer y;

    public Coordinate(){}
    public Coordinate(String id, Integer x, Integer y){
        this.id = id;
        this.x = x;
        this.y = y;
    }

    public String getId(){
        return id;
    }

    public void setId(String id){
        this.id = id;
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
