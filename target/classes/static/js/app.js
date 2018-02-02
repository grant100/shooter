var stompClient = null;
var parent = null;
var canvas = null;
var ctx = null;
var bender = null;
var id = null;
var players = [];
var player = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
}

function connect() {
    id = $("#name").val();
    if(id){
        setCanvasHandler();
        var socket = new SockJS('/shooter-stomp');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            setConnected(true);
            console.log('Connected: ' + frame);
            create();

             stompClient.subscribe('/queue/playerCreatedEvent',function(player){
                 resetPlayerList(JSON.parse(player.body));
             })
             stompClient.subscribe('/queue/position', function (position) {
                 update(JSON.parse(position.body));
                 render();
             });
        });
    }
}

function create(){
    stompClient.send("/app/createPlayerEvent",{},JSON.stringify({id:id,'x':512,'y':512}));
}


function resetPlayerList(playerList){
    players = playerList;
}
function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
    setConnected(false);
}

function sendCoordinates(id, x, y) {
    stompClient.send("/app/position", {}, JSON.stringify({id: id, 'x': x, 'y': y}));
}

function update(position){
    console.log("update "+position);
    for(var i = 0; i < players.length; i++ ){
        var lid = players[i];
        var pid = position.id;
        console.log(lid.id +" "+pid);
        if(lid.id == pid){
            players[i] = position;
        }
    }
}
function render() {
    //var rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(var i = 0; i < players.length; i++ ){
        var player = players[i];
        x = player.x -(bender.width *.25);
        y = player.y -(bender.height *.25);
        ctx.drawImage(bender, x, y, bender.width * .25, bender.height * .25);
        ctx.fillText(player.id + " "+x +" "+y, x, y);
    }
}

function setCanvasHandler() {

    canvas.addEventListener("touchmove", function (e) {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX ,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }, false);

    $("canvas").mousemove(function (event) {
        sendCoordinates(id,event.pageX, event.pageY);
    });
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


    parent = document.getElementById("main");
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 1024;
    parent.appendChild(canvas);

    //bender = new Image();
    //bender.src = "/images/bender.jpg";
});