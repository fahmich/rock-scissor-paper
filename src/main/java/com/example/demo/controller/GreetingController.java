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
	  System.out.println("---- ++ >"+message.getChoice());
	  System.out.println("---- ++ >"+message.getId());
	  
	  GameResult G1=null;
	  Optional<Player> playerOne;
	  Optional<Player> playerTwo;
	  if(message.getChoice().equals("new") ) { 
		   playerOne= playerRepository.findById(1L);
	       playerTwo= playerRepository.findById(2L);
	       if(playerOne.get().getNbgamewin()==10 || playerTwo.get().getNbgamewin()==10) {
	    	   playerOne.get().setNbgamewin(0);
	    	   playerTwo.get().setNbgamewin(0);
	       }
	     playerOne.get().setChoice("");
	     playerTwo.get().setChoice("");
	     playerRepository.saveAndFlush(playerOne.get());
	     playerRepository.saveAndFlush(playerTwo.get());
		 System.out.println("---- player1 >"+playerOne);
		  
	  } else {
		  if(message.getId()== 1L ) {
			   playerOne= playerRepository.findById(message.getId()); 
	           playerTwo= playerRepository.findById(2L);
	           System.out.println("---- 66::>"+!playerOne.get().getChoice().equals("") );
	           System.out.println("---- 55::>"+!playerTwo.get().getChoice().equals("") );
	           playerOne.get().setChoice(message.getChoice());
	             if(!playerTwo.get().getChoice().equals("") ) {
		  		      System.out.println("----**** ** :: >"+ playerWin(playerOne.get().getChoice(), playerTwo.get().getChoice()));
                       if(playerWin(playerOne.get().getChoice(), playerTwo.get().getChoice()).equals("Player1")) {
                    	   playerOne.get().setNbgamewin(playerOne.get().getNbgamewin()+1);
                       }else if(playerWin(playerOne.get().getChoice(), playerTwo.get().getChoice()).equals("AtherMove")) {
                    	   playerTwo.get().setNbgamewin(playerTwo.get().getNbgamewin()+1);
                       } 
	             }

		  }else {
			   playerOne= playerRepository.findById(1L);
	           playerTwo= playerRepository.findById(message.getId());  
	           System.out.println("---- 22::>" );
	           playerTwo.get().setChoice(message.getChoice());
	           if(!playerOne.get().getChoice().equals("") ) {
		  		      System.out.println("----**** ** :: >"+ playerWin(playerOne.get().getChoice(), playerTwo.get().getChoice()));
		  		    if(playerWin(playerTwo.get().getChoice(),playerOne.get().getChoice()).equals("Player1")) {
		  		    	playerTwo.get().setNbgamewin(playerTwo.get().getNbgamewin()+1);
                    }else if(playerWin(playerTwo.get().getChoice(),playerOne.get().getChoice()).equals("AtherMove")) {
                    	playerOne.get().setNbgamewin(playerOne.get().getNbgamewin()+1);
                    } 
	             }
		  }
		  
	     playerRepository.saveAndFlush(playerOne.get());
	     playerRepository.saveAndFlush(playerTwo.get());

		 System.out.println("---- player1 choice::>"+playerOne );
		 System.out.println("---- player2 choice :: >"+ playerTwo );

	  }
	   
	  G1=new GameResult(playerOne.get().getChoice(),true,playerOne.get().getNbgamewin(),playerTwo.get().getChoice(),false,playerTwo.get().getNbgamewin());
 
   // Thread.sleep(1000); // simulated delay
  //  return new Greeting("Hello, "+ HtmlUtils.htmlEscape(message.getName()) + "!");
		 return G1;
  }
  
    
   static String playerWin(String playerMove, String atherMove) {
	   
	   if (playerMove.equals(atherMove)) {
            return ("Tie");
     // if playerMove is ROCK         
	   } else if (playerMove.equals("Rock")) {
        return (atherMove.equals("Paper") ? "AtherMove": "Player1");   
     // if playerMove is PAPER
	   }else if (playerMove.equals("Paper")) {
        return (atherMove.equals("Scissor") ? "AtherMove": "Player1");   
     // if playerMove is SCISSORS    
	   } else {
       return (atherMove.equals("Rock") ? "AtherMove": "Player1");   
	   }
	   
	  
	   
            
	}
  


}