var canvas = document.getElementById('Tetris');
var ctx = canvas.getContext('2d');

//to keep the tetromino declaration to 1px each block and scale later on
ctx.scale(20, 20);

function createMatrix(w, h) {
  const matrix = []
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

var backgroundGrid = createMatrix(12, 20); //because scale of 20 and width and height set to 240 and 400px


function superpose(backgroundGrid, player) {
  // debugger;
  player.tetromino.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        backgroundGrid[y + player.position.y][x + player.position.x] = value;
      }
    });
  });
}

function collision(backgroundGrid, player) {
  // debugger;
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

function playerMove(offset) {
  player.position.x += offset;
  if (collision(backgroundGrid, player)) {
    player.position.x -= offset;
  }
}



// console.table(backgroundGrid);


var tetrominoColors = ['#0ff', '#f00', '#0f0', '#ff0', '#f0f', '#00f', '#f50'];

var I = [
  [1, 1, 1, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

var O = [
  [1, 1],
  [1, 1],
];

var T = [
  [1, 1, 1],
  [0, 1, 0],
  [0, 0, 0],
];

var L = [
  [1, 1, 1],
  [1, 0, 0],
  [0, 0, 0],
];

var J = [
  [1, 1, 1],
  [0, 0, 1],
  [0, 0, 0],
];

var Z = [
  [1, 1, 0],
  [0, 1, 1],
  [0, 0, 0],
];

var S = [
  [0, 1, 1],
  [1, 1, 0],
  [0, 0, 0],
];

var tetrominoShapes = [I, O, T, L, J, Z, S];

function draw() {
  ctx.fillStyle = '#66ccff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawTetromino(backgroundGrid, {
    x: 0,
    y: 0
  });
  // debugger;
  drawTetromino(player.tetromino, player.position);

}


function drawTetromino(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        ctx.fillStyle = 'red';
        ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = "0.1";
        ctx.rect(x + offset.x, y + offset.y, 1, 1);
        ctx.stroke();
      }
    });
  });
}

var player = {
  position: {
    x: 1,
    y: 0
  },
  tetromino: tetrominoShapes[Math.floor(Math.random() * tetrominoShapes.length)]
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
  return matrixRotated
}

function playerDrop() {
  player.position.y++;
  if (collision(backgroundGrid, player)) {
    player.position.y--;
    superpose(backgroundGrid, player);
    player.position.y = 0;
  }
}

let dropCounter = 0;
let dropInterval = 1000;


let lastTime = 0;

function update(time = 0) {
  // debugger;
  var deltaTime = time - lastTime;

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
    dropCounter = 0;
    // console.log(player.position.x)
  }
  lastTime = time;
  draw();
  requestAnimationFrame(update);

}


update()










document.onkeydown = function (e) {
  if (event.keyCode === 37) {
    playerMove(-1);
  } else if (event.keyCode === 39) {
    playerMove(1);
  } else if (event.keyCode === 40) {
    playerDrop();
  } else if (event.keyCode === 32) {
    while (collision(backgroundGrid, player) === false) {
      player.position.y++;
    }
    player.position.y--;
    superpose(backgroundGrid, player);

  } else if (event.keyCode === 65) {
    if (player.position.x < 5) {
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
    if (player.position.x < 5) {
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

}