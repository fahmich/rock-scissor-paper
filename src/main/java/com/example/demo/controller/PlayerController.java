package com.example.demo.controller;

 
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Player;
import com.example.demo.repository.PlayerRepository;

@RestController
@RequestMapping("/api")
public class PlayerController {

	@Autowired
	PlayerRepository playerRepository;
 
  @GetMapping("/players")
	public ResponseEntity<List<Player>> getAllTutorials() {
//		try {
			List<Player> tutorials = new ArrayList<Player>();
		    playerRepository.findAll().forEach(tutorials::add);
			 System.out.println("-25--->"+tutorials);
			if (tutorials.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(tutorials, HttpStatus.OK);
//		} catch (Exception e) {
//			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//		}
	}

}