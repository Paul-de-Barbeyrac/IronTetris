
var canvas = document.getElementById('Tetris');
var ctx = canvas.getContext('2d');

//responsiveness
var aspectRatio = 2;
canvas.width = canvas.height /aspectRatio;


ctx.scale(5,5);

var tetrominoColors = [ '#0ff', '#f00', '#0f0', '#ff0', '#f0f', '#00f', '#f50' ];

var I = [
[1,1,1],
[0,0,0],
[0,0,0],
];

var O = [
[1,1,0],
[1,1,0],
[0,0,0],
];

var T = [
[1,1,1],
[0,1,0],
[0,0,0],
];

var L = [
[1,1,1],
[1,0,0],
[0,0,0],
];

var J = [
[1,1,1],
[0,0,1],
[0,0,0],
];

var Z = [
[1,1,0],
[0,1,1],
[0,0,0],
];

var S = [
[0,1,1],
[1,1,0],
[0,0,0],
];

var tetrominoShapes = [I,O,T,L,J,Z,S];

function draw () {
  ctx.fillStyle='#66ccff';
ctx.fillRect(0,0,canvas.width,canvas.height);
  drawTetromino(player.tetromino,player.positionStart);
}


function drawTetromino (tetromino,offset){
	for (var i=0;i<3;i++){
		for (var j=0;j<3;j++){
			// debugger;
			if (tetromino[j][i]==1){
				ctx.fillStyle='red';
				ctx.fillRect(i+offset.x,j+offset.y,1,1);
			}
		}
	}	
}

const player={
  positionStart:{x:4,y:0},
  tetromino: tetrominoShapes[2],
}

var A=[[1,1,1],[1,0,0],[0,0,0]];

function rotation (dir,matrix){

 if (dir==1){
  var matrixRotated=math.transpose(matrix).map(function(e){
    return e.reverse();
  })}
  
  else if (dir==-1){
    var matrixRotated=math.transpose(matrix.map(function(e){
      return e.reverse()}));
  }

  return matrixRotated
}

var dropCounter=0;
var dropInterval=1000;


var lastTime=0;

function update(time=0){
  // debugger;
  var deltaTime=time-lastTime;
  lastTime=time;
  dropCounter+=deltaTime;
  if (dropCounter>dropInterval){
    player.positionStart.y++;
    dropCounter=0;
  }
  draw();
  requestAnimationFrame(update);
}


update()

function moveDown() {
  player.positionStart.y++;
}

function moveLeft() {
  player.positionStart.x--;
}

function moveRight() {
  player.positionStart.x++;
}

document.onkeydown = function(e) {
switch (e.keyCode) {
  case 40:
    moveDown();
    break;
  case 37:
    moveLeft();
    break;
  case 39:
    moveRight();
    break;
}
}