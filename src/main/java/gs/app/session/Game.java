package gs.app.session;

import java.util.ArrayList;
import java.util.List;

public class Game {
    private Integer id;
    private Boolean isEmpty = true;
    private List<Player> players = new ArrayList<>();

    public Game(Integer id){
        this.id = id;
    }

    public Integer getGameId(){
        return this.id;
    }

    public Game join(Player player){
        player.setGID(this.id);
        player.setJoined(true);
        this.players.add(player);
        this.isEmpty = false;
        return this;
    }

    public void leave(Player player){
        for(int i = 0; i < players.size(); i++){
            Player member = players.get(i);
            if(member.getId().equals(player.getId())){
                players.remove(i);
                player.setGID(null);
                player.setJoined(false);
            }
        }

        if(this.getSize().equals(0)){
            this.isEmpty = true;
        }
    }

    public void process(){

    }

    protected List<Player> getPlayers(){
        return this.players;
    }

    public Boolean getIsEmpty(){
        return this.isEmpty;
    }

    public Integer getSize(){
        return this.players.size();
    }
}
