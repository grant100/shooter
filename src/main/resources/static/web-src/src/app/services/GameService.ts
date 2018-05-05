import {Injectable} from "@angular/core";
import {Game} from "../models/Game";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class GameService{

  constructor(private http: HttpClient){}
  getGames(): Game[]{
    let games: Game[]=[];
    console.log('firing /games GET....');
    var result = this.http.get("/games").subscribe(
      data => new Game(data['isEmpty'],data['size'],data['gameId'])
    );
    console.log(result);
    games.push(new Game(false,1,1));
    games.push(new Game(false,1,2));
    games.push(new Game(false,1,3));
    games.push(new Game(false,1,4));
   // games.push(new Game(false,1,5));
    return games;
  }
}

