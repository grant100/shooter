var stompClient = null;
var stompConnct = false;
var parent = null;
var canvas = null;
var ctx = null;
var id = null;
var zombie = null;
var player = null;
var initialized = false;
var positionUpdates = null;
var enemyUpdates = null;
var teamUpdates = null;
var bulletUpdates = null;
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
    CLICK: null,

    STATE: []
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    stompConnct = connected
}

function connect() {
    id = $("#name").val();
    if (id) {
        if (!initialized) {
            init();
            var socket = new SockJS('/game-stomp');
            stompClient = Stomp.over(socket);
        }
        stompClient.connect({}, function (frame) {
            console.log("REACHED");
            setConnected(true);
            stompClient.subscribe('/topic/position-updates', function (updates) {
                positionUpdates = JSON.parse(updates.body)
                //requestAnimationFrame(render(JSON.parse(updates.body)));
            });

            stompClient.subscribe('/topic/enemy-updates', function (updates) {
                enemyUpdates = JSON.parse(updates.body)
                //requestAnimationFrame(render(JSON.parse(updates.body)));
            });

            stompClient.subscribe('/topic/team-updates', function (updates) {
                teamUpdates = JSON.parse(updates.body)
                //requestAnimationFrame(render(JSON.parse(updates.body)));
            });

            stompClient.subscribe('/topic/bullet-updates', function (updates) {
                bulletUpdates = JSON.parse(updates.body)
                //requestAnimationFrame(render(JSON.parse(updates.body)));
            });
        });


    }
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
    setConnected(false);
}

function playerInput(up,down,left,right,melee, click, mouseX, mouseY, clickX, clickY) {
    if (stompConnct) {
        stompClient.send("/app/position-updates", {}, JSON.stringify({
              'up':up
            , 'down':down
            , 'left':left
            , 'right':right
            , 'melee': melee
            , 'click': click
            , 'mouseX': mouseX
            , 'mouseY': mouseY
            , 'clickX': clickX
            , 'clickY': clickY
        }));
    }
}


function kps(e) {
    Key.STATE[e.keyCode] = true;
    e.preventDefault();
};

function krs(e) {
    Key.STATE[e.keyCode] = false;
    e.preventDefault();
}

function msm(e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.pageX - rect.left;
    mouse.y = e.pageY - rect.top;
}

function mdn(e) {
    Key.CLICK = true;
    click.x = e.pageX;
    click.y = e.pageY;
}


function mup(e) {
    Key.CLICK = false;
}

function init() {
    parent = document.getElementById("main");
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 2048;
    canvas.height = 2048;
    parent.appendChild(canvas);

    document.addEventListener('mousemove', msm, false);
    document.addEventListener('mousedown', mdn, false);
    document.addEventListener('mouseup', mup, false);
    document.addEventListener('keydown', kps, false);
    document.addEventListener('keyup', krs, false);

    player = new Player();
    zombie = new Zombie('model');

    Key.STATE[Key.UP] = false;
    Key.STATE[Key.DOWN] = false;
    Key.STATE[Key.LEFT] = false;
    Key.STATE[Key.RIGHT] = false;
    Key.STATE[Key.W] = false;
    Key.STATE[Key.S] = false;
    Key.STATE[Key.A] = false;
    Key.STATE[Key.D] = false;
    Key.CLICK = false;
    Key.STATE[Key.E] = false;

    requestAnimationFrame(render);
}

function move() {

    if (Key.STATE[Key.UP] || Key.STATE[Key.W]) {
        player.moveUp(positionUpdates.speed);
    }

    if (Key.STATE[Key.DOWN] || Key.STATE[Key.S]) {
        player.moveDown(positionUpdates.speed);
    }

    if (Key.STATE[Key.LEFT] || Key.STATE[Key.A]) {
        player.moveLeft(positionUpdates.speed);
    }
    if (Key.STATE[Key.RIGHT] || Key.STATE[Key.D]) {
        player.moveRight(positionUpdates.speed);
    }



    playerInput(
          Key.STATE[Key.UP] || Key.STATE[Key.W]
        , Key.STATE[Key.DOWN] || Key.STATE[Key.S]
        , Key.STATE[Key.LEFT] || Key.STATE[Key.A]
        , Key.STATE[Key.RIGHT] || Key.STATE[Key.D]
        , Key.STATE[Key.E]
        , Key.CLICK
        , mouse.x
        , mouse.y
        , click.x
        , click.y);
}


function drawEnemies(){
    for (var i = 0; i < enemyUpdates.length; i++) {
        var enemy = enemyUpdates[i];
        zombie._d_draw(enemy.x,enemy.y,enemy.targetX, enemy.targetY);
    }
}

function drawTeam(){
    for (var i = 0; i < teamUpdates.length; i++) {
        var member = teamUpdates[i];
        drawPlayer(member);
    }
}

function drawBullets(){
    for (var i = 0; i < bulletUpdates.length; i++) {
        var b = bulletUpdates[i];
        player._b_draw(b.fx,b.fy,5,5);
    }
}
function render() {
    move();
    if(positionUpdates){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawEnemies();
        drawBullets();
        drawTeam();
        drawPlayer(positionUpdates);
    }
    requestAnimationFrame(render);
}

function drawPlayer(args){
    player._d_laser(args.x, args.y, args.mouseX, args.mouseY);
    if(args.melee){
        player._a_mele(args.x, args.y, args.mouseX, args.mouseY);
    }else if(args.click){
        //player.fire(player.x, player.y, positionUpdates.mouseX, positionUpdates.mouseY);
        player._a_recl(args.x, args.y,args.mouseX, args.mouseY);
    }else{
        player._a_idle(args.x, args.y,args.mouseX, args.mouseY);
    }
}
$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $("#connect").click(function () {
        connect();
    });
    $("#disconnect").click(function () {
        disconnect();
    });
});
