package gs.app.controllers;

import gs.app.messages.Input;
import gs.app.session.GameUtil;
import gs.app.session.PlayerSession;
import gs.app.session.Zombie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Scope;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.filter.RequestContextFilter;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
@SessionAttributes("PlayerSession")
@RequestMapping
public class GameController {

    List<PlayerSession> playerSessions = new ArrayList<>();
    List<Zombie> zombies = new ArrayList<>();
    @RequestMapping("/")
    public String index(){
        return "index.html";
    }

    @Autowired
    public SimpMessageSendingOperations messagingTemplate;

    /*@SendTo("/topic/enemy-updates")
    public List<Zombie> enemyUpdates(){
        return zombies;
    }*/

    @MessageMapping("/position-updates")
    @SendTo("/topic/position-updates")
    public PlayerSession positionUpdates(Input input,SimpMessageHeaderAccessor accessor) throws Exception {
      PlayerSession player = (PlayerSession)accessor.getSessionAttributes().get("PlayerSession");
      player.setInput(input);
      player.process();

      GameUtil.generateZombie(zombies);
      Zombie.setChase(zombies, player);
      messagingTemplate.convertAndSend("/topic/enemy-updates",zombies);

      //enemyUpdates();
      player.setCollision(GameUtil.collisionCheck(player,zombies));

      return player;
    }

    @ModelAttribute("PlayerSession")
    public PlayerSession getPlayer(HttpServletRequest request){
        PlayerSession player = new PlayerSession(request.getRequestedSessionId());
        playerSessions.add(player);
        return player;
    }
}
