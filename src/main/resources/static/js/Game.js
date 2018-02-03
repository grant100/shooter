var ctx;
var parent;
var canvas;
var player;
var enemiz = [];
var mouse = {
    x: null,
    y: null
};
var click = {x:null,y:null};
var Key = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    W:87,
    S: 83,
    A:65,
    D : 68,

    STATE:[]
};

function kps(e){
    Key.STATE[e.keyCode] = true;
    e.preventDefault();
};

function krs(e){
    Key.STATE[e.keyCode] = false;
    e.preventDefault();
}

function msm(e){
    mouse.x = e.pageX;
    mouse.y = e.pageY;
}

function mdn(e){
    click.x = e.pageX;
    click.y = e.pageY;
    console.log(click.x +" "+click.y);
}

function mup(e){

}

function init() {
    parent = document.getElementById("main");
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 1024;
    parent.appendChild(canvas);
    //image = new Image();
    //image.src = "/images/bender.jpg";

    player = new Player('grant');
    //var chaser1 = new Chaser('zombiz',1,.01);
    var chaser2 = new Chaser('zombzz',1,.005);
    //chaser1.x=0;
    //chaser1.y=0;
    chaser2.x=400;
    chaser2.y=400;

    enemiz.push(chaser2);

    /*$("canvas").mousemove(function (event) {
        mouse.x = event.pageX;
        mouse.y = event.pageY;
        //player.draw();
    });*/

    document.addEventListener('mousemove',msm,false);
    document.addEventListener('mousedown',mdn,false);
    document.addEventListener('keydown',kps,false);
    document.addEventListener('keyup',krs,false);

}

function move(){
    if(Key.STATE[Key.UP]||Key.STATE[Key.W]){
        player.moveUp();
    }

    if(Key.STATE[Key.DOWN]||Key.STATE[Key.S]){
        player.moveDown();
    }

    if(Key.STATE[Key.LEFT]||Key.STATE[Key.A]){
        player.moveLeft();
    }
    if(Key.STATE[Key.RIGHT]||Key.STATE[Key.D]){
        player.moveRight();
    }
    ctx.clearRect(0, 0, canvas.height, canvas.width);
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x,player.y,player.w,player.h);
    for(var i =0; i < enemiz.length; i++){

        var enemy = enemiz[i];
        ctx.fillRect(enemy.x,enemy.y,enemy.w,enemy.h);
        enemy.follow(player.x,player.y);
        enemy.draw(player.x,player.y);
        if(collisionCheck(player.getPoint(),enemy.getPoint())){
            player.damage();
        };
    }

    player.draw();
}

function collisionCheck(a, b) {
    return !(
        ((a.y + a.h) < (b.y)) ||
        (a.y > (b.y + b.h)) ||
        ((a.x + a.w) < b.x) ||
        (a.x > (b.x + b.w))
    );
};

$(function () {
    init();
    setInterval(function(){
        move();
    },1000/80)
});