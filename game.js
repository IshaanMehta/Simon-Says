var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).keydown(function(){
    if(!started){
      $("#level-title").text("Level : "+level);
      nextSequence();
      started = true;
    }
});

function nextSequence(){
  userClickedPattern = [];

  level++;

  $("#level-title").text("Level : "+level);

  randomNumber = Math.floor(Math.random()*4);
  // return randomNumber;
  var randomChosenColor = buttonColors[randomNumber];
  // return randomChosenColor;
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

/*detecting button click*/
$(".btn-game").click(function(){
  var userChosenColor = $(this).attr("id");
  // console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  // console.log(userClickedPattern.length-1);
  checkAnswer(userClickedPattern.length-1);
});


/*sound generator*/
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

/* animation generator */
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed");
    }, 100);
}

/*restart*/
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}


/*simon logic - answer check*/
function checkAnswer(currentLevel){
  // console.log(currentLevel);

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");

      if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
          }, 1000);
      }
  }
  else{
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}
