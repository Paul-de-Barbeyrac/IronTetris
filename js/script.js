
var canvas = document.getElementById('Tetris');
var ctx = canvas.getContext('2d');

ctx.fillStyle='#66ccff';
ctx.fillRect(0,0,canvas.width,canvas.height);
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

function draw (x,y,tetromino){
	for (var i=0;i<3;i++){
		for (var j=0;j<3;j++){
			// debugger;
			if (tetromino[j][i]==1){
				ctx.fillStyle='red';
				ctx.fillRect(i+x,j+y,1,1);
			}
		}
	}	
}

var A=[[1,1,1],[1,0,0],[0,0,0]];

function rotation (dir,matrix){

 if (dir==1){
  var temp=math.transpose(matrix);
  var matrixRotated=temp.map(function(e){
    return e.reverse();
  })}
  
  else if (dir==-1){
    var temp=matrix.map(function(e){
      return e.reverse()})
    var matrixRotated=math.transpose(temp);
  }

return matrixRotated
}
