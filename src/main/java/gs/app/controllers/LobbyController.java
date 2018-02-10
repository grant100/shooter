package gs.app.controllers;

import gs.app.session.GameManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LobbyController {
    @Autowired
    GameManager gameManager;
}
