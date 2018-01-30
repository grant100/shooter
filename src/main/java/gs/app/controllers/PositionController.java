package gs.app.controllers;

import gs.app.messages.Coordinate;
import gs.app.messages.Player;
import gs.app.topics.Position;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Controller
public class PositionController {

    List<Player> players = new ArrayList<>();

    @Autowired
    public SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/createPlayerEvent")
    @SendTo("/queue/playerCreatedEvent")
    public List create(Player player) throws Exception {
       players.add(player);
       return players;
    }

    @MessageMapping("/position")
    @SendTo("/queue/position")
    public Player position(Player player) throws Exception {
        for (int i = 0; i < players.size(); i++){
            Player ply = players.get(i);
            if(ply.getId().equals(player.getId())){
                players.set(i,player);
            }
        }

        return player;
    }
}
