var stompClient = null;
var stompClient2 = null;
var UserId=1;

// import jQuery https://code.jquery.com/jquery-3.3.1.min.js
var elementSelected = null;
var typeSelected = false;
var ChoicePick=null;

var elementSelected2 = null;
var typeSelected2 = false;
var ChoicePick2=null;



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
 $("#button-confirm2").show();


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
	 
	    console.log('Connected ++++1: ' + JSON.parse(greeting.body)["playerOneChoice"] );
  
	 showGreeting(JSON.parse(greeting.body)["playerOneChoice"],JSON.parse(greeting.body)["playerTwoChoice"] );
     addScoreWin(JSON.parse(greeting.body)["winGameplayerOneResult"],JSON.parse(greeting.body)["winGameplayerTwoResult"])
               if(JSON.parse(greeting.body)["playerOneChoice"]=="" && JSON.parse(greeting.body)["playerTwoChoice"]==""){
					  initFunction();
				}
			ChoicePick2=JSON.parse(greeting.body)["playerTwoChoice"];	
			if(ChoicePick2 == "Paper" || ChoicePick2 == "Rock"|| ChoicePick2 == "Scissor"){ 
			    $('#adversaire').attr('src', './'+ChoicePick2+'.PNG');
               $("#button-other").show();
				if(JSON.parse(greeting.body)["winGameplayerOneResult"]==10 && userId==1){
				    $("#Win").show();	
				}else if(JSON.parse(greeting.body)["winGameplayerTwoResult"]==10 && userId==1){
					$("#Lose").show();
				}
			}else{
				 $('#adversaire').attr('src', './wait.PNG');
			}
        });
    }); 
}

function connectPlayer2() {
	
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected2(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/game/choicePicke1', function (greeting) {
	 
	    console.log('Connected ++++2: ' + JSON.parse(greeting.body)["playerOneChoice"] );

		 showGreeting2(JSON.parse(greeting.body)["playerTwoChoice"] ,JSON.parse(greeting.body)["playerOneChoice"]);
		  addScoreWin(JSON.parse(greeting.body)["winGameplayerTwoResult"],JSON.parse(greeting.body)["winGameplayerOneResult"] );
				if(JSON.parse(greeting.body)["playerOneChoice"]=="" && JSON.parse(greeting.body)["playerTwoChoice"]==""){
					  initFunction();
				}
       ChoicePick2=JSON.parse(greeting.body)["playerOneChoice"];
		 
		if(ChoicePick2 == "Paper" || ChoicePick2 == "Rock"|| ChoicePick2 == "Scissor"){ 
		    $('#adversaire').attr('src', './'+ChoicePick2+'.PNG');

		$("#button-other").show();
			if(JSON.parse(greeting.body)["winGameplayerTwoResult"]==10 && userId==2){
			    $("#Win").show();	
			}else if(JSON.parse(greeting.body)["winGameplayerOneResult"]==10 && userId==2){
				$("#Lose").show();
			}
		}else{
			 $('#adversaire').attr('src', './wait.PNG');
		}
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
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected2(false);
  $("#pickchoice2").hide();
    console.log("Disconnected");
}
 
function sentform() {
	  $("#pickchoice").hide();
    userId=1
    stompClient.send("/app/player1", {}, JSON.stringify({'id':1,'choice': ChoicePick}));
}
function sentform2() {
	 $("#pickchoice2").hide();
    userId=2
    stompClient.send("/app/player1", {}, JSON.stringify({'id':2,'choice': ChoicePick}));
}

function newGame() { 
	 console.log("newGame");
    stompClient.send("/app/player1", {}, JSON.stringify({'id':2,'choice': "new"})); 
}
 

function showGreeting(message,message1) {
    $("#greetings").append("<tr><td>+  my Choice: " + message +" vs adversaire: "+ message1+ "</td></tr>");
}

function showGreeting2(message,message1) {
    $("#greetings2").append("<tr><td>+  my Choice: " + message +" vs adversaire: "+ message1+ "</td></tr>");
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
    $( "#send" ).click(function() { sentform(); }); 

    $( "#connect2" ).click(function() { connectPlayer2(); });
    $( "#disconnect2" ).click(function() { disconnect2(); });
    $( "#send2" ).click(function() { sentform2(); });
  
});











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
 
    $('.view-image > img').attr('src', elementSelected.attr('src'));
       console.log('***** ' + ChoicePick);
     if(ChoicePick2 == "Paper" || ChoicePick2 == "Rock"|| ChoicePick2 == "Scissor"){ 
		    $('#adversaire').attr('src', './'+ChoicePick2+'.PNG');
		}else{
			 $('#adversaire').attr('src', './wait.PNG');
		}
   sentform();  
  $('.view-image').fadeIn('high');
  $('.select-image').hide();

})

$(document).on('click', '#button-confirm2', function(){ 
 
    $('.view-image > img').attr('src', elementSelected.attr('src'));
       console.log('***** ' + ChoicePick);
					console.log('*****44' + ChoicePick2!="");
			console.log('*****33 //' + ChoicePick2!=null);
			console.log('*****22 //' + ChoicePick2+"///");
	if(ChoicePick2 !=null || ChoicePick2 !=""){
		    $('#adversaire').attr('src', './'+ChoicePick2+'.PNG');
	
	}  
     sentform2();  
	 $('.view-image').fadeIn('high'); 
	 $('.select-image').hide();
})


$(document).on('click', '#button-other', function(){ 
 $('.view-image').hide();
  $('.select-image').fadeIn('high');
	if(userId==1){
		 $('#button-confirm').show();
	}else{
		 $('#button-confirm2').show();
	}
  newGame(); 
$("#button-other").hide();
$("#Lose").hide();
$("#Win").hide();
})

function initFunction() {
	 $('.view-image').hide();
  $('.select-image').fadeIn('high');
	if(userId==1){
		 $('#button-confirm').show();
	}else{
		 $('#button-confirm2').show();
	} 
}








