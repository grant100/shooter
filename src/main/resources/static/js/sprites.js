function Rifle(){

     this.idle ={
        img : new Image(),
        src : "/images/rifle_idle.png",
        y : 10,
        x : [237, 2280, 464, 691, 918, 1145, 1372, 1599, 1826, 2053, 10, 2507, 2734, 2961, 3188, 3415, 3642, 3869, 4096, 4323],
        w : 207,
        h : 313,
        frame : 0,
        ticks_per_frame : 2,
        ticks : 0
    };

    this.recoil = {
        img : new Image(),
        src : "/images/rifle_recoil.png",
        y : 10,
        x : [10,236,462],
        w : 206,
        h : 312,
        frame : 0,
        ticks_per_frame : 1,
        ticks : 0
    };

    this.melee = {
        img : new Image(),
        src : "/images/rifle_melee.png",
        y : 10,
        x : [383,2621,756,1129,1502,1875,2248,10,2994,3367,3740,4113,4486,4859,5232],
        w : 353,
        h : 358,
        frame : 0,
        ticks_per_frame : 1,
        ticks : 0
    };
}

