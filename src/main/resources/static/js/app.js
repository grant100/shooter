var stompClient = null;
var ctx = null;
var id = null;

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

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
}

function connect() {
    id = $("#name").val();
    if(id){
        var socket = new SockJS('/game-stomp');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            setConnected(true);
            //console.log('Connected: ' + frame);
            init();
            requestAnimationFrame(move);
            //create();
            /* stompClient.subscribe('/queue/player-joined',function(player){
                 //resetPlayerList(JSON.parse(player.body));
             });*/
             stompClient.subscribe('/queue/position-updates', function (updates) {
                 console.log(JSON.parse(updates.body));
                 //update(JSON.parse(position.body));
                 //render();
             });
        });
    }
}

function create(){
    stompClient.send("/app/player-create",{},JSON.stringify({id:id,'x':512,'y':512}));
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
    setConnected(false);
}

function playerInput(id,up,down,left,right,melee,click) {
    stompClient.send("/app/position-updates", {}, JSON.stringify({'up': up, 'down': down,'left':left,'right':right,'melee':melee,'click':click}));
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

function init() {
    parent = document.getElementById("main");
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 2048;
    canvas.height = 2048;
    parent.appendChild(canvas);
    document.addEventListener('mousemove', msm, false);
    document.addEventListener('mousedown', mdn, false);
    document.addEventListener('mouseup',mup,false);
    document.addEventListener('keydown', kps, false);
    document.addEventListener('keyup', krs, false);
    document.body.appendChild(canvas);
    Key.STATE[Key.W] = false;
    Key.STATE[Key.S] = false;
    Key.STATE[Key.A] = false;
    Key.STATE[Key.D] = false;

    Key.STATE[Key.UP] = false;
    Key.STATE[Key.DOWN] = false;
    Key.STATE[Key.LEFT] = false;
    Key.STATE[Key.RIGHT] = false;

    Key.CLICK=false;
    Key.STATE[Key.E] = false;

}

function move() {
    playerInput(id,Key.STATE[Key.UP]||Key.STATE[Key.W],Key.STATE[Key.DOWN]||Key.STATE[Key.S],Key.STATE[Key.LEFT]||Key.STATE[Key.A],Key.STATE[Key.RIGHT]||Key.STATE[Key.D],Key.STATE[Key.E],Key.CLICK);
    window.requestAnimationFrame(move);
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
