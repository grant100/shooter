package gs.app.session;

import java.util.ArrayList;
import java.util.List;

public class Game {
    private String id;
    private List<Player> players = new ArrayList<>();

    public Game(String id){
        this.id = id;
    }

    public String getGameId(){
        return this.id;
    }

    public void join(Player player){
        this.players.add(player);
    }

    public void leave(Player player){
        // todo
    }

    public void process(){

    }

    public Player getPlayerById(String id){
        return null;
    }

}
