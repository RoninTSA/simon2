var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var clicks = 0;

//starting the game, by pressing a key
$(document).keydown(function (e) {  
  if (level === 0) {
    nextSequence();
  }
});

//detecting clicking, storing it in user colors
$(".btn").click(function (e) { 

  if (level != 0) {
    var userChosenColor = e.target.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(clicks, level);
  clicks++; 
  }
  
});

//function that will generate new patterns
function nextSequence() {

  var randomNumber = Math.floor(Math.random()*4); //0-3
  var randomChosenColor = buttonColors[randomNumber]; //red blue green yellow

  level++; //update level
  userClickedPattern = []; //resetting answer
  clicks = 0;
  $("h1").text("Level " + level) //update header with level
  gamePattern.push(randomChosenColor); //record generated pattern
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //animation
  playSound(randomChosenColor); //sound

};

//checking if answer is correct
function checkAnswer (current, currentLevel) {

  if (userClickedPattern[clicks] == gamePattern[current]) {
    console.log("correct u:" + userClickedPattern[current] + " c: " + gamePattern[current])
  
    if (current + 1 === currentLevel) {
        setTimeout(function(){
          nextSequence();
        }, 1000);
      }
    }

  else {
    console.log("wrong u:" + userClickedPattern[current] + " c: " + gamePattern[current])
    startOver();
  }
  
};

//playing sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); //match name
  audio.play();
}

//press animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed"); //match name
  setTimeout(function() { //animation delay
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

//restart
function startOver() {

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 1000);
    
    $("h1").text("Game over, press a key to restart");
    level = 0;
    gamePattern = [];

}

