package com.example.demo.models;

 
public class GameResult {

  private String playerOneChoice;
  private Boolean playerOneResult;
  private long winGameplayerOneResult;
  
  private String playerTwoChoice;
  private Boolean playerTwoResult;
  private long winGameplayerTwoResult;
  
public String getPlayerOneChoice() {
	return playerOneChoice;
}
public void setPlayerOneChoice(String playerOneChoice) {
	this.playerOneChoice = playerOneChoice;
}
public Boolean getPlayerOneResult() {
	return playerOneResult;
}
public void setPlayerOneResult(Boolean playerOneResult) {
	this.playerOneResult = playerOneResult;
}
public long getWinGameplayerOneResult() {
	return winGameplayerOneResult;
}
public void setWinGameplayerOneResult(long winGameplayerOneResult) {
	this.winGameplayerOneResult = winGameplayerOneResult;
}
public String getPlayerTwoChoice() {
	return playerTwoChoice;
}
public void setPlayerTwoChoice(String playerTwoChoice) {
	this.playerTwoChoice = playerTwoChoice;
}
public Boolean getPlayerTwoResult() {
	return playerTwoResult;
}
public void setPlayerTwoResult(Boolean playerTwoResult) {
	this.playerTwoResult = playerTwoResult;
}
public long getWinGameplayerTwoResult() {
	return winGameplayerTwoResult;
}
public void setWinGameplayerTwoResult(long winGameplayerTwoResult) {
	this.winGameplayerTwoResult = winGameplayerTwoResult;
}
public GameResult(String playerOneChoice, Boolean playerOneResult, long winGameplayerOneResult, String playerTwoChoice,
		Boolean playerTwoResult, long winGameplayerTwoResult) {
	super();
	this.playerOneChoice = playerOneChoice;
	this.playerOneResult = playerOneResult;
	this.winGameplayerOneResult = winGameplayerOneResult;
	
	this.playerTwoChoice = playerTwoChoice;
	this.playerTwoResult = playerTwoResult;
	this.winGameplayerTwoResult = winGameplayerTwoResult;
}
public GameResult() {
	super();
	// TODO Auto-generated constructor stub
}
@Override
public String toString() {
	return "GameResult [playerOneChoice=" + playerOneChoice + ", playerOneResult=" + playerOneResult
			+ ", winGameplayerOneResult=" + winGameplayerOneResult + ", playerTwoChoice=" + playerTwoChoice
			+ ", playerTwoResult=" + playerTwoResult + ", winGameplayerTwoResult=" + winGameplayerTwoResult + "]";
}
  
   
}
