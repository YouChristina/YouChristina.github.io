/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var BOARD_WIDTH = 440;
  var BOARD_HEIGHT = 440;
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
    "W": 87,
    "A": 65,
    "S": 83,
    "D": 68
  }
  
  // Game Item Objects
  var positionX = 0;
  var positionY = 0;
  var speedX = 0;
  var speedY = 0;

  var positionX2 = 390;
  var positionY2 = 390;
  var speedX2 = 0;
  var speedY2 = 0;

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
    repositionGameItem();
    if (positionX > BOARD_WIDTH-50) {
      speedX = 0;
    } else if (positionX < 0) {
      speedX = 0;
    }
    if (positionY > BOARD_HEIGHT-50){
      speedY = 0;
    } else if (positionY < 0){
      speedY = 0;
    }
    redrawGameItem();

    repositionGameItemTwo();
    if (positionX2 > BOARD_WIDTH-50) {
      speedX2 = 0;
    } else if (positionX2 < 0) {
      speedX2 = 0;
    }
    if (positionY2 > BOARD_HEIGHT-50){
      speedY2 = 0;
    } else if (positionY2 < 0){
      speedY2 = 0;
    }
    redrawGameItemTwo();
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      speedX = -5;
      speedY = 0;
      console.log("left pressed");
    }
    if (event.which === KEY.UP) {
      speedY = -5;
      speedX = 0;
      console.log("up pressed");
    }
    if (event.which === KEY.RIGHT) {
      speedX = 5;
      speedY = 0;
      console.log("right pressed");
    }
    if (event.which === KEY.DOWN) {
      speedY = 5;
      speedX = 0;
      console.log("down pressed");
    }

    if (event.which === KEY.A) {
      speedX2 = -5;
      speedY2 = 0;
      console.log("a pressed");
    }
    if (event.which === KEY.W) {
      speedY2 = -5;
      speedX2 = 0;
      console.log("w pressed");
    }
    if (event.which === KEY.D) {
      speedX2 = 5;
      speedY2 = 0;
      console.log("d pressed");
    }
    if (event.which === KEY.S) {
      speedY2 = 5;
      speedX2 = 0;
      console.log("s pressed");
    }
  }

  function repositionGameItem(){
    positionX += speedX;
    positionY += speedY;
  }

  function repositionGameItemTwo(){
    positionX2 += speedX2;
    positionY2 += speedY2;
  }

  function redrawGameItem(){
    $("#gameItem").css("left", positionX);
    $("#gameItem").css("top", positionY);
  }
  
  function redrawGameItemTwo(){
    $("#gameItemTwo").css("left", positionX2);
    $("#gameItemTwo").css("top", positionY2);
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
