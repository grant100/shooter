package gs.app.session;


import java.util.ArrayList;
import java.util.List;

public class GameManager {
    List<Game> games = new ArrayList<>();
    public List<Game> getAllGames(){
        return this.games;
    }

    public Game getGameById(Integer id){
        for(Game game : games){
            if(game.getGameId().equals(id)){
                return game;
            }
        }

        return null;
    };

    public Game findGame(){
        for(Game game : games){
            if(game.getPlayers().size() < 5){
                return game;
            }
        }

        // still here? create game
        Game game  = new Game(games.size()+1);
        games.add(game);
        return game;
    };

    public void cleanup(){
        for(int i = 0; i < games.size(); i++){
            Game game = games.get(i);
            if(game.getIsEmpty()){
                games.remove(i);
            }
        }
    }
}
