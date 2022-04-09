package com.example.demo.controller;

 
 
 
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import com.example.demo.models.GameResult;
import com.example.demo.models.Greeting;
import com.example.demo.models.HelloMessage;
import com.example.demo.models.Player;
import com.example.demo.repository.PlayerRepository;
 

@Controller
public class GreetingController {
	
	@Autowired
	PlayerRepository playerRepository;
	
	
	@Autowired
	SimpMessagingTemplate simpMessagingTemplate;
 
  @MessageMapping("/player1")
  @SendTo("/game/choicePicke1")
  public GameResult greeting(Player message) throws Exception {
	  System.out.println("---- ++ >"+message.getName());
	  System.out.println("---- ++ >"+message.getId());
	  
	  GameResult G1=null;
	  if(message.getName().equals("") ) {
		  Optional<Player> playerOne= playerRepository.findById(1L);
	      Optional<Player> playerTwo= playerRepository.findById(2L);
	     playerOne.get().setChoice("");
	     playerTwo.get().setChoice("");
	     playerRepository.saveAndFlush(playerOne.get());
	     playerRepository.saveAndFlush(playerTwo.get());
		 System.out.println("---- player1 >"+playerOne);
		  
	  }else {
		 Optional<Player> playerOne= playerRepository.findById(1L);
	     Optional<Player> playerTwo= playerRepository.findById(2L);
	     playerOne.get().setChoice(message.getName());
	     playerRepository.saveAndFlush(playerOne.get());
		 System.out.println("---- player1 >"+playerOne);
		  G1=new GameResult(playerOne.get().getChoice(),true,1,playerTwo.get().getChoice(),false,0);

	  }
	   
 	 
		 
   // Thread.sleep(1000); // simulated delay
  //  return new Greeting("Hello, "+ HtmlUtils.htmlEscape(message.getName()) + "!");
		 return G1;
  }
  
  @MessageMapping("/player2")
  @SendTo("/game/choicePicke2")
  public Greeting pickChoicePlayerTwo(HelloMessage message) throws Exception {
 
	  Optional<Player> playerTwo= playerRepository.findById(2L);
	  playerTwo.get().setChoice(message.getName());
	     playerRepository.saveAndFlush(playerTwo.get());
		 System.out.println("---- player2 >"+playerTwo);
   // Thread.sleep(1000); // simulated delay
		 
    return new Greeting("Hello, "+ HtmlUtils.htmlEscape(message.getName()) + "!");
  }
  
  @MessageMapping("/gameRoom")
   public void RoomGame(HelloMessage message) throws Exception {
	  this.simpMessagingTemplate.convertAndSend("/topic/Room", message);

		 
    return  ;
  }
  


}