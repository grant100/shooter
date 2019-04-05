import {Component, OnInit} from '@angular/core';
import {GameService} from "../services/GameService";
import {Game,} from "../models/Game";

@Component({
  selector: 'lobby-component',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit{

  games:Game[];

  constructor(private GameService: GameService){}
  ngOnInit(){
    console.log('ngOnInit fired...');
    this.games = this.GameService.getGames();
  }
}
