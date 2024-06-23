var start;
var time = 0;

var numMoves = 0; // global var

function swapTiles(cell1, cell2) {
	var temp = document.getElementById(cell1).className; // gets the cell name
	document.getElementById(cell1).className = document.getElementById(cell2).className;
	document.getElementById(cell2).className = temp;
}

function startTimer() {
    start = Date.now(); // timer starts
    time = setInterval(updateTimer, 1000); // updates timer display every second (1000 milliseconds
}

function updateTimer() {
    time = Math.round((Date.now() - start) / 1000); // current time at this moment
    document.getElementById("time").innerHTML = "Time spent in current game: " + time + " seconds";
}

function clearTimer() {
    clearInterval(time); // for resetting the time whenever a new game begins
}


function shuffle() {
	numMoves = 0;
	document.getElementById("moves").innerHTML = "Number of moves so far: " + numMoves;
	document.getElementById("time").innerHTML = "Time spent in current game: " + time + " seconds";
	// use nested loops to access each cell of the 4x4 grid
	for(var row = 1; row <= 4; row++) {	// for each row of 4x4 grid
			// for each column in this row
			for (var col = 1; col <= 4; col++) {
				// pick a random row from 1 to 4
				var row2 = Math.floor(Math.random()*4+1);
				
				// pick a random col from 1 to 4
				var col2 = Math.floor(Math.random()*4+1);
				
				swapTiles("cell" + row + col, "cell" + row2 + col2);
				// swap the look and feel of both cells
				// e.g. swapTiles(cell11, cell12);
				
			}
	}
	
	startTimer(); // starts the timer after done shuffling
}

window.onload = shuffle();	// automatically shuffles the tiles on page reloads

function simpleGame() {
    // Reset the puzzle to its complete and solved state
	numMoves = 0;
	time = 0;
	
	clearTimer(); // clears the timer when starting a new game

	document.getElementById("moves").innerHTML = "Number of moves so far: " + numMoves;
	document.getElementById("time").innerHTML = "Time spent in current game: " + time + " seconds";
	
    var count = 1;
    for (var row = 1; row <= 4; row++) {
        for (var col = 1; col <= 4; col++) {
            document.getElementById("cell" + row + col).className = "tile" + count;
            count++;
        }
    }
    // Swap the last two tiles to create a puzzle that can be solved in one move
    var randomRow = Math.floor(Math.random()*(2)+3);
	var randomCol = Math.floor(Math.random()*(2)+3);
	
	while ((randomRow == 4 && randomCol == 4) || (randomRow == 3 && randomCol == 3)) {	// checks if its cell44 or cell33 (because otherwise 
																			// white tile will be swapping with itself or a cell33 swap will require more than one move to win
	    randomRow = Math.floor(Math.random()*2+3);	//row randomizes again
		randomCol = Math.floor(Math.random()*2+3);	//col randomizes again
	}
	
	swapTiles("cell44", "cell"+ randomRow + randomCol);	// swaps white tile (cell44) with either cell43 or cell34

	startTimer();
}


function clickTile(row, col) {
	var cell = document.getElementById("cell" + row + col);
	var tile = cell.className;
	
	if (tile != "tile16") {
		// check if the white tile is on the right (want to move it to the left/decrement)
		if (col < 4) {
			// check if right cell is associated with right tile
			if (document.getElementById("cell"+row+(col+1)).className == "tile16") {
				numMoves++;
				document.getElementById("moves").innerHTML = "Number of moves so far: " + numMoves;
				swapTiles("cell"+row+col, "cell"+row+(col+1));
				setTimeout(() => {Win()}, 1000); //where 1000 is the delay time, represented in milliseconds, before the specified function or code is executed. 1000ms = 1sec
				return;
			}
		}
		// check if the white tile is on the left (want to move it to the right/increment)
		if (col > 1) {
			if (document.getElementById("cell"+row+(col-1)).className == "tile16") {
				numMoves++;
				document.getElementById("moves").innerHTML = "Number of moves so far: " + numMoves;
				swapTiles("cell"+row+col, "cell"+row+(col-1));
				setTimeout(() => {Win()}, 1000); //where 1000 is the delay time, represented in milliseconds, before the specified function or code is executed. 1000ms = 1sec
				return;
			}
		}
		// check if the white tile is above (want to move it down/decrement)
		if (row > 1) {
			if (document.getElementById("cell"+(row-1)+col).className == "tile16") {
				numMoves++;
				document.getElementById("moves").innerHTML = "Number of moves so far: " + numMoves;
				swapTiles("cell"+row+col, "cell"+(row-1)+col);
				setTimeout(() => {Win()}, 1000); //where 1000 is the delay time, represented in milliseconds, before the specified function or code is executed. 1000ms = 1sec
				return;
			}
		}
		// check if the white tile is below (want to move it up/increment)
		if (row < 4) {
			if (document.getElementById("cell"+(row+1)+col).className == "tile16") {
				numMoves++;
				document.getElementById("moves").innerHTML = "Number of moves so far: " + numMoves;
				swapTiles("cell"+row+col, "cell"+(row+1)+col);
				setTimeout(() => {Win()}, 1000); //where 1000 is the delay time, represented in milliseconds, before the specified function or code is executed. 1000ms = 1sec
				return;
			}
		}
		
	}
}


function Win() {
	//if the tiles are all in order, the puzzle is won.
	if(document.getElementById("cell11").className=="tile1" &&
			document.getElementById("cell12").className=="tile2" &&
			document.getElementById("cell13").className=="tile3" &&
			document.getElementById("cell14").className=="tile4" &&
			document.getElementById("cell21").className=="tile5" &&
			document.getElementById("cell22").className=="tile6" &&
			document.getElementById("cell23").className=="tile7" &&
			document.getElementById("cell24").className=="tile8" &&
			document.getElementById("cell31").className=="tile9" &&
			document.getElementById("cell32").className=="tile10" &&
			document.getElementById("cell33").className=="tile11" &&
			document.getElementById("cell34").className=="tile12" &&
			document.getElementById("cell41").className=="tile13" &&
			document.getElementById("cell42").className=="tile14" &&
			document.getElementById("cell43").className=="tile15" &&
			document.getElementById("cell44").className=="tile16") {
		
		//alert to the user that they won.
		window.alert("Congratulations!!\nAmount spent on current game: " + time + " seconds\nNumber of moves: " + numMoves+"\nWould you like to play again?");
		window.location.reload(); //Reload page upon confirmation
	}
}
