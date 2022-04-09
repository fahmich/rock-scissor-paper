var stompClient = null;
var stompClient2 = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    $("#button-confirm").show();


    if (connected) {
        $("#conversation").show();
        $("#main-content2").hide();
    }
    else {
        $("#conversation").hide();
 		$("#main-content2").show();
    }
    $("#greetings").html("");
}
function setConnected2(connected) {
    $("#connect2").prop("disabled", connected);
    $("#disconnect2").prop("disabled", !connected);
     $("#pickchoice2").show();
    if (connected) {
        $("#conversation2").show();
 		$("#main-content").hide();
    }
    else {
        $("#conversation2").hide();
        $("#main-content").show();
    }
    $("#greetings2").html("");
}
 

function connectPlayer1() {
	
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/game/choicePicke1', function (greeting) {
	 
	    console.log('Connected ++++: ' + JSON.parse(greeting.body)["playerOneChoice"] );
            showGreeting(JSON.parse(greeting.body)["playerOneChoice"],JSON.parse(greeting.body)["playerTwoChoice"] );

           addScoreWin(JSON.parse(greeting.body)["winGameplayerOneResult"],JSON.parse(greeting.body)["winGameplayerTwoResult"])
        });
    });
}
function connectPlayer2() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient2 = Stomp.over(socket);
    stompClient2.connect({}, function (frame) {
        setConnected2(true);
        console.log('Connected: ' + frame);
        stompClient2.subscribe('/game/choicePicke2', function (greeting) {
            showGreeting2(JSON.parse(greeting.body).content);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
  $("#pickchoice").hide();
    console.log("Disconnected");
}
function disconnect2() {
    if (stompClient2 !== null) {
        stompClient2.disconnect();
    }
    setConnected2(false);
 $("#pickchoice2").hide();
    console.log("Disconnected2");
}

function sendName() {
	  $("#pickchoice").hide();
    stompClient.send("/app/player1", {}, JSON.stringify({'id':1,'name': ChoicePick}));
}
function sendName2() {
	 $("#pickchoice2").hide();
    stompClient2.send("/app/player2", {}, JSON.stringify({'name': ChoicePick}));
}

function showGreeting(message,message1) {
    $("#greetings").append("<tr><td>+  player1: " + message +" vs player2: "+ message1+ "</td></tr>");
}

function showGreeting2(message) {
    $("#greetings2").append("<tr><td>" + message + "</td></tr>");
}

function addScoreWin(score1,score2) {
	 document.getElementById("score1Child1").remove();
	 document.getElementById("score2Child2").remove();
 
 
    $("#score1").append("<div id='score1Child1'  >" + score1+ "</div>");
    $("#score2").append("<div id='score2Child2' >" +  score2+ "</div>"); 
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connectPlayer1(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); }); 

    $( "#connect2" ).click(function() { connectPlayer2(); });
    $( "#disconnect2" ).click(function() { disconnect2(); });
    $( "#send2" ).click(function() { sendName2(); });
  
});










// import jQuery https://code.jquery.com/jquery-3.3.1.min.js
var elementSelected = null;
var typeSelected = false;
var ChoicePick=null;

var elementSelected2 = null;
var typeSelected2 = false;
var ChoicePick2=null;

$(document).on('click', '.list-image > img', function(){
  $('.list-image > img').each(function(){
    $(this).removeClass('active');
  })
  $(this).addClass('active');
  elementSelected = $(this);
   ChoicePick=$(this).attr('alt');
  typeSelected = false;
});
/* 
$(document).on('click', '.list-image2 > img', function(){
  $('.list-image2 > img').each(function(){
    $(this).removeClass('active');
  })
  $(this).addClass('active');
  elementSelected2 = $(this);
   ChoicePick2=$(this).attr('alt');
  typeSelected2 = false;
});
*/
$(document).on('input', '#text-src', function(){
  $('.list-image > img').each(function(){
    $(this).removeClass('active');
  })
  elementSelected = $(this);
  typeSelected = true;
})

$(document).on('click', '#button-confirm', function(){
 /* $('.select-image').hide();*/
$('#button-confirm').hide();
 
    $('.view-image > img').attr('src', elementSelected.attr('src'));
       console.log('***** ' + ChoicePick);

   sendName(); 

  $('.view-image').fadeIn('high');
})
$(document).on('click', '#button-confirm2', function(){ 
$('#button-confirm').hide(); 
    $('.view-image > img').attr('src', elementSelected.attr('src'));
       console.log('***** ' + ChoicePick);

   sendName2();  
  $('.view-image').fadeIn('high');
})


$(document).on('click', '#button-other', function(){
  $('.view-image').hide();
  $('.select-image').fadeIn('high');
$('#button-confirm').show();
})








