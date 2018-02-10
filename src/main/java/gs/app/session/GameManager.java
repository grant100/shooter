package gs.app.session;


import java.util.ArrayList;
import java.util.List;

public class GameManager {
    List<Game> games = new ArrayList<>();
    public List<Game> getAllGames(){
        return this.games;
    }

    public Game getGameById(String id){
        return null;
    };

    public Game findGame(){
        // join any open game
        return null;
    };
}
