//Rendering canvas
var canvas = document.getElementById('Tetris');
var ctx = canvas.getContext('2d');

//Handling visual aspect of the Tetris based on dimensions of the grid (html) and tetromino size (user choice js)
var width = canvas.width;
var height = canvas.height;
var ratio = height / width;
var scaleFactor = 20;
ctx.scale(scaleFactor, scaleFactor);
var numberColumns = width / scaleFactor;
var backgroundGrid = createMatrix(numberColumns, numberColumns * ratio);

//Function used to define the grid game
function createMatrix(w, h) {
  const matrix = []
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

//Write the position of the player on the grid
function superpose(backgroundGrid, player) {
  player.tetromino.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        backgroundGrid[y + player.position.y][x + player.position.x] = value;
      }
    });
  });
}

//To check if the tetromino meets a border or an existing piece
function collision(backgroundGrid, player) {
  const m = player.tetromino;
  const o = player.position;
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== 0 &&
        (backgroundGrid[y + o.y] &&
          backgroundGrid[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

//Moving left or right
function playerMove(offset) {
  player.position.x += offset;
  if (collision(backgroundGrid, player)) {
    player.position.x -= offset;
  }
}

function createPiece(type) {
  if (type === 'I') {
    return [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ];
  } else if (type === 'O') {
    return [
      [2, 2],
      [2, 2],
    ];}
    else if (type === 'T') {
      return [
        [0, 3, 0],
        [3, 3, 3],
        [0, 0, 0],
      ];
    
  } else if (type === 'L') {
    return [
      [0, 4, 0],
      [0, 4, 0],
      [0, 4, 4],
    ];
  } else if (type === 'J') {
    return [
      [0, 5, 0],
      [0, 5, 0],
      [5, 5, 0],
    ];

  } else if (type === 'Z') {
    return [
      [6, 6, 0],
      [0, 6, 6],
      [0, 0, 0],
    ];
  } else if (type === 'S') {
    return [
      [0, 7, 7],
      [7, 7, 0],
      [0, 0, 0],
    ];
  }
}

const colors = [
  null,
  'rgb(0,255,255)',
  'rgb(251,255,0)',
  'rgb(190,0,255)',
  'rgb(255,164,0)',
  'rgb(55,0,255)',
  'rgb(255,0,0)',
  'rgb(0,255,0)',
];

const colorsGhost = [
  null,
  'rgb(0,255,255,0.35)',
  'rgb(251,255,0,0.35)',
  'rgb(190,0,255,0.35)',
  'rgb(255,164,0,0.35)',
  'rgb(55,0,255,0.35)',
  'rgb(255,0,0,0.35)',
  'rgb(0,255,0,0.35)',
];

const borderColor = 'rgb(0,0,0)'
const borderColorGhost = 'rgb(0,0,0,0.35)'

function playerReset() {
  const pieces = 'IOTLJZS';
  player.tetromino = createPiece(pieces[math.floor(pieces.length * Math.random())]);
}


function draw() {
  ctx.fillStyle = '#66ccff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawTetromino(backgroundGrid, {
    x: 0,
    y: 0
  }, false);
  drawTetromino(player.tetromino, {
    x: player.position.x,
    y: ghost(backgroundGrid, player)
  },true);
  drawTetromino(player.tetromino, player.position,false);
}

//Ghost function to find out at which y position to display the transparent tetromino
function ghost(backgroundGrid, player) {
  // debugger;
  let temp = player.position.y;
  let count = player.position.y;
  while (collision(backgroundGrid, player) === false) {
    player.position.y++
      count++;
  }
  player.position.y = temp;
  return count - 1
}

function drawTetromino(matrix, offset,isGhost) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        if (isGhost===true){
          ctx.fillStyle = colorsGhost[value];
          ctx.strokeStyle = borderColorGhost;
        } else {
          ctx.fillStyle = colors[value];
          ctx.strokeStyle = borderColor;
        }
        
        ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
        ctx.beginPath();
        ctx.lineWidth = "0.1";
        ctx.rect(x + offset.x, y + offset.y, 1, 1);
        ctx.stroke();
      }
    });
  });
}


var player = {
  position: {
    x: math.floor(backgroundGrid[0].length/2)-1,
    y: 0
  },
  tetromino: [],
}


function rotation(dir, matrix) {
  if (dir == 1) {
    var matrixRotated = math.transpose(matrix).map(function (e) {
      return e.reverse();
    })
  } else if (dir == -1) {
    var matrixRotated = math.transpose(matrix.map(function (e) {
      return e.reverse()
    }));
  }
  document.getElementById('RotationSound').play();
  return matrixRotated
}

function playerDrop() {
  player.position.y++;
  if (collision(backgroundGrid, player)) {
    player.position.y--;
    superpose(backgroundGrid, player);
    player.position.x=math.floor(backgroundGrid[0].length/2)-1;
    player.position.y = 0;
    playerReset();
  }
  
}


let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;

function update() {
  draw();
  setInterval(function () {
    playerDrop();
    draw();
  }, 1000);
}

document.getElementById("BackgroundMusic").play();

playerReset();
update();


//Keyboard user input to move left/right, rotate, smashdown

document.onkeydown = function (e) {
  if (event.keyCode === 37) {
    playerMove(-1);
    document.getElementById('LeftRightSound').play();
  } else if (event.keyCode === 39) {
    playerMove(1);
    document.getElementById('LeftRightSound').play();
  } else if (event.keyCode === 40) {
    playerDrop();
  } else if (event.keyCode === 32) {
    while (collision(backgroundGrid, player) === false) {
      player.position.y++;
      document.getElementById('HardDropSound').play();
    }
    player.position.y--;
    superpose(backgroundGrid, player);
    playerDrop();

  } else if (event.keyCode === 65) {
    if (player.position.x < math.floor(backgroundGrid[0].length/2)-1) {
      player.tetromino = rotation(-1, player.tetromino)
      while (collision(backgroundGrid, player)) {
        player.position.x++;
      }
    } else {
      player.tetromino = rotation(-1, player.tetromino)
      while (collision(backgroundGrid, player)) {
        player.position.x--;
      }
    }
  } else if (event.keyCode === 90) {
    if (player.position.x < math.floor(backgroundGrid[0].length/2)-1) {
      player.tetromino = rotation(1, player.tetromino)
      while (collision(backgroundGrid, player)) {
        player.position.x++;
      }
    } else {
      player.tetromino = rotation(1, player.tetromino)
      while (collision(backgroundGrid, player)) {
        player.position.x--;
      }
    }
  }
  draw();
}