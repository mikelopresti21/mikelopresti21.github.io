
var sequence = [];
var score = sequence.length;
var sound = new Audio("../sounds/quick_beep.wav");
var wrongSound = new Audio("../sounds/error_sound.wav");  
var completeSound = new Audio("../sounds/correct.mp3")
var clicks = -1;
var highscore = 0;
var speed = 400;
var hard = document.querySelector(".difficulty__hard");
var medium = document.querySelector(".difficulty__medium");
var easy = document.querySelector(".difficulty__easy");
var btns = document.querySelectorAll(".game__btn");
var soundOn = document.querySelector(".sound__on");
var soundOff = document.querySelector(".sound__off");
var addBtn = document.querySelector(".add-btn");
var delBtn = document.querySelector(".remove-btn");

for (let i = 0; i < btns.length; i++){
    addBtnListener(btns[i]);
}

soundOn.addEventListener("click", function(){
    soundOn.classList.toggle("sound-active");
    soundOff.classList.toggle("sound-active");
    completeSound = new Audio()
    sound = new Audio();
    wrongSound = new Audio();
});

soundOff.addEventListener("click", function(){
    soundOn.classList.toggle("sound-active");
    soundOff.classList.toggle("sound-active");
    completeSound = new Audio("../sounds/correct.mp3")
    sound = new Audio("../sounds/quick_beep.wav");
    wrongSound = new Audio("../sounds/error_sound.wav");
});

hard.addEventListener("click", function(){
    hard.classList.add("active-difficulty");
    medium.classList.remove("active-difficulty");
    easy.classList.remove("active-difficulty");
    speed = 200;
    reset();
});

medium.addEventListener("click", function(){
    medium.classList.add("active-difficulty");
    hard.classList.remove("active-difficulty");
    easy.classList.remove("active-difficulty");
    speed = 400;
    reset();
});

easy.addEventListener("click", function(){
    easy.classList.add("active-difficulty");
    medium.classList.remove("active-difficulty");
    hard.classList.remove("active-difficulty");
    speed = 800;
    reset();
});


document.addEventListener("keydown", function(event){
    if (clicks++ == -1 && event.keyCode == 32){
            addToSequence();
            playSequence();
            document.querySelector(".start__message").innerHTML = "Press 'R' to restart";
        }
});

document.addEventListener("keydown", function(event){
    if (event.key == 'r'){
            reset();
        }
});

function backgroundFlash(){
    document.querySelector("body").classList.add("background-flash");
    setTimeout(function(){
        document.querySelector("body").classList.remove("background-flash");
    }, 500);
}

function flash(element){
    element.classList.add("pressed");
    setTimeout(function () {
        element.classList.remove("pressed");
    }, 200);
}

function playSequence(){
    let i = 0;
    playNext(i);
}

function start(){
    if (clicks++ == -1){
        addToSequence();
        playSequence();
        document.querySelector(".start__message").innerHTML = "Press 'R' to restart";
    }
}

function playNext(i){

        sequence[i].classList.add("pressed");
        sound.play();
        
        setTimeout(function(){
            sequence[i].classList.remove("pressed");
                setTimeout(function(){   
                    if (i < sequence.length){
                        playNext(++i);
                    }
                }, speed);
        }, speed);
    }


function addToSequence(){
    let x = Math.floor(Math.random() * btns.length);
    sequence.push(btns[x]);
    if (score > highscore) {
        highscore = score;
        document.querySelector(".highscore").innerHTML = "Highscore: " + highscore;
    }
    document.querySelector(".score").innerHTML = "Score: " + score++;
}

function reset(){
    clicks = -1;
    sequence = [];
    score = 0;
    for (let i = 0; i < btns.length; i++){
        btns[i].classList.remove("pressed");
    }
    document.querySelector(".score").innerHTML = "Score: " + score;
    document.querySelector(".start__message").innerHTML = "Press the Space Bar to Start";
}


document.addEventListener("keydown", function(event){
    if (event.key === 'a' && btns.length < 8){
        var newBtn = document.createElement("div");
        newBtn.classList.add("game__btn");
        document.querySelector(".simon__container").appendChild(newBtn);
        addBtnListener(newBtn);
        btns = document.querySelectorAll(".game__btn");

        let color = "";

        switch (btns.length){
            case 5:
                color = "purple";
                break;
            case 6:
                color = "orange";
                break;
            case 7:
                color = "aqua";
                break;
            case 8:
                color = "white";
                break;
        }

        newBtn.style.backgroundColor = color;
        reset();
    }
});

document.addEventListener("keydown", function(event){
    if (event.key === 'd' && btns.length > 4){
        var remove = document.querySelector(".simon__container").lastChild;
        document.querySelector(".simon__container").removeChild(remove);
        btns = document.querySelectorAll(".game__btn");
        reset();
    }
});

addBtn.addEventListener("click", function(){
    
    if (btns.length < 8){
        var newBtn = document.createElement("div");
        newBtn.classList.add("game__btn");
        document.querySelector(".simon__container").appendChild(newBtn);
        addBtnListener(newBtn);
        btns = document.querySelectorAll(".game__btn");

        let color = "";

        switch (btns.length){
            case 5:
                color = "purple";
                break;
            case 6:
                color = "orange";
                break;
            case 7:
                color = "aqua";
                break;
            case 8:
                color = "white";
                break;
        }

        newBtn.style.backgroundColor = color;
        reset();
    }
});

delBtn.addEventListener("click", function(event){
    if (btns.length > 4){
        var remove = document.querySelector(".simon__container").lastChild;
        document.querySelector(".simon__container").removeChild(remove);
        btns = document.querySelectorAll(".game__btn");
        reset();
    }
});

function addBtnListener(btn){

    btn.addEventListener("click", function(event){
        
        if (clicks == -1){ return;}  

        if (event.currentTarget == sequence[clicks++]){
            flash(btn);   
            
            if (clicks == sequence.length){
                 completeSound.play();
            }

            setTimeout(function(){
                if (clicks >= sequence.length){
                    clicks = 0;
                    addToSequence();
                    playSequence();
                }
            }, 1500);
        }else{
            wrongSound.play();
            backgroundFlash(); 
            reset();
        }
    }); 
}