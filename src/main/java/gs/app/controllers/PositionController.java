package gs.app.controllers;

import gs.app.messages.Coordinate;
import gs.app.topics.Position;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class PositionController {

    @MessageMapping("/coordinates")
    @SendTo("/topic/position")
    public Position position(Coordinate coordinates) throws Exception {
        return new Position(coordinates);
    }
}
