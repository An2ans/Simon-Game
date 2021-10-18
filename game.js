const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isGameStarted = false;
var level = 0;


document.addEventListener("keypress", startGame);

function startGame() {
  if (!isGameStarted) {
    $("#level-title").html("Level " + level);
    isGameStarted = true;
    nextSequence();
  }
}

function nextSequence() {

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);


  console.log(randomChosenColour);
  console.log(gamePattern);
  console.log(userClickedPattern);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("right!");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }


  } else {
    console.log("wrong!");
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    $("body").toggleClass("game-over");
    setTimeout(function() {
      $("body").toggleClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  isGameStarted = false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


function animatePress(currentColour) {
  $("#" + currentColour).toggleClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).toggleClass("pressed");
  }, 100);
}
