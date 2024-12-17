let btncolors = ["green","red","yellow","blue"];
let currentseq = [];
let userseq = [];
var started = false;
var level = 0;
var highscore = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level : "+level);
        nextsequence();
        started = true;
    }
})

function nextsequence(){
    userseq=[];
    level++;
    highscore = max(highscore,level);
    let randomnum = Math.floor(Math.random()*4);
    let randcolor = btncolors[randomnum];
    currentseq.push(randcolor);
    $("#level-title").text("Level : "+level);
    $("#"+randcolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randcolor);
}


$(".btn").click(function(){
    let colorchoosen = $(this).attr("id");
    userseq.push(colorchoosen);
    playsound(colorchoosen);
    animatePress(colorchoosen);
    checkans(userseq.length-1);
});

function animatePress(colorchoosen){
    $("#"+colorchoosen).addClass("pressed");
    setTimeout(function () {
        $("#" + colorchoosen).removeClass("pressed");
      }, 100);
}

function playsound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function checkans(length){
    let gameover = false;
    if((userseq[length]===currentseq[length])){
        if(userseq.length==currentseq.length){
            setTimeout(function(){
                nextsequence();
            },1000);
        }
    }
    else{
        gameoverfunc();
    }
}

function gameoverfunc(){
    currentseq = [];
    started = false;
    level = 0;
    $("#level-title").text("Game Over Press any key to Restart");
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h2").text("High Score :"+highscore);
}

function max(x,y){
    if(x>y){
        return x;
    }
    return y;
}