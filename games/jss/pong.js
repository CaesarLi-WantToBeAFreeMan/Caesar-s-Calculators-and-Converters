const canvas = document.querySelector("#board"),
      ctx = canvas.getContext("2d"),
      billiard1Score = document.querySelector("#billiard1Score"),
      billiard2Score = document.querySelector("#billiard2Score"),
      reset = document.querySelector("#resetBtn"),
      WIDTH = canvas.width,
      HEIGHT = canvas.height,
      UNIT = 20;

let ball = {
        x: 0,
        y: 0,
        radius: 5,
        xDirection: 0,
        yDirection: 0,
        speed: 0
    },
    redBar = {
        width: 10,
        height: 70,
        x: 0,
        y: 0,
        score: 0,
        color: "red"
    },
    blueBar = {
        width: 10,
        height: 70,
        x: 0,
        y: 0,
        score: 0,
        color: "blue"
    },
    timer = null;

window.addEventListener("keydown", barMove);

reset.addEventListener("click", () => {
    clearInterval(timer);
    initial();
})

initial();

function initial(){
    redBar.x = 0;
    redBar.y = 0;
    redBar.score = 0;

    blueBar.x = WIDTH - blueBar.width;
    blueBar.y = HEIGHT - blueBar.height;
    blueBar.score = 0;

    updateScore();

    createBall();

    timer = setInterval(() => {
        clearBoard();
        drawBars();
        moveBall();
        drawBall();
    }, 10);
}

function drawBars(){
    ctx.fillStyle = redBar.color;
    ctx.fillRect(redBar.x, redBar.y, redBar.width, redBar.height);

    ctx.fillStyle = blueBar.color;
    ctx.fillRect(blueBar.x, blueBar.y, blueBar.width, blueBar.height);
}

function drawBall(){
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fill();
}

function createBall(){
    if(Math.round(Math.random()) == 1)
        ball.xDirection = 1;
    else
        ball.xDirection = -1;

    if(Math.round(Math.random()) == 1)
        ball.yDirection = 1;
    else
        ball.yDirection = -1;

    ball.x = WIDTH / 2;
    ball.y = HEIGHT / 2;
    ball.speed = 1;

    redBar.height = 70;
    blueBar.height = 70;

    drawBall();
}

function moveBall(){
    ball.x += ball.speed * ball.xDirection;
    ball.y += ball.speed * ball.yDirection;

    if(ball.y <= 0 + ball.radius)
        ball.yDirection = 1;
    if(ball.y >= HEIGHT - ball.radius)
        ball.yDirection = -1;

    if(ball.x <= 0){
        blueBar.score++;
        updateScore();
        createBall();
        return;
    }
    if(ball.x >= WIDTH){
        redBar.score++;
        updateScore();
        createBall();
        return;
    }

    if(ball.x <= (redBar.x + redBar.width + ball.radius))
        if(ball.y > redBar.y && ball.y < redBar.y + redBar.height){
            ball.x = redBar.x + redBar.width + ball.radius;
            ball.xDirection = 1;
            ball.speed++;
            if(redBar.height > 50)
                redBar.height--;
        }

    if(ball.x >= (blueBar.x - ball.radius))
        if(ball.y > blueBar.y && ball.y < blueBar.y + blueBar.height){
            ball.x = blueBar.x - ball.radius;
            ball.xDirection = -1;
            ball.speed++;
            if(blueBar.height > 50)
                blueBar.height--;
        }
}

function clearBoard(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function barMove(press){
    key = press.keyCode;
    switch(key){
        case 38:
            if(blueBar.y >= UNIT)
                blueBar.y -= UNIT;
            break;
        case 40:
            if(blueBar.y <= HEIGHT - blueBar.height - UNIT)
                blueBar.y += UNIT;
            break;

        case 87:
            if(redBar.y >= UNIT)
                redBar.y -= UNIT;
            break;
        case 83:
            if(redBar.y <= HEIGHT - redBar.height - UNIT)
                redBar.y += UNIT;
            break;
    }
}

function updateScore(){
    billiard1Score.textContent = redBar.score;
    billiard2Score.textContent = blueBar.score;
}