var stompClient = null;
var parent = null;
var canvas = null;
var ctx = null;
var bender = null;
var id = null;
function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
}
function connect() {
    begin();
    var socket = new SockJS('/shooter-stomp');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/position', function (position) {
            showPosition(JSON.parse(position.body));
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
    setConnected(false);
}

function sendCoordinates(x,y) {
    stompClient.send("/app/coordinates", {}, JSON.stringify({id:id,'x': x,'y':y}));
}

function showPosition(message) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    offx = bender.width/2;
    offy = bender.height/2;

    ctx.drawImage(bender,message.x - offx,message.y - offy,bender.width*.25,bender.height*.25);
    ctx.fillText(message.id,message.x - offx,message.y - offy);
    //$("#greetings").append("<tr><td>" + message.x +" "+ message.y+"</td></tr>");
}

function begin(){
    id = $("#name").val();
    $( "canvas" ).mousemove(function( event ) {
        sendCoordinates(event.pageX,event.pageY);
    });
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });

    parent = document.getElementById("main");
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 1024;
    parent.appendChild(canvas);

    bender = new Image();
    bender.src="/images/bender.jpg";
});