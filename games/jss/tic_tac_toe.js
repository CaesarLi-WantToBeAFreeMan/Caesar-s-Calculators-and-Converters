let number, symbol, stop, mode, isStart = true, position, pause = false,
    board = ["", "", "", "", "", "", "", "", ""];

const replaybtn = document.querySelector("#replaybtn"),
      info = document.querySelector("#info"),
      chess = document.querySelectorAll(".chess"),
      title = document.querySelector("#title"),
      modeInfo = document.querySelector("#modeInfo"),
	  PvsC = document.querySelector("#PvsC"),
	  PvsCDiv = PvsC.parentElement,
	  PvsP = document.querySelector("#PvsP"),
	  PvsPDiv = PvsP.parentElement;

initial();

function initial(){
    number = 0, symbol = true, stop = pause = false;
    for(let i = 0; i < 9; i++)	board [i] = "";
    chess.forEach(element => {
		element.textContent = "";
		element.style.cursor = "pointer";
		element.style.backgroundColor = "black";
    })
    info.textContent = mode ? "Welcome! You first" : "Welcome! X first";
	if(isStart){
		mode = false;
		PvsP.style.accentColor = "red";
		modeInfo.textContent = "person VS person";
	}
}

PvsCDiv.addEventListener("mousedown", () => {
	if(!mode && !number){
		PvsC.style.cursor = "pointer";
		PvsCDiv.style.color = "blue";
		modeInfo.textContent = "person VS computer";
		mode = true;
		info.textContent = "Welcome! You first";
		changeAccentColor();
	}
	else{
		PvsC.style.cursor = "not-allowed";
		window.alert("Sorry!\nPlease enjoy this round!\nPlease click again when you restarted");
	}
})

PvsCDiv.addEventListener("mouseup", () => PvsCDiv.style.color = "white")

PvsPDiv.addEventListener("mousedown", () => {
	if(mode && !number){
		PvsP.style.cursor = "pointer";
		PvsPDiv.style.color = "red";
		modeInfo.textContent = "person VS person";
		mode = false;
		info.textContent = "Welcome! X first";
		changeAccentColor();
	}
	else{
		PvsP.style.cursor = "not-allowed";
		window.alert("Sorry!\nPlease enjoy this round!\nPlease click again when you restarted");
	}
})

PvsPDiv.addEventListener("mouseup", () => PvsPDiv.style.color = "white")

function changeAccentColor() {
	if(!mode){
		PvsC.style.accentColor = "white";
		PvsP.style.accentColor = "red";
	}else{
		PvsP.style.accentColor = "white";
		PvsC.style.accentColor = "blue";
	}
}

chess.forEach(element => {
	element.addEventListener("mousedown", () => {
		if(!mode){
			if(!stop){
				element.style.backgroundColor = "lightgray";
				if(board [element.getAttribute("cellIndex")] == ""){
					board [element.getAttribute("cellIndex")] = symbol ? "X" : "O";
					element.textContent = symbol ? "X" : "O";
					number++;
					element.style.color = symbol ? "red" : "blue";
					symbol = !symbol;
				}else{
					info.textContent = `this place was token up`;
					return;
				}
			}
			let result = check();
			switch(result){
				case 0:
					info.textContent = `${symbol ? "X" : "O"}'s round`;
					break;
				case 1:
					info.textContent = `${symbol ? "O" : "X"} WINS`;
					stop = true;
					chess.forEach(element => {
						element.style.cursor = "not-allowed";
						element.style.backgroundColor = "black";
						element.style.color = "white";
					})
					break;
				case 2:
					info.textContent = `TIE`;
					stop = true;
					chess.forEach(element => {
						element.style.cursor = "not-allowed";
						element.style.backgroundColor = "black";
						element.style.color = "white";
					})
					break;
			}
		}else{
		    pause = false;
			if(!stop){
				if(number)
					chess [position].style.backgroundColor = "black";
				element.style.backgroundColor = "lightgray";
				if(board [element.getAttribute("cellIndex")] == ""){
					board [element.getAttribute("cellIndex")] = "X";
					element.textContent = "X";
					number++;
					element.style.color = "red";
				}else{
					info.textContent = `this place was token up`;
					pause = true;
					return;
				}
			}
			let result = check();
			info.textContent = result == 0 ? "YOUR ROUND" : result == 1 ? "YOU WIN" : "TIE";
			if(result == 1 || result == 2){
				stop = true;
				chess.forEach(element => {
					element.style.cursor = "not-allowed";
					element.style.backgroundColor = "black";
					element.style.color = "white";
				})
			}
		}
	})

	element.addEventListener("mouseup", () => {
		if(!stop){
			element.style.backgroundColor = "black";
			if(mode && !pause){
				for(position = Math.floor(Math.random() * 9); board [position] != ""; position = Math.floor((position + 1) % 9));
				board [position] = "O";
				chess [position].style.backgroundColor = "lightgray";
				chess [position].style.color = "blue";
				chess [position].textContent = "O";
				number++;
				let result = check();
				if(result == 1){
					info.textContent = "YOU LOSE";
					stop = true;
					chess.forEach(element => {
						element.style.cursor = "not-allowed";
						element.style.backgroundColor = "black";
						element.style.color = "white";
					})
				}
			}
		}
	})
})

replayBtn.addEventListener("click", () => {
	isStart = false;
	initial();
})

function check(){
    for(let i = 0; i < 3; i++)
		if(board [i] == board [i + 3] && board [i] == board [i + 6] && board [i])
			return 1;
    for(let i = 0; i < 9; i += 3)
		if(board [i] == board [i + 1] && board [i] == board [i + 2] && board [i])
			return 1;
    if(board [0] == board [4] && board [0] == board [8] && board [0])
		return 1;
    if(board [2] == board [4] && board [2] == board [6] && board [2])
		return 1;
    if(number == 9)
		return 2;
    return 0;
}
