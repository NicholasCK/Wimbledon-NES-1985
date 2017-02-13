var canvas;
var canvasContext;
var ballX = 50;
var ballY= 50;
var ballSpeedX = 10;
var ballSpeedY = 5;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 10;

var showingWinScreen = false;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGhT = 100;

function calaculateMousePos(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}

function handleMouseClick(evt){
	if(showingWinScreen){
		player1Score = 0;
		player2Score = 0;
		showingWinScreen = false;
	}
}

window.onload = function() {
	canvas = document.getElementById('gamecanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 30;
	setInterval(function() {
		moveTennis();
		drawTennis();	
	}, 1000/framesPerSecond);

	canvas.addEventListener('mousedown' , handleMouseClick);

	canvas.addEventListener('mousemove' ,
		function(evt){
			var mousePos = calaculateMousePos(evt);
			paddle1Y = mousePos.y -(PADDLE_HEIGhT/2);
		});
}

function ballReset(){

	if(player1Score >= WINNING_SCORE || 
		player2Score >= WINNING_SCORE){

		showingWinScreen = true;
}

ballSpeedX = - ballSpeedX;
ballX = canvas.width/2;
ballX = canvas.height/2;
}

// PLAYER 2 AI MOVEMENT
function computerMovement(){
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGhT/2);
	if (paddle2YCenter < ballY - 35) {
		paddle2Y += 6;
	}else if (paddle2YCenter > ballY +35){
		paddle2Y -= 6;
	}
}

function moveTennis() {

	if (showingWinScreen) {
		return;
	}

	computerMovement();

	ballX += ballSpeedX;
	ballY += ballSpeedY;
	if(ballX < 0) {
		if(ballY > paddle1Y &&
			ballY < paddle1Y + PADDLE_HEIGhT){
			ballSpeedX = - ballSpeedX;
		var deltaY = ballY - (paddle1Y + PADDLE_HEIGhT/2);
		ballSpeedY = deltaY * 0.35;
	}else {
		player2Score ++;
		ballReset();
		
		// ballSpeedX = -ballSpeedX;
	}	
}
if(ballX > canvas.width) {
	// ballSpeedX = -ballSpeedX;
	if(ballY > paddle2Y &&
		ballY < paddle2Y + PADDLE_HEIGhT){
		ballSpeedX = - ballSpeedX;
	var deltaY = ballY - (paddle2Y + PADDLE_HEIGhT/2);
	ballSpeedY = deltaY * 0.35;
}else {
	player1Score ++;
	ballReset();
	
		// ballSpeedX = -ballSpeedX;
	}	
}
if(ballY < 0){
	ballSpeedY = - ballSpeedY;
}
if (ballY>canvas.height){
	ballSpeedY = -ballSpeedY;
}
}

function drawNet(){

	for(var i = 0; i < canvas.height; i +=40){
		colorRect(canvas.width/2-1, i, 2, 20, 'white');
	}
}

function drawTennis() {
// TENNIS COURT
colorRect(0,0,canvas.width,canvas.height,'mediumseagreen');

// NET
drawNet();

// PLAYER 1
colorRect(0,paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGhT,'white');

// PLAYER 2
colorRect(canvas.width - PADDLE_THICKNESS,paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGhT,'white');

// WIN SCREEN
if (showingWinScreen) {

	if(player1Score >= WINNING_SCORE){
		canvasContext.fillText("End of Match. PLAYER 1 WINS!", 320, 227);

	}else if(player2Score >= WINNING_SCORE){
		canvasContext.fillText("End of Match. PLAYER 2 WINS!", 320, 227);
	}
	canvasContext.fillStyle = '#ffc5e3';
	canvasContext.fillText("Click To Continue", 360, 320);
}

// TENNIS BALL
colorCircle(ballX, ballY, 10, '#C6ED2C');

// SCOREBOARD
canvasContext.fillText(player1Score, 100, 100);
canvasContext.fillText(player2Score, canvas.width -100, 100);
}

function colorCircle(centerX, centerY, radius, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2,true);
	canvasContext.fill();
}

function colorRect(leftX,topY, width,height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX,topY, width,height);
}
