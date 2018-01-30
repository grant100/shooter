package gs.app.messages;

public class Player {
    Integer x;
    Integer y;
    Integer id;
    public Player(){};

    public Player(Integer x, Integer y, Integer id){
        this.x = x;
        this.y = y;
        this.id=id;
    }

    public Integer getX(){
        return this.x;
    }

    public Integer getY(){
        return this.y;
    }

    public Integer getId(){
        return this.id;
    }
}
