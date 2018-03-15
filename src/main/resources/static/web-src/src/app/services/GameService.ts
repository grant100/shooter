import {Injectable} from "@angular/core";
import {Session} from "../models/Session";

@Injectable()
export class GameService{
  getSessions(): Session[]{
    let sessions: Session[]=[];
    sessions.push(new Session(false,1,1));
    sessions.push(new Session(false,1,2));
    return sessions;
  }
}
