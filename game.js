//initializing arrays and variables
var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern =[];
var level =0;
var started=false;

// start the game
$(document).keydown(function () {

//to check whether the game started or not
  if(!started){

    //to display the level of game
    $("h1").text("Level "+level);

    //to start the game and get started with random pattern
    nextSequence();

    started = true;
  }
});


function nextSequence(){

  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  //to increse the level of game and display it
  level++;
    $("h1").text("Level "+level);

  // to generate a random number between 0-3
  var randomNumber = Math.floor(Math.random()*3);

  //to choose a random color and pushing it in the game pattern array
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // flash animation
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  //to play sound of respective button
  playSound(randomChosenColor);


}

$(".btn").click(function(){

  //to record the ids of the button which user clicks
   var userChosenColor = $(this).attr("id");
   userClickedPattern.push(userChosenColor);

  //to play sound of the respective user chosen button and animate it.
  playSound(userChosenColor);
  animatePress(userChosenColor);

  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);

});

//to play sounds
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

//To animate flash on the button which user clicks
function animatePress(currentColor){

//This will add the pressed class which will add a flash to a button
  $("#"+currentColor).addClass("pressed");

//After a 100 millisecond the pressed class will be removed
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
    }, 100);
}

//to compare the user pattern with the random pattern generated.
function checkAnswer(currentLevel) {

   if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

      console.log("success");

      //to check whether the patter ended or not.
        if (userClickedPattern.length === gamePattern.length){

        //  Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
   }
   else {
     console.log("wrong");

     //play wrong answer song
     playSound("wrong");

    //applying class to the whole body for wrong input
    $("body").addClass("game-over");

    //removing the class again after 200 millisecond
    setTimeout(function () {
    $("body").removeClass("game-over");
    },200);

    //changing h1 title
    $("h1").text("Game Over, Press Any Key to RestartGame Over, Press Any Key to Restart");

    //to restart the game
    startOver();
   }

}

function startOver() {
  level=0;
  gamePattern=[];
  started=false;

}
