let computerChoice, result, playerChoice;
const rock = document.querySelector("#rock"),
      paper = document.querySelector("#paper"),
      scissors = document.querySelector("#scissors"),
      playerImage = document.querySelector("#playerImage"),
      playerName = document.querySelector("#playerName"),
      computerImage = document.querySelector("#computerImage"),
      computerName = document.querySelector("#computerName"),
      resultImage = document.querySelector("#resultImage"),
      resultName = document.querySelector("#resultName");

rock.addEventListener("click", () => {
    playerChoice = rock.textContent;
    computerPlay();
    playerName.style.color = "rgb(210, 50, 180)";
    playerName.textContent = `player: ${playerChoice}`;
    playerImage.setAttribute("src", "images/rock.png");
    playerImage.style.visibility = "visible";
    check();
})

paper.addEventListener("click", () => {
    playerChoice = paper.textContent;
    computerPlay();
    playerName.style.color = "rgb(230, 200, 15)";
    playerName.textContent = `player: ${playerChoice}`;
    playerImage.setAttribute("src", "images/paper.png");
    playerImage.style.visibility = "visible";
    check();
})

scissors.addEventListener("click", () => {
    playerChoice = scissors.textContent;
    computerPlay();
    playerName.style.color = "rgb(30, 210, 250)";
    playerName.textContent = `player: ${playerChoice}`;
    playerImage.setAttribute("src", "images/scissors.png");
    playerImage.style.visibility = "visible";
    check();
})

function computerPlay(){
    const date = new Date();
    let choice = date.getTime() % 3;
    switch(choice){
	case 0:
	    computerChoice = "ROCK";
	    computerName.style.color = "rgb(210, 50, 180)";
	    computerImage.setAttribute("src", "images/rock.png");
	    computerImage.style.visibility = "visible";
	    break;
	case 1:
	    computerChoice = "PAPER";
	    computerName.style.color = "rgb(230, 200, 15)";
	    computerImage.setAttribute("src", "images/paper.png");
	    computerImage.style.visibility = "visible";
	    break;
	case 2:
	    computerChoice = "SCISSORS";
	    computerName.style.color = "rgb(30, 210, 250)";
	    computerImage.setAttribute("src", "images/scissors.png");
	    computerImage.style.visibility = "visible";
    }
    computerName.textContent = `computer: ${computerChoice}`;
}

function check(){
    if(playerChoice == computerChoice){
	resultName.textContent = "TIE";
	resultName.style.color = "cyan";
	resultImage.setAttribute("src", "images/tie.png");
    }
    else if((playerChoice == "SCISSORS" && computerChoice == "PAPER") ||
	    (playerChoice == "PAPER" && computerChoice == "ROCK") ||
	    (playerChoice == "ROCK" && computerChoice == "SCISSORS")){
	resultName.textContent = "WIN";
	resultName.style.color = "gold";
	resultImage.setAttribute("src", "images/win.png");
    }
    else{
	resultName.textContent = "LOSE";
	resultName.style.color = "gray";
	resultImage.setAttribute("src", "images/lose.png");
    }
    resultImage.style.visibility = "visible";
}
