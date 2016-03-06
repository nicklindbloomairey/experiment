//create a html canvas object with width 800 and height 600
var screen = document.createElement('canvas');
screen.width = 600;
screen.height = 600;
screen.id = 'screen';

//create a graphics object for the canvas
var graphics = screen.getContext('2d');

//global variables
var currentTurn = 1;
var win = 0;

//tictactoe board
var board = [ 
    [0, 0, 0], // [1, 2, 3]
    [0, 0, 0], // [4, 5, 6]
    [0, 0, 0]  // [7, 8, 9]
]

function checkWin(t) {
    if (board[0][0] === t && board[0][1] === t && board[0][2] === t) {
        return t;
    }
    else if (board[1][0] === t && board[1][1] === t && board[1][2] === t) {
        return t;
    }
    else if (board[2][0] === t && board[2][1] === t && board[2][2] === t) {
        return t;
    }

    else if (board[0][0] === t && board[1][0] === t && board[2][0] === t) {
        return t;
    }
    else if (board[0][1] === t && board[1][1] === t && board[2][1] === t) {
        return t;
    }
    else if (board[0][2] === t && board[1][2] === t && board[2][2] === t) {
        return t;
    }

    else if (board[0][0] === t && board[1][1] === t && board[2][2] === t) {
        return t;
    }
    else if (board[0][2] === t && board[1][1] === t && board[2][0] === t) {
        return t;
    }
    else {
        return 0;
    }
}

function drawTile(state, x, y) {
    if (state === 0) {
    } else if (state === 1) {
        graphics.fillStyle = 'rgb(255, 0, 0)';
        graphics.fillRect(x, y, screen.width/3, screen.height/3); 
    } else {
        graphics.fillStyle = 'rgb(0, 0, 255)';
        graphics.fillRect(x, y, screen.width/3, screen.height/3); 
    }
}

function play(turn, spot) {
    if (board[Math.floor((spot-1)/3)][(spot-1)%3] === 0) {
        board[Math.floor((spot-1)/3)][(spot-1)%3] = turn;
    }

    win = checkWin(turn);

    currentTurn = (currentTurn % 2) + 1;

    draw();
}


function draw() {
	//background
	graphics.clearRect(0, 0, screen.width, screen.height);

    if (win === 1) {
        graphics.fillStyle = 'rgb(255, 0, 0)';
        graphics.fillRect(0, 0, screen.width, screen.height); 
    } else if (win === 2) {
        graphics.fillStyle = 'rgb(0, 0, 255)';
        graphics.fillRect(0, 0, screen.width, screen.height); 
    } else {
        graphics.moveTo(200, 0);
        graphics.lineTo(200, 600);
        graphics.stroke();

        graphics.moveTo(400, 0);
        graphics.lineTo(400, 600);
        graphics.stroke();

        graphics.moveTo(0, 200);
        graphics.lineTo(600, 200);
        graphics.stroke();

        graphics.moveTo(0, 400);
        graphics.lineTo(600, 400);
        graphics.stroke();


        for (var r = 0; r<board.length; r++) {
            for (var c = 0; c<board[r].length; c++) {
                drawTile(board[r][c], c*200, r*200);
            }
        }
    }
}

function onKeyDown(event) {
    if (event.keyCode >= 49 && event.keyCode <= 57 && win === 0) {
        play(currentTurn, event.keyCode-48);
    }
}

function mousePos(event) {
    var rect = screen.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

function onMouseDown(event) {
    var mouse = mousePos(event);

    if (win === 0) {
        play(currentTurn, Math.floor(mouse.x/200) + 1 + (Math.floor(mouse.y/200)*3));
    }
}

screen.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('keydown', onKeyDown, false);

draw();

//add the canvas to the body section
document.getElementById("canvas").appendChild(screen);
