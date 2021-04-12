// Creating a array for 4 color choices
var buttonColors =["red","blue","green","yellow"];
// Saving game patterns
var gamePattern = [];
// Saving user input
var userClickedPattern = [];
// Game switch
var gameSwitch = true;
// Keeping Level of the gamePattern
var level = 0;
// Game Strat - detecting a key pressed

  $(document).keypress(function (){
    if(gameSwitch){
        nextSequence();
        gameSwitch = false;
    }
  });


// Creating a random number and save the random color
function nextSequence() {
    // resetting user's inputs
    userClickedPattern=[];

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    level += 1;

    $("#level-title").text("level "+ level);

    // play audio
    playSound(randomChosenColor);

}

// dealing with user input

$(".btn").click(function(){

  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  // Animation
  animatePress(userChosenColor);

  // play audio
  playSound(userChosenColor);

  // Checking Answer - checking the last input
  checkAnswer(userClickedPattern.length-1);

});

// Audio function
function playSound(input){
  var audio = new Audio('sounds/'+input+'.mp3');
  audio.play();
}

// When user presses the buttons

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },150);
}

// Checking user inputs
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("correct");
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{ //when user gets wrong
    console.log("Wrong");
    // sound effect
    playSound("wrong");

    $("#level-title").text("Gave over, Enther any key to restart");
    // adding css syles temperary
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    // calling startOver funciton
    startOver()
  }
}

// start over function
function startOver(){
  gameSwitch = true;
  level=0;
  gamePattern=[];
}
