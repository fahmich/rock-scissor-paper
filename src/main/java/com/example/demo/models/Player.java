package com.example.demo.models;

import javax.persistence.*;

@Entity
@Table(name = "Player")
public class Player {
 
		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		private long id;
		@Column(name = "name")
		private String name ;
		@Column(name = "choice")
		private String choice ;
		@Column(name = "nbgamewin")
		private String nbgamewin ;
		
		
	 

		public Player(long id, String name, String choice, String nbgamewin) {
			super();
			this.id = id;
			this.name = name;
			this.choice = choice;
			this.nbgamewin = nbgamewin;
		}
		public Player(long id,   String choice ) {
			super();
			this.id = id; 
			this.choice = choice;
			 
		}

 
		public String getNbgamewin() {
			return nbgamewin;
		}
 
		public void setNbgamewin(String nbgamewin) {
			this.nbgamewin = nbgamewin;
		}
 
		public Player() {
			super();
			// TODO Auto-generated constructor stub
		}
 

		public long getId() {
			return id;
		}
		public void setId(long id) {
			this.id = id;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getChoice() {
			return choice;
		}
		public void setChoice(String choise) {
			this.choice = choise;
		}


		@Override
		public String toString() {
			return "Player [id=" + id + ", name=" + name + ", choice=" + choice + ", nbgamewin=" + nbgamewin + "]";
		}

		 

	 
	 
}
