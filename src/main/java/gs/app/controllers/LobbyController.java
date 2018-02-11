package gs.app.controllers;

import gs.app.session.Game;
import gs.app.session.GameManager;
import gs.app.session.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@SessionAttributes("Player")
public class LobbyController {
    @Autowired
    GameManager gameManager;

    @RequestMapping(method = RequestMethod.GET, value = "/games")
    public List<Game> getGames(){
        return this.gameManager.getAllGames();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/join")
    public Game join(@ModelAttribute("Player") Player player,
                     @RequestParam(value="name", defaultValue="Player") String name){
        Game game = null;
        if(!player.getJoined()){
            player.setName(name);
            game = this.gameManager.findGame().join(player);
        }
        return game;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/leave")
    public void leave(@ModelAttribute("Player") Player player){
        this.gameManager.getGameById(player.getGid()).leave(player);
        this.gameManager.cleanup();
    }

    @ModelAttribute("Player")
    public Player getPlayer(HttpServletRequest request){
        Player player = new Player(request.getSession().getId());
        return player;
    }
}
