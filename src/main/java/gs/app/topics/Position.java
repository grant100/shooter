package gs.app.topics;

import gs.app.messages.Coordinate;

public class Position {
    Coordinate coordinate;
    public Position(){}
    public Position(Coordinate coordinate){
        this.coordinate = coordinate;
    }

    public Integer getX(){
        return this.coordinate.getX();
    }

    public Integer getY(){
        return this.coordinate.getY();
    }
}
