export class Game{
  isEmpty:boolean;
  size:number;
  gameId:number;
  constructor(isEmpty:boolean,size:number,gameId:number){
    this.isEmpty = isEmpty;
    this.size= size;
    this.gameId = gameId;
  }
}
