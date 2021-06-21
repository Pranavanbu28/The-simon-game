var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userChosenPattern=[];
function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenClr = buttonColors[randomNumber];
    gamePattern.push(randomChosenClr);
     console.log(gamePattern);
    $(`#${randomChosenClr}`).fadeOut(100).fadeIn(100)
    
    playSound(randomChosenClr);
    level=level+1;
    $("h1").text(`Level ${level}`);
}







$(".btn").click(function(event){
    var userChosenColor = $(this).attr("id");
    userChosenPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor)
    var lastindex = (userChosenPattern.length)-1;
    checkAnswer(lastindex);
    // var userChosenColor = event.target.id; My own method
    // userChosenPattern.push(userChosenColor);
    console.log(userChosenPattern);
})


function playSound(name){
    var audioclick = new Audio(`sounds/${name}.mp3`);
    audioclick.play();
}
function animatePress(currentColor){
    $(`#${currentColor}`).addClass("pressed")
    setTimeout(() => {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);

}

//game starting
var level = 0;
$(document).keydown(function(){
    
    $("h1").text("Level 0");
    nextSequence();
})

function checkAnswer(lastColor){
    // console.log(gamePattern);
    // console.log(userChosenPattern);
    if(userChosenPattern[lastColor]===gamePattern[lastColor]){
         console.log("success");
        if(userChosenPattern.length===gamePattern.length){
            setTimeout(() => {
                nextSequence();
                userChosenPattern=[];
            }, 1000);
        }
    }
    
    else{
        $("body").addClass("game-over");
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart")
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
    
}
function startOver(){
    gamePattern = [];
    userChosenPattern=[];
    level=0;
}