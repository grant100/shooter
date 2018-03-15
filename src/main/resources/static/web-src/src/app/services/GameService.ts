import {Injectable} from "@angular/core";
import {Game} from "../models/Game";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class GameService{

  constructor(private http: HttpClient){}
  getGames(): Game[]{
    let games: Game[]=[];
    games.push(new Game(false,1,1));
    games.push(new Game(false,1,2));
    return games;
  }
}

