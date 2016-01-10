//create a html canvas object with width 800 and height 600
var screen = document.createElement('canvas');
screen.width = 800;
screen.height = 600;
screen.id = 'screen';

var tile = {
	ppt: 40,
	playerX: 10,
	playerY: 10
	}

//create a graphics object for the canvas
var graphics = screen.getContext('2d');

var drawTile = function(x, y) {
	graphics.fillStyle = 'rgb(0, 0, 50)';
	graphics.fillRect(x*tile.ppt, y*tile.ppt, tile.ppt, tile.ppt);
	graphics.strokeStyle = 'rgb(255, 255, 255)';
	graphics.strokeRect(x*tile.ppt, y*tile.ppt, tile.ppt, tile.ppt);
}

var drawPlayer = function(x, y) {
	graphics.fillStyle = 'rgb(200, 200, 255)';
	graphics.beginPath();
	graphics.arc((x*tile.ppt)+(tile.ppt/2), (y*tile.ppt)+(tile.ppt/2), 3*(tile.ppt/8), 0, 2*Math.PI);
	graphics.fill();	
}

var draw = function() {
	//background
	graphics.clearRect(0, 0, screen.width, screen.height);

	for (var y = 0; y < screen.height/tile.ppt; y++) {
		for (var x = 0; x < screen.width/tile.ppt; x++) {
			if (tile.playerX === x && tile.playerY === y) {drawTile(x, y);drawPlayer(x, y);}
			else {drawTile(x, y);}
		}
	}
}

var onKeyDown = function(event) {
	if (event.keyCode === 37 && tile.playerX > 0) {
		tile.playerX--;	
	}	
	else if (event.keyCode === 38 && tile.playerY > 0) {
		tile.playerY--;	
	}	
	else if (event.keyCode === 39 && tile.playerX < screen.width/tile.ppt - 1) {
		tile.playerX++;	
	}	
	else if (event.keyCode === 40 && tile.playerY < (screen.height/tile.ppt)-1) {
		tile.playerY++;	
	}	
	draw();
}

window.addEventListener('keydown', onKeyDown, false);

draw();

//add the canvas to the body section
document.getElementById('canvas').appendChild(screen);
