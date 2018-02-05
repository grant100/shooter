var ctx;
var parent;
var canvas;
var player;
var clicked = false;
var enemiz = [];
var bullet = [];
var mouse = {
    x: null,
    y: null
};
var click = {x: null, y: null};
var Key = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    W: 87,
    S: 83,
    A: 65,
    D: 68,
    E: 69,
    CLICK:null,

    STATE: []
};

function kps(e) {
    Key.STATE[e.keyCode] = true;
    e.preventDefault();
};

function krs(e) {
    Key.STATE[e.keyCode] = false;
    e.preventDefault();
}

function msm(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
}

function mdn(e) {
    Key.CLICK = true;
    click.x = e.pageX;
    click.y = e.pageY;
}


function mup(e){
    Key.CLICK = false;
}

function drawBullets(){
    for(var i = 0; i < bullet.length; i++){
        var b_bullet = bullet[i];
        b_bullet._b_draw();
    }
}
function init() {
    parent = document.getElementById("main");
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 2048;
    canvas.height = 2048;
    parent.appendChild(canvas);
    //image = new Image();
    //image.src = "/images/bender.jpg";

    player = new Player('grant');
    var chaser1 = new Chaser('zombiz', 1, .01);
    var chaser2 = new Chaser('zombzz', 1, .008);
    var chaser3 = new Chaser('zombzz', 1, .005);
    chaser1.x = 0;
    chaser1.y = 0;
    chaser2.x = 400;
    chaser2.y = 400;
    chaser3.x = 1024;
    chaser3.y = 1024;
    enemiz.push(chaser2, chaser1,chaser3);

    /*$("canvas").mousemove(function (event) {
        mouse.x = event.pageX;
        mouse.y = event.pageY;
        //player.draw();
    });*/

    document.addEventListener('mousemove', msm, false);
    document.addEventListener('mousedown', mdn, false);
    //document.addEventListener('mousedrag',mdg,false);
    document.addEventListener('mouseup',mup,false);
    document.addEventListener('keydown', kps, false);
    document.addEventListener('keyup', krs, false);

    document.body.appendChild(canvas);

}

function move() {
    if (Key.STATE[Key.UP] || Key.STATE[Key.W]) {
        player.moveUp();
    }

    if (Key.STATE[Key.DOWN] || Key.STATE[Key.S]) {
        player.moveDown();
    }

    if (Key.STATE[Key.LEFT] || Key.STATE[Key.A]) {
        player.moveLeft();
    }
    if (Key.STATE[Key.RIGHT] || Key.STATE[Key.D]) {
        player.moveRight();
    }

    ctx.clearRect(0, 0, canvas.height, canvas.width);
    //wctx.fillStyle = 'red';
    //ctx.fillRect(player.x, player.y, player.w, player.h);
    drawBullets();
    player._d_laser();
    drawEnemies();
    if(Key.STATE[Key.E]){
        player._a_mele();
    }else if(Key.CLICK){
        player.fire();

        // recoil animation
        player._a_recl();
    }else{
        player._a_idle();
    }


requestAnimationFrame(move);


}

function drawEnemies(){
    for (var i = 0; i < enemiz.length; i++) {

        var enemy = enemiz[i];
        //ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
        enemy.follow(player.x, player.y);
        enemy.draw(player.x, player.y);
        if (collisionCheck(player.getPoint(), enemy.getPoint())) {
            player.damage();
        };
    }
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
    /*setInterval(function () {
        move();
    }, 1000 / 60)*/
    requestAnimationFrame(move);
});