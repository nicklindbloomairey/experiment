//create a html canvas object with width 800 and height 600
var screen = document.createElement('canvas');
screen.width = 800;
screen.height = 600;
screen.id = 'screen';

//create a graphics object for the canvas
var graphics = screen.getContext('2d');

var fps = 60;

//x and y for the rectangle
var x = 100;
var y = 100;

var t = 0;

handleClick = function(event) {
	console.log(event.pageX);
	console.log(event.pageY);
	var screenX = event.pageX-parseInt(window.getComputedStyle(document.getElementById("canvas")).marginLeft);
	var screenY = event.pageY-parseInt(window.getComputedStyle(document.getElementById("canvas")).marginTop);
	draw = function() {
		graphics.clearRect(0, 0, screen.width, screen.height);
		graphics.font = '12px serif';	
		graphics.fillText(screenX + " , " + screenY, screen.width/2, screen.height/2);

		graphics.beginPath();
		graphics.arc(screenX, screenY, 50, 0, 2*Math.PI);
		graphics.fill();
	}
}

screen.addEventListener('click', handleClick, false);

var draw = function() {
	//background
	graphics.clearRect(0, 0, screen.width, screen.height);

	//set the color, inside the quotes is css, not javascript
	graphics.fillStyle = 'rgb(255, 0, 0)';

	//draw a filled in rectangle with whatever the current color is
	//fillRect(x, y, width, heigh);
	//graphics.fillRect(x, y, 100, 100);
	
	//arc(x, y, radius, startAngle, endAngle);
	graphics.beginPath();
	graphics.arc(x, y, 50, 0, 2*Math.PI);
	graphics.fill();
}

var update = function() {
	t += 0.005;
	x = 200 * Math.cos(2 * Math.PI * t); x += screen.width/2; 
	y = 200 * Math.sin(2 * Math.PI * t); y += screen.height/2;
}


window.setInterval(function () {draw(); update();}, 1000/fps);

//add the canvas to the body section
document.getElementById("canvas").appendChild(screen);
