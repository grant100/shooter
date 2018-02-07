package gs.app.session;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GameUtil {
    public static void generateZombie(List<Zombie> zombies){
        if(zombies.isEmpty()){
            zombies.add(new Zombie(512.0,512.0));
        }
    }

    public static Boolean collisionCheck(PlayerSession player, List<Zombie> zombies){
        Boolean isCollision = false;
        for(Zombie zombie:zombies){
            Boolean collision  = isCollision(player,zombie);
            if(collision){
                isCollision = collision;
            }
        }

        return isCollision;
    }

    private static Boolean isCollision(PlayerSession player, Zombie zombie){
        return !(((player.y + player.height) < (zombie.y)) ||
                  (player.y > (zombie.y + zombie.height)) ||
                  ((player.x + player.width) < zombie.x) ||
                  (player.x > (zombie.x + zombie.width))
        );
    }

    public static List excludePlayer(List<PlayerSession> players, PlayerSession player){
        List<PlayerSession> teamList = new ArrayList<>();
        for(PlayerSession teamPlayer : players){
            if(!teamPlayer.getId().equals(player.getId())){
                teamList.add(teamPlayer);
            }
        }
        return teamList;
    }

    public static List getBullets(List<PlayerSession> players){
        List<Bullet> bullets = new ArrayList<>();
        for(PlayerSession player : players){
            bullets.addAll(player.getBullets());
        }

        return bullets;
    }
}
