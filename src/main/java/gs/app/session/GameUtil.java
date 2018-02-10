package gs.app.session;

import java.util.ArrayList;
import java.util.List;

public class GameUtil {
    public static void generateZombie(List<Zombie> zombies){
        if(zombies.isEmpty()){
            zombies.add(new Zombie(512.0,512.0));
        }
    }

    public static Boolean collisionCheck(Player player, List<Zombie> zombies){
        Boolean isCollision = false;
        for(Zombie zombie:zombies){
            Boolean collision  = isCollision(player,zombie);
            if(collision){
                isCollision = collision;
            }
        }

        return isCollision;
    }

    private static Boolean isCollision(Player player, Zombie zombie){
        return !(((player.y + player.height) < (zombie.y)) ||
                  (player.y > (zombie.y + zombie.height)) ||
                  ((player.x + player.width) < zombie.x) ||
                  (player.x > (zombie.x + zombie.width))
        );
    }

    public static List excludePlayer(List<Player> players, Player player){
        List<Player> teamList = new ArrayList<>();
        for(Player teamPlayer : players){
            if(!teamPlayer.getId().equals(player.getId())){
                teamList.add(teamPlayer);
            }
        }
        return teamList;
    }

    public static List getBullets(List<Player> players){
        List<Bullet> bullets = new ArrayList<>();
        for(Player player : players){
            bullets.addAll(player.getBullets());
        }

        return bullets;
    }
}
