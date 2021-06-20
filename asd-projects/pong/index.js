/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var BOARD_HEIGHT = 500;
  var BOARD_WIDTH = 800;
  var PLAYER_HEIGHT = 80;
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  // Corresponding key numbers for keydown events
  var KEY = {
    "UP": 38,
    "DOWN": 40,
    "W": 87,
    "S": 83
  }
  
  // Game Item Objects
  // Create objects for players (One and Two)
  function playerProperties($id){
    var properties = {};
    properties.id = $id;
    properties.speedY = 0;
    properties.positionX = parseFloat($($id).css('left'));
    properties.positionY = parseFloat($($id).css('top'));
    properties.width = parseFloat($($id).css('width'));
    properties.height = parseFloat($($id).css('height'));
    return properties;
  }

  var playerOne = playerProperties("#playerOne");
  var playerTwo = playerProperties("#playerTwo");
  
  // Create objects for ball
  function ballProperties($id){
    var properties = {};
    properties.id = $id;
    properties.positionX = parseFloat($($id).css('left'));
    properties.positionY = parseFloat($($id).css('top'));
    properties.radius = parseFloat($($id).css('width')) / 2;
    properties.speed = 5;
    properties.moveX = Math.round(Math.random()) * 2 - 1;
    properties.moveY = Math.round(Math.random()) * 2 - 1;
    return properties;
  }

  var ball = ballProperties("#ball");

  // Create properties for the scoreboard
  function scoreboardProperties($id){
    var properties = {};
    properties.id = $id;
    properties.score = 0;
    return properties;
  }

  var scoreboardOne = scoreboardProperties("#scoreboardOne");
  var scoreboardTwo = scoreboardProperties("#scoreboardTwo");

  // Display numbers for score
  function displayScore(player){
    $(player.id).append($("<center>").text(player.score));
  }

  displayScore(scoreboardOne);
  displayScore(scoreboardTwo);
  
  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionBall();
    detectCollide();
    redrawBall();
    repositionPlayer();
    // Stop player paddles from going off the board
    if (playerOne.positionY > BOARD_HEIGHT - PLAYER_HEIGHT){
      playerOne.speedY = 0;
    } else if (playerOne.positionY < 0){
      playerOne.speedY = 0;
    }
    if (playerTwo.positionY > BOARD_HEIGHT - PLAYER_HEIGHT){
      playerTwo.speedY = 0;
    } else if (playerTwo.positionY < 0){
      playerTwo.speedY = 0;
    }
    redrawPlayer();
  }
  
  /* 
  Called in response to events.
  */
  // Key controls for players to move paddles up and down
  function handleKeyDown(event) {
    if (event.which === KEY.W) {
      playerOne.speedY = -5;
      playerOne.speedX = 0;
      console.log("key w");
    }
    if (event.which === KEY.S) {
      playerOne.speedY = 5;
      playerOne.speedX = 0;
      console.log("key s");
    }
    if (event.which === KEY.UP) {
      playerTwo.speedY = -5;
      playerTwo.speedX = 0;
      console.log("key up");
    }
    if (event.which === KEY.DOWN) {
      playerTwo.speedY = 5;
      playerTwo.speedX = 0;
      console.log("key down");
    }
  }

  // Make player move
  function repositionPlayer(){
    playerOne.positionY += playerOne.speedY;
    playerTwo.positionY += playerTwo.speedY;
  }

  // Update player paddle with new coordinates
  function redrawPlayer(){
    $("#playerOne").css("top", playerOne.positionY);
    $("#playerTwo").css("top", playerTwo.positionY);
  }

  // Make ball move
  function repositionBall() {
    ball.positionX += (ball.moveX * ball.speed);
    ball.positionY += (ball.moveY * ball.speed);
  }

  // Update ball with new coordinates
  function redrawBall() {
    $("#ball").css("left", ball.positionX);
    $("#ball").css("top", ball.positionY);
  }

  // Move ball to the center of the board for after scoring
  function resetBall() {
    ball.positionX = 395;
    ball.positionY = 225;
  }

  // Bounce the ball off walls and paddles
  function detectCollide() {
    if (ball.positionY + ball.radius >= BOARD_HEIGHT || ball.positionY - ball.radius <= 0) {
      ball.moveY = -ball.moveY;
    }
    if (ball.positionX + ball.radius >= BOARD_WIDTH) {
      resetBall();
      scoreboardOne.score += 1;
      displayScore(scoreboardOne);
      if (scoreboardOne.score === 11) {
        endGame();
      }
    }
    if (ball.positionX - ball.radius <= 0) {
      resetBall();
      scoreboardTwo.score += 1;
      displayScore(scoreboardTwo);
      if (scoreboardTwo.score === 11) {
        endGame();
      }
    }
    if (ball.positionX <= (playerOne.positionX + playerOne.width) && playerOne.positionX <= (ball.positionX + ball.radius) && ball.positionY <= (playerOne.positionY + playerOne.height) && playerOne.positionY <= (ball.positionY + ball.radius)){
      ball.moveX = -ball.moveX;
    }
    if (ball.positionX <= (playerTwo.positionX + playerTwo.width) && playerTwo.positionX <= (ball.positionX + ball.radius) && ball.positionY <= (playerTwo.positionY + playerTwo.height) && playerTwo.positionY <= (ball.positionY + ball.radius)){
      ball.moveX = -ball.moveX;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
