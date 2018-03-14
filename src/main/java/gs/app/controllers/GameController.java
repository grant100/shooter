package gs.app.controllers;

import gs.app.messages.Input;
import gs.app.session.Bullet;
import gs.app.session.GameUtil;
import gs.app.session.Player;
import gs.app.session.Zombie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.MessageDeliveryException;
import org.springframework.messaging.converter.MessageConversionException;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping
public class GameController {


    ArrayList<Player> players = new ArrayList<>();
    volatile List<Zombie> zombies = new ArrayList<>();

    @RequestMapping("/")
    public String index(){
        return "index.html";
    }

    @Autowired
    public SimpMessageSendingOperations messagingTemplate;


    @MessageExceptionHandler({MessageConversionException.class,MessageDeliveryException.class})
    @MessageMapping("/position-updates")
    @SendTo("/topic/position-updates")
    public Player positionUpdates(Input input, SimpMessageHeaderAccessor accessor) throws Exception {
      Player player = (Player)accessor.getSessionAttributes().get("Player");
      player.setInput(input);
      player.process();

      // TODO refine game mechanics
      //GameUtil.generateZombie(zombies);
      //Zombie.setChase(zombies, players);
      messagingTemplate.convertAndSend("/topic/enemy-updates",zombies);
      List teamList = GameUtil.excludePlayer(players,player);
      messagingTemplate.convertAndSend("/topic/team-updates",teamList);
      List<Bullet> bullets = GameUtil.getBullets(players);
        messagingTemplate.convertAndSend("/topic/bullet-updates",bullets);
      player.setCollision(GameUtil.collisionCheck(player,zombies));

      return player;
    }
}