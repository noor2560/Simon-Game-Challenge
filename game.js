var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;


$(document).keydown(function() {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
});


$(".btn").click(function() {
    
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);

    // console.log(userClickedPattern);
});



function nextSequence(){

    userClickedPattern=[];

    level++;
    $("#level-title").text("Level " + level);


    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor= buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
        }, 1000);
        }
    }
    else{
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass(".game-over");
  
        setTimeout(function() {
          $("body").removeClass(".game-over");
        }, 200);
        $("#level-title").text("Game over. Press any key to restart");
        restart();
        // console.log("wrong");
    }
}
function restart(){
    level=0;
    started=false;
    gamePattern=[];
  }
  

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed")}, 100);
}
