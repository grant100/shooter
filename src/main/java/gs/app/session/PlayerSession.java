package gs.app.session;

import gs.app.messages.Input;

public class PlayerSession {
    Integer x = 2048/2;
    Integer y = 2048/2;
    String id;
    Input input;
    String avatar = "/images/shooter/rifle/idle/survivor-idle_rifle_0.png";

    //public PlayerSession(){}
    public PlayerSession(String id){
        this.id = id;
    };
    public String getId(){
        return this.id;
    }
    public Input getInput(){return this.input;}

    public void setInput(Input input){
        this.input = input;
    }

    public void process(){
        if(input.getUp()){
            this.y-=1;
        }
        if(input.getDown()){
            this.y+=1;
        }
        if(input.getLeft()){
            this.x-=1;
        }
        if(input.getRight()){
            this.x+=1;
        }
        if(input.getClick()){
            // click
        }
        if(input.getMelee()){
            // melee
        }
    }
}
