var  RIFLE= {
    IDLE: {
        FRAME: [
            "/images/shooter/rifle/idle/survivor-idle_rifle_0.png",
            "/images/shooter/rifle/idle/survivor-idle_rifle_1.png",
            "/images/shooter/rifle/idle/survivor-idle_rifle_2.png",
            "/images/shooter/rifle/idle/survivor-idle_rifle_3.png",
            "/images/shooter/rifle/idle/survivor-idle_rifle_4.png",
            "/images/shooter/rifle/idle/survivor-idle_rifle_5.png",
            "/images/shooter/rifle/idle/survivor-idle_rifle_6.png",
            "/images/shooter/rifle/idle/survivor-idle_rifle_7.png",
            "/images/shooter/rifle/idle/survivor-idle_rifle_8.png",
            "/images/shooter/rifle/idle/survivor-idle_rifle_9.png",
            "/images/shooter/rifle/idle/survivor-idle_rifle_10.png",
            "/images/shooter/rifle/idle/survivor-idle_rifle_11.png",
            "/images/shooter/rifle/idle/survivor-idle_rifle_12.png",
            "/images/shooter/rifle/idle/survivor-idle_rifle_13.png",
            "/images/shooter/rifle/idle/survivor-idle_rifle_14.png",
            "/images/shooter/rifle/idle/survivor-idle_rifle_15.png",
            "/images/shooter/rifle/idle/survivor-idle_rifle_16.png",
            "/images/shooter/rifle/idle/survivor-idle_rifle_17.png",
            "/images/shooter/rifle/idle/survivor-idle_rifle_18.png",
            "/images/shooter/rifle/idle/survivor-idle_rifle_19.png"
        ],
        tickCount :0,
        ticksPerFrame : 2,
        frameCount:0

    },
    MELE:{
        FRAME:[
            "/images/shooter/rifle/meleeattack/survivor-meleeattack_rifle_0.png",
            "/images/shooter/rifle/meleeattack/survivor-meleeattack_rifle_1.png",
            "/images/shooter/rifle/meleeattack/survivor-meleeattack_rifle_2.png",
            "/images/shooter/rifle/meleeattack/survivor-meleeattack_rifle_3.png",
            "/images/shooter/rifle/meleeattack/survivor-meleeattack_rifle_4.png",
            "/images/shooter/rifle/meleeattack/survivor-meleeattack_rifle_5.png",
            "/images/shooter/rifle/meleeattack/survivor-meleeattack_rifle_6.png",
            "/images/shooter/rifle/meleeattack/survivor-meleeattack_rifle_7.png",
            "/images/shooter/rifle/meleeattack/survivor-meleeattack_rifle_8.png",
            "/images/shooter/rifle/meleeattack/survivor-meleeattack_rifle_9.png",
            "/images/shooter/rifle/meleeattack/survivor-meleeattack_rifle_10.png",
            "/images/shooter/rifle/meleeattack/survivor-meleeattack_rifle_11.png",
            "/images/shooter/rifle/meleeattack/survivor-meleeattack_rifle_12.png",
            "/images/shooter/rifle/meleeattack/survivor-meleeattack_rifle_13.png",
            "/images/shooter/rifle/meleeattack/survivor-meleeattack_rifle_14.png"
        ],
        tickCount :0,
        ticksPerFrame : 1,
        frameCount:0
    },
    FIRE:{
        FRAME:[
            "/images/shooter/rifle/shoot/survivor-shoot_rifle_0.png",
            "/images/shooter/rifle/shoot/survivor-shoot_rifle_1.png",
            "/images/shooter/rifle/shoot/survivor-shoot_rifle_2.png"
            ],
        tickCount :0,
        ticksPerFrame : 1,
        frameCount:0,

        tickColorCount:0,
        ticksColorPerFrame:7,
        color:"red",
        flipColor : function () {
            if(RIFLE.FIRE.color==="red"){
                RIFLE.FIRE.color="orange";
            }else{
                RIFLE.FIRE.color="red";
            }
        }
    }

};