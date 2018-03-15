import {Component, OnInit} from '@angular/core';
import {GameService} from "../services/GameService";
import {Session} from "../models/Session";

@Component({
  selector: 'lobby-component',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit{

  sessions:Session[];

  constructor(private GameService: GameService){}
  ngOnInit(){
    this.sessions = this.GameService.getSessions();
  }
}
