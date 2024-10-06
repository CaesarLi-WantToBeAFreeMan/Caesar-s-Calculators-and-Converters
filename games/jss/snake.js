const canvas = document.querySelector("#canvas"),
      ctx = canvas.getContext("2d"),
      unit = 15,
      width = canvas.width / unit,
      height = canvas.height / unit,
      Pointer = function(x, y){
	  this.x = x;
	  this.y = y;
      },
      title = document.querySelector("#titleText"),
      up = document.querySelector("#upSb"),
      down = document.querySelector("#downSb"),
      left = document.querySelector("#leftSb"),
      right = document.querySelector("#rightSb"),
      score = document.querySelector("#score"),
      resetBtn = document.querySelector("#resetBtn"),
      rankName = document.querySelector("#rankName"),
      rankScore = document.querySelector("#rankScore"),
      rankOccupationPercentage = document.querySelector("#rankOccupationPercentage"),
      occupation = document.querySelector("#occupation");

let length, stop, move, xVelocity, yVelocity, food = [], snake = [],
    ScoreData = {
      name: "unknown",
      score: 0
    };

window.addEventListener("keydown", changeDirection);

up.addEventListener("click", () => {
    xVelocity = 0;
    yVelocity = -unit;
})

down.addEventListener("click", () => {
    xVelocity = 0;
    yVelocity = unit;
})

left.addEventListener("click", () => {
    xVelocity = -unit;
    yVelocity = 0;
})

right.addEventListener("click", () => {
    xVelocity = unit;
    yVelocity = 0;
})

resetBtn.addEventListener("click", () => {
    initial();
})

initial();

function initial(){
    while(food.length)
	food.pop();
    food = new Pointer(0, 0);
    while(snake.length)
	snake.pop();
    for(let i = 0; i < 3; i++)
	snake.unshift(new Pointer(unit * i, 0));
    move = null;
    stop = false;
    length = 3;
    xVelocity = unit;
    yVelocity = 0;
    score.textContent = `length: ${length}`;
    occupation.textContent = `occupation percentage: ${Math.floor(length / width / height * 100)}%`;

    updateRank();

    createFood();
    drawFood();
    drawSnake();
    snakeMove();
}

function createFood(){
    food.x = Math.floor(Math.random() * width) * unit;
    food.y = Math.floor(Math.random() * height) * unit;
}

function drawFood(){
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, unit, unit);
}

function drawSnake(){
    ctx.fillStyle = "forestgreen";
    ctx.strokeStyle = "black";
    snake.forEach(element => {
	ctx.fillRect(element.x, element.y, unit, unit);
	ctx.strokeRect(element.x, element.y, unit, unit);
    })
}

function drawGameover(){
    ctx.fillStyle = "darkgray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "35px Courier New";
    ctx.textAlign = "center";
    ctx.fillStyle = "red";
    ctx.fillText("G A M E O V E R", canvas.width / 2, canvas.height / 2);
}

function snakeMove(){
	move = setInterval(() => {
	    if(!stop){
		snake.unshift(new Pointer(snake [0].x + xVelocity, snake [0].y + yVelocity));
		if(checkGameover())
		    stop = true;
		else if (snake [0].x == food.x && snake [0].y == food.y){
		    createFood();
		    score.textContent = `length: ${++length}`;
		    updateOccupyPercentage();
		}else
		    snake.pop();

		clearCanvas();
		drawFood();
		drawSnake();
	    }

	    else{
		drawGameover();
		uploadScore();
		clearInterval(move);
	    }
	}, 120)
}

function changeDirection(press){
    const key = press.keyCode;
    switch(key){
	case 38:
	case 87:
	case 75:
	    xVelocity = 0;
	    yVelocity = -unit;
	    break;
	case 40:
	case 83:
	case 74:
	    xVelocity = 0;
	    yVelocity = unit;
	    break;
	case 37:
	case 65:
	case 72:
	    xVelocity = -unit;
	    yVelocity = 0;
	    break;
	case 39:
	case 68:
	case 76:
	    xVelocity = unit;
	    yVelocity = 0;
	    break;
    }
}

function clearCanvas(){
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function checkGameover(){
    if(snake [0].x < 0 || snake [0].x >= canvas.width - unit)
	return true;
    if(snake [0].y < 0 || snake [0].y >= canvas.height - unit)
	return true;
    for(let i = 1; i < snake.length; i++)
	if(snake [i].x == snake [0].x && snake [i].y == snake [0].y)
	    return true;
    return false;
}

function uploadScore(){
    if(length > ScoreData.score){
	ScoreData.score = length;
	ScoreData.name = window.prompt("CONGRATULATIONS\nplease enter your name to the highest rank:");
	localStorage.setItem("highestScore", JSON.stringify(ScoreData));
	updateRank();
    }
}

function updateRank(){
    ScoreData = JSON.parse(localStorage.getItem("highestScore"));
    rankName.textContent = ScoreData.name;
    rankScore.textContent = ScoreData.score;
    rankOccupationPercentage.textContent = Math.floor(ScoreData.score / width / height * 100) + "%";
}

function updateOccupyPercentage(){
    occupation.textContent = `occupation percentage: ${Math.floor(length / width / height * 100)}%`;
}
