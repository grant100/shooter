var stompClient = null;
var stompConnct = false;
var ctx = null;
var id = null;
var player = null;
var initialized = false;
var positionUpdates = null;
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
            window.requestAnimationFrame(render);
            var socket = new SockJS('/game-stomp');
            stompClient = Stomp.over(socket);
        }
        stompClient.connect({}, function (frame) {
            setConnected(true);
            stompClient.subscribe('/queue/position-updates', function (updates) {
                positionUpdates = JSON.parse(updates.body);
                //render(JSON.parse(positionUpdates.body));
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

function playerInput(up, down, left, right, melee, click, mouseX, mouseY, clickX, clickY) {
    if (stompConnct) {
        stompClient.send("/app/position-updates", {}, JSON.stringify({
            'up': up
            , 'down': down
            , 'left': left
            , 'right': right
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
    move();
};

function krs(e) {
    Key.STATE[e.keyCode] = false;
    e.preventDefault();
    move();
}

function msm(e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.pageX - rect.left;
    mouse.y = e.pageY - rect.top;
    move();
}

function mdn(e) {
    Key.CLICK = true;
    click.x = e.pageX;
    click.y = e.pageY;
    move();
}


function mup(e) {
    Key.CLICK = false;
    move();
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
    document.body.appendChild(canvas);

    player = new Player('grant');
    Key.STATE[Key.W] = false;
    Key.STATE[Key.S] = false;
    Key.STATE[Key.A] = false;
    Key.STATE[Key.D] = false;

    Key.STATE[Key.UP] = false;
    Key.STATE[Key.DOWN] = false;
    Key.STATE[Key.LEFT] = false;
    Key.STATE[Key.RIGHT] = false;

    Key.CLICK = false;
    Key.STATE[Key.E] = false;

}

function move() {
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

function render() {
    console.log(positionUpdates);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player._d_laser(positionUpdates.playerX, positionUpdates.playerY, positionUpdates.mouseX, positionUpdates.mouseY);
    player._a_idle(positionUpdates.playerX, positionUpdates.playerY, positionUpdates.mouseX, positionUpdates.mouseY);
    //player._d_draw(pu.playerX,pu.playerY,pu.mouseX,pu.mouseY)

    window.requestAnimationFrame(render);
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

    //init();

});
