var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var ifStart = false;
var level = 0;

$(document).on("keydown", function() {
  if (!ifStart){
    $('#level-title').text('Level  ' + level);
      nextSequence();
      ifStart = true;
     }

  });

  $(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

   });


function nextSequence(){
  userClickedPattern= [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $('#'+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  var chosenSound = new Audio('sounds/' + randomChosenColour + '.mp3');
  chosenSound.play();
  $('#level-title').text('Level  ' + level);
}

function checkAnswer(currentLevel){

   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
     if (userClickedPattern.length === gamePattern.length){
         setTimeout(function(){
           nextSequence();
         }, 1000);
     }
   }  else {
       var wrongSound = new Audio('sounds/wrong.mp3');
       wrongSound.play();
       $('body').addClass('game-over');
       $('#level-title').text('Game Over, Press Any Key to Restart');

       setTimeout(function (){
        $('body').removeClass("game-over")
      },200);
        startOver();
     }
   }

function playSound(name) {
  var sound = new Audio('sounds/' + name + '.mp3');
  sound.play()
}

function animatePress(currentColor){
   $('#' + currentColor).addClass("pressed");
   setTimeout(function (){
    $("#"+ currentColor).removeClass("pressed")
    },100)
};

function startOver() {
  level = 0;
  gamePattern = [];
  ifStart = false;
}
