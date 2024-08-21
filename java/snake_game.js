var cells = document.querySelectorAll(".snake__cell");
var food1 = document.createElement("div");
var food2 = document.createElement("div");
var food3 = document.createElement("div");
food1.classList.add("snake__food");
food2.classList.add("snake__food");
food3.classList.add("snake__food");
food1.classList.add("food1");
food2.classList.add("food2");
food3.classList.add("food3");
var food = [food1, food2, food3];
var snake = [];
var speed = 200;
var movement = setInterval(moveRight, speed);
var direction;
var score = 0;
var highscore = 0;
var hard = document.querySelector(".difficulty__hard");
var medium = document.querySelector(".difficulty__medium");
var easy = document.querySelector(".difficulty__easy");
var soundOn = document.querySelector(".sound__on");
var soundOff = document.querySelector(".sound__off");
var bite = new Audio("../sounds/apple_bite.mp3")

// Start Game
document.addEventListener("keydown", function(event){
    if (event.keyCode == 32 && snake.length < 2){
        startGame();
        document.querySelector(".start__message").innerHTML = "Press 'R' to restart";
    }
})  

function startGame() {
    initializeFood(); 
    initializeSnake();
}

function initializeFood(){
    addFood();
    addFood();
    addFood();
}

function initializeSnake(){
    snake = [1,0];
    cells[snake[0]].classList.add("snake__body");
    cells[snake[1]].classList.add("snake__body"); 
}

//Replace eaten food
function addFood(){
    setTimeout (function(){
        var curFood = food1;
        for (let i = 0; i < food.length; i++){
            curFood = food[i];
            if (curFood.parentElement == null){
                break;
            }
        }

        let x = Math.floor(Math.random() * cells.length);
        while (cells[x].hasChildNodes() || cells[x].classList.contains("snake__body")){
            x = Math.floor(Math.random() * cells.length);
        }

        cells[x].appendChild(curFood);
    }, 1000);
}


// Add arrow controls
document.addEventListener("keydown", function(event){
    if (event.key == "ArrowUp" && direction != "down"){
        direction = "up";
        clearInterval(movement);
        movement = setInterval(function(){
            moveUp();
        }, speed);
    }
});

document.addEventListener("keydown", function(event){
    if (event.key == "ArrowDown" && direction != "up"){
        direction = "down";
        clearInterval(movement);
        movement = setInterval(function(){
            moveDown();
        }, speed);
    }
});

document.addEventListener("keydown", function(event){
    if (event.key == "ArrowLeft" && direction != "right"){
        direction = "left";
        clearInterval(movement);
        movement = setInterval(function(){
            moveLeft();
        }, speed);
    }
});


document.addEventListener("keydown", function(event){
    if (event.key == "ArrowRight" && direction != "left"){
        direction = "right";
        clearInterval(movement);
        movement = setInterval(function(){
            moveRight();
        }, speed);
    }
});


// Snake movement
function moveUp(){
    let temp = snake[0];

    if (snake[0] < 10){
        snake[0] = snake[0] + 90;
    }else{
        snake[0] = snake[0] - 10;
    }

    checkCell();

    cells[snake[0]].classList.add("snake__body");
    cells[snake[snake.length - 1]].classList.remove("snake__body");
    
    if (snake.length == 2){
        snake[snake.length - 1] = temp;
    } else {
        let i = 1;
        while (i < snake.length){
            let t2 = snake[i];
            snake[i] = temp;
            temp = t2;
            i++;
        }
    }
}

function moveDown(){
    let temp = snake[0];

    if (snake[0] >= 90){
        snake[0] = snake[0] % 10;
    }else{
        snake[0] = snake[0] + 10;
    }

    checkCell();

    cells[snake[0]].classList.add("snake__body");
    cells[snake[snake.length - 1]].classList.remove("snake__body");
    
    if (snake.length == 2){
        snake[snake.length - 1] = temp;
    } else {
        let i = 1;
        while (i < snake.length){
            let t2 = snake[i];
            snake[i] = temp;
            temp = t2;
            i++;
        }
    }
}

function moveLeft(){

    let temp = snake[0];

    snake[0] = snake[0] -1;
    if (snake[0] % 10 == 9 || snake[0] < 0){
        snake[0] = snake[0] + 10;
    }

    checkCell();

    cells[snake[0]].classList.add("snake__body");
    cells[snake[snake.length - 1]].classList.remove("snake__body");
    
    if (snake.length == 2){
        snake[snake.length - 1] = temp;
    } else {
        let i = 1;
        while (i < snake.length){
            let t2 = snake[i];
            snake[i] = temp;
            temp = t2;
            i++;
        }
    }
}

function moveRight(){

    let temp =  snake[0];

    snake[0] = snake[0] + 1;
    if (snake[0] % 10 == 0){
        snake[0] = snake[0] - 10;
    }

    checkCell();

    cells[snake[0]].classList.add("snake__body");
    cells[snake[snake.length - 1]].classList.remove("snake__body");
    
    if (snake.length == 2){
        snake[snake.length - 1] = temp;
    } else {
        let i = 1;
        while (i < snake.length){
            let t2 = snake[i];
            snake[i] = temp;
            temp = t2;
            i++;
        }
    }
}

//Reset
document.addEventListener("keydown", function(event){
    if (event.key == 'r'){
            reset();
        }
});

function reset(){
    score = 0;
    document.querySelector(".score").innerHTML = "Score: " + score;
    document.querySelector(".start__message").innerHTML = "Press the Space Bar to Start";
    snake = [];
    clearInterval(movement);
    movement = setInterval(moveRight, speed);
    for (let i = 0; i < cells.length; i++){
        if (cells[i].hasChildNodes()){
            cells[i].removeChild(cells[i].firstChild);
        }
        if (cells[i].classList.contains("snake__body")){
            cells[i].classList.remove("snake__body");
        }
    }
}


function checkCell(){
    if (cells[snake[0]].classList.contains("snake__body")){
        reset();
    }

    if (cells[snake[0]].hasChildNodes()){
        bite.play();
        cells[snake[0]].removeChild(cells[snake[0]].lastChild);
        score = score + 10;
        if (score > highscore) {
            highscore = score;
            document.querySelector(".highscore").innerHTML = "Highscore: " + highscore;
        }
        document.querySelector(".score").innerHTML = "Score: " + score;
        addFood();
        grow();
    }
}

function grow(){
    snake.push(snake[snake.length - 1]);
}

//Control Panel
hard.addEventListener("click", function(){
    hard.classList.add("active-difficulty");
    medium.classList.remove("active-difficulty");
    easy.classList.remove("active-difficulty");
    speed = 100;
    reset();
});

medium.addEventListener("click", function(){
    medium.classList.add("active-difficulty");
    hard.classList.remove("active-difficulty");
    easy.classList.remove("active-difficulty");
    speed = 200;
    reset();
});

easy.addEventListener("click", function(){
    easy.classList.add("active-difficulty");
    medium.classList.remove("active-difficulty");
    hard.classList.remove("active-difficulty");
    speed = 300;
    reset();
});


soundOn.addEventListener("click", function(){
    soundOn.classList.toggle("sound-active");
    soundOff.classList.toggle("sound-active");
    bite = new Audio();
});

soundOff.addEventListener("click", function(){
    soundOn.classList.toggle("sound-active");
    soundOff.classList.toggle("sound-active");
    bite = new Audio("../sounds/apple_bite.mp3");
});