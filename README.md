# rock-scissor-paper

#### Technology used
- Java 8 : programming language 
- Spring boot : Web application 
- H2 : In-Memory Database
- Maven : Building project
- JavaScript/Html

#### Web Application configuration 
- Web Application is running on port `8081`
- You can change the configuration in `application.properties`

#### Architectural points and Terminologies used in the project

> Game rules
 - Rock beats Scissors
 - Scissors beats Paper
 - Paper beats Rock

> RESTful API design 
Backend consists RESTful APIs all starts with `/api/v1` because of following reasons:
- Api versioning can be done in future. (followed java principle: Open for extension and closed for modification)


> Design principles used in Project :
- SOLID (single responsibility, open-closed, Liskov subsitution, interface segragation, dependency inversion) principle
- Composition over inheritance
- DRY(Don’t repeat yourself)
- KISS(Keep it simple, stupid)
- and some experience principle ;)  
##### heroku
-heroku login
-cd .../rock-scissor-paper
-git init
-git add .
-git commit -m "first commit"

-git push heroku master
-heroku open
##link::
https://peaceful-hamlet-61719.herokuapp.com/
