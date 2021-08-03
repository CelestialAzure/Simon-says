var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//*********** Audio **************************//

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//*********** Animate ************************//
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

//*************** Start Over **********************//
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// ******** System randomly selects tiles *********//

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenNumber = buttonColours[randomNumber];
  gamePattern.push(randomChosenNumber);
  playSound(randomChosenNumber);
  $("#" + randomChosenNumber).fadeOut(250).fadeIn(250);


  $("#level-title").text("Level " + level);
  level++;
}

//************** Starting key **************//


$(document).keypress(function() {
  while (!started) {
    nextSequence();
    started = true;
  }

});
//************************ check Answer *************//
function checkAnswer(currentItem) {
  if (gamePattern[currentItem] == userClickedPattern[currentItem]) {
    console.log("success");

    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var audioOver = new Audio("sounds/wrong.mp3");
    audioOver.play();
    $("#level-title").text("Game Over, Press Any Key to Restart");

    $('body').addClass("game-over");
    setTimeout(function() {
      $('body').removeClass("game-over");
    }, 200);
    startOver();


  }

}



// ********** User clicks tiles ***************//

$(".btn").click(function(event) {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
