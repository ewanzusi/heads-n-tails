/* 
   Author: Emmanuel Wanzusi
   Date file was created: July 2nd, 2022
   Description: File a4.js is an JavaScript file that contains
   JavaScript event handling and DOM manipulation for my index.html file.
 */

window.addEventListener("load", function() {
  wins = 0; // Keeps track of wins.
  losses = 0; // Keeps track of losses.

    document.forms.index_form.addEventListener("submit", function(event) {
        event.preventDefault();

        let userid = document.forms.index_form.userid.value;

        let radioButton = document.forms.index_form.choice.value;


        if ( userid === "" ) {
          changeUserIdField();
          console.log("Alert! Username field has been left blank.");
          errorMessage("Please enter a username.")

        }

        else if(userid.length < 4){
          changeUserIdField()
          console.log("Username is too short. Must be at least 4 letters long.")
          errorMessage("Username is too short. Must be at least 4 letters long.")
        }


        else if(!/^[a-z]+$/i.test(userid)) {
          changeUserIdField()
          console.log("Username can only contain letters, any numbers, special characters, or spaces are not valid.");
          errorMessage("Username can only contain letters, any numbers, special characters, or spaces are not valid.")
        }

        else if(!/^[A-Z]/.test(userid)) {
          console.log("Username must start with a captial letter.");
          errorMessage("Username must start with a captial letter.")
        }

        else if(userid != userid.split('').sort().join('')) {
          changeUserIdField()
          console.log("Each letter in the username must be alphabetically " + 
                        "bigger than the letter before.");
          errorMessage("Each letter in the username must be alphabetically " + 
                       "bigger than the letter before.")              
        }

        else if(userid.length < 4){
          changeUserIdField()
          console.log("Username is too short. Must be at least 4 letters long.")
          errorMessage("Username is too short. Must be at least 4 letters long.")
        }

        else if(userid.length < 4){
          changeUserIdField()
          console.log("Username is too short. Must be at least 4 letters long.")
          errorMessage("Username is too short. Must be at least 4 letters long.")
        }

        else if(userid.length > 8){
          changeUserIdField()
          console.log("Username is too long. Cannot be longer than 8 letters.")
          errorMessage("Username is too long. Cannot be longer than 8 letters.")
        }

        else if(radioButton == ""){
          console.log("User must select either Heads or Tails.")
          errorMessage("Please select either Heads or Tails.")
        }

        else {
            validUserIdField(); 
            console.log(userid + " is playing Heads N' Tails today!") 
            if (radioButton == "heads"){
              console.log("Displays Heads of a coin.")
              showHeads();
              coinFlip("heads");

            }

            else if (radioButton == "tails"){
              console.log("Displays Tails of a coin.")
              showTails();
              coinFlip("tails");

            }

           }     

});
 
  /**
   * Changes username field to the colour the red.
   * 
   */
  function changeUserIdField(){
   console.log("The username provided is not valid." )
  
   let node = document.getElementById("userid");
   node.style.borderColor = "red";
  }  
  
  /**
   * Reverts username field back to normal appearance when a valid username is provided.
   * 
   */
  function validUserIdField(){
    console.log("The username provided is a valid username." )
    
    let node = document.getElementById("userid");
    let msg = document.getElementById("errorMessage");
    node.style.borderColor = "";
    msg.innerHTML = "";
  }

  /**
   * Shows an error message if provided invalid or missing input.
   * 
   * @param message {message} error message  
   */
  function errorMessage(message){
    console.log("Prints error message for user." )
    
    let msg = document.getElementById("errorMessage");
    msg.innerHTML = message;
    msg.style.color = "red";
  }
  
  /**
   * Shows the tails of the coin.
   * 
   */
  function showTails(){

    let pic = document.getElementById("pic");
    pic.src = "tails.jpg";  

  }

  /**
   * Shows the heads of the coin.
   * 
   */
  function showHeads(){

    let pic = document.getElementById("pic");
    pic.src = "heads.jpg";

  }
  
  /**
   * Shows the current wins and losses.
   * 
   * @param score number of wins and losses. 
   */
  function showScore(score){

    let scoreBoard = document.getElementById("score"); 
    scoreBoard.innerHTML = score;
    
  }
  
  /**
   * Shows number of flips and current flip
   * 
   * @param flips number of flips
   */
  function showFlips(flips){

    let flipCount = document.getElementById("flips");
    flipCount.innerHTML = flips;

  }
  
  /**
   * Displays win or lose output message.
   * 
   * @param gameMessage win or lose output message 
   */
  function gameMessage(gameMessage){

    let showGameMessage = document.getElementById("gameMessage");
    showGameMessage.innerHTML = gameMessage;

  }

  /**
   * Shows help button and instructions after it is clicked.
   * 
   */ 
  function helpButton(){

    let help = document.getElementById("help");
    help.style.display = "inline";
    help.addEventListener("click", showInstructions);
    

  }
  
  /**
   * Shows and hides instructions.
   * 
   */
  function showInstructions(){

    let instructions = document.getElementById("instructions");

    if (instructions.style.display === "none"){
      instructions.style.display = "inline-block";

    }

    else {
      instructions.style.display = "none";

    }
    
  }

  
  /**
   * Resets the game and values the user has entered.
   * 
   * @param radioButton radio button selected by user.
   */
  function resetGame(radioButton){
  
    let reset = document.getElementById("submit");
    reset.disabled = false; // Re-enables submit button after game has finished.
    reset.value="Reset Game";
    radioButton.value = "";
    pic.src = "";
    
  }
  
  /**
   * Starts coin flip game.
   * 
   * @param radioButton radio button selected by user.
   */
  function coinFlip(radioButton){

  let submit = document.getElementById("submit"); 
  submit.disabled = true;  // Disables submit button after game has started.
 
  i = 0; // Index variable for pic array
  count = 0; // Keeps count of number of flips

  max = 50; // Maximum number of flips
  min = 10;  // Minimum number of flips

  // Generates random number of flips
  let flips = Math.floor(Math.random() * (max - min + 1)) + min;
  
	pic = ["heads.jpg", "tails.jpg"];
	let pics = document.getElementById("pic");
  let coinFlipperDisplay = setInterval(coinFlipper, 200); // Shows coin flip animation 
   
  /**
   * Shows coin flipping and stops coin flipping.
   * 
   */
	function coinFlipper() {
		pics.src = pic[i];
		i = (i + 1) % pic.length;
    count++ 

    helpButton(); // Shows help button once game has started.
    showFlips("Flips: " + flips + " | Current Flip: " + count); 

    if(count == flips){
      
      clearInterval(coinFlipperDisplay); // Stops coin flip animation
      
      if (radioButton == "heads" && i == 1){ 
        wins++;
        showScore("Wins: " + wins + " Losses: " + losses);
        gameMessage(userid.value + " you guessed heads. You win. Congratulations!");
        resetGame("");

      } 

      else if (radioButton == "heads" && i == 0){
        losses++;
        showScore("Wins: " + wins + " Losses: " + losses);
        gameMessage("Sorry " + userid.value + " you guessed incorrectly. You lose.");
        resetGame("");
        
      }

      else if(radioButton == "tails" && i == 0){
        wins++;
        showScore("Wins: " + wins + " Losses: " + losses);
        gameMessage(userid.value + " you guessed tails. You win. Congratulations!");
        resetGame("");

      }

      else{
        losses++;
        showScore("Wins: " + wins + " Losses: " + losses);
        gameMessage("Sorry " + userid.value + " you guessed incorrectly. You lose.");
        resetGame("");

      }
      }
	}
  

  } 


}); 