//Rendering main canva 
var canvas = document.getElementById('Tetris');
var ctx = canvas.getContext('2d');

//Rendering canva for next tetromino display
var canvasNext = document.getElementById('NextTetromino');
var ctxNext = canvasNext.getContext('2d');

//Handling visual aspect of the Tetris based on dimensions of the grid (html) and tetromino size (user choice js)
var width = canvas.width;
var height = canvas.height;
var ratio = height / width;
var scaleFactor = 20;
var scaleFactorNext = 20;
ctx.scale(scaleFactor, scaleFactor);
ctxNext.scale(scaleFactorNext, scaleFactorNext);
var numberColumns = width / scaleFactor;
var backgroundGrid = createMatrix(numberColumns, numberColumns * ratio);

var player = {
  position: {
    x: math.floor(backgroundGrid[0].length / 2) - 1,
    y: 0
  },
  tetromino: [],
  score: 0,
  linesNumber : 0,
 tetrominoDropped:0,
 level:1,
 speed:1000,
}



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

function linecomplete() {
  let rowCount = 1;
  outer: for (let y = backgroundGrid.length - 1; y > 0; --y) {
    for (let x = 0; x < backgroundGrid[y].length; ++x) {
      if (backgroundGrid[y][x] === 0) {
        continue outer;
      }
    }

    const row = backgroundGrid.splice(y, 1)[0].fill(0);
    backgroundGrid.unshift(row);
    ++y;
    document.getElementById('LineSound').play();
    player.score += rowCount * 10;
    rowCount *= 2;
    player.linesNumber++
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
    ];
  } else if (type === 'T') {
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
  } else if (type === 'V') {
    return [
      [8, 8, 8],
      [8, 0, 8],
      [8, 8, 8],
    ];
  }
  else if (type === 'W') {
    return [
      [0, 0, 8],
      [0, 8, 0],
      [8, 0, 0],
    ];
  }
  else if (type === 'X') {
    return [
      [8, 0, 8],
      [0, 8, 0],
      [8, 0, 8],
    ];
  }
  else if (type === 'Y') {
    return [
      [8, 0, 8],
      [8, 0, 8],
      [8, 0, 8],
    ];
  }
  else if (type === 'A') {
    return [
      [0, 9, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  }
}

var colors = [
  null,
  'rgb(0,255,255)',
  'rgb(251,255,0)',
  'rgb(190,0,255)',
  'rgb(255,164,0)',
  'rgb(55,0,255)',
  'rgb(255,0,0)',
  'rgb(0,255,0)',
  'rgb(0,0,0)',
  'rgb(255,215,0)',
];

var colorsGhost = [
  null,
  'rgb(0,255,255,0.35)',
  'rgb(251,255,0,0.35)',
  'rgb(190,0,255,0.35)',
  'rgb(255,164,0,0.35)',
  'rgb(55,0,255,0.35)',
  'rgb(255,0,0,0.35)',
  'rgb(0,255,0,0.35)',
  'rgb(0,0,0,0.35)',
  'rgb(255,215,0,0.35)',
];

var borderColor = 'rgb(0,0,0)'
var borderColorGhost = 'rgb(0,0,0,0.35)'

var pieces = 'IOTLJZS';
var nextTetromino = createPiece(pieces[math.floor(pieces.length * Math.random())])

function resultCustom(score) {
  result=[0,0];
  if (score < 100) {
    result[0] = "Come on kid, you can do better!";
    result[1]='images/Level1.png'
  } else if (score < 1000) {
    result[0] = "Well done knight , you are on the right path!";
    result[1]='images/Level2.png'
  } else {
    result[0] = "Look at you, you are a king!";
    result[1]='images/Level3.png'
  } 
  return result
}

function resetButtons() {
  $( "#CoolDown" ).prop( "disabled", false );
  $( "#CoolDown" ).removeClass('disabled');

  $( "#Sniper" ).prop( "disabled", false );
  $( "#Sniper" ).removeClass('disabled');

  $( "#Atomic" ).prop( "disabled", false );
  $( "#Atomic" ).removeClass('disabled');

  $( "#Polymorph" ).prop( "disabled", false );
  $( "#Polymorph" ).removeClass('disabled');

  $( "#noGhost" ).prop( "disabled", false );
  $( "#noGhost" ).removeClass('disabled');
  
  $( "#Blind" ).prop( "disabled", false );
  $( "#Blind" ).removeClass('disabled');

}




function playerReset() {
  player.tetromino = nextTetromino;
  nextTetromino = createPiece(pieces[math.floor(pieces.length * Math.random())]);
  player.position.y = 0;
  player.position.x = math.floor(backgroundGrid[0].length / 2) - math.floor(player.tetromino[0].length / 2);
  player.tetrominoDropped++
  if (collision(backgroundGrid, player)) {
    document.getElementById('GameOverMusic').play();
    swal({
      title: resultCustom(player.score)[0],
      imageUrl: resultCustom(player.score)[1],
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      animation: true
    })
    backgroundGrid.forEach(row => row.fill(0));
    player.score = 0;
    player.linesNumber = 0;
   player.tetrominoDropped=0;
   start = new Date().getTime();
   chronometer();
resetButtons();
  }

}



function draw() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawTetromino(ctx, backgroundGrid, {
    x: 0,
    y: 0
  }, false);
  drawTetromino(ctx, player.tetromino, {
    x: player.position.x,
    y: ghost(backgroundGrid, player)
  }, true);
  drawTetromino(ctx, player.tetromino, player.position, false);
}

var blind=false;

function drawNext() {
  ctxNext.clearRect(0, 0, canvasNext.width, canvasNext.height);
  if (!blind){
  drawTetromino(ctxNext, nextTetromino, {
    x: 1, 
    y: 1
  }, false);}
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

function drawTetromino(context, matrix, offset, isGhost) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        if (isGhost === true) {
          context.fillStyle = colorsGhost[value];
          context.strokeStyle = borderColorGhost;
        } else {
          context.fillStyle = colors[value];
          context.strokeStyle = borderColor;
        }

        context.fillRect(x + offset.x, y + offset.y, 1, 1);
        context.beginPath();
        context.lineWidth = "0.1";
        context.rect(x + offset.x, y + offset.y, 1, 1);
        context.stroke();
      }
    });
  });
}

function updateScore() {
  $('#score').text(player.score)
  $('#lines').text(player.linesNumber)
  $('#tetrominoDropped').text(player.tetrominoDropped)
  $('#level').text(player.level)
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
    player.position.x = math.floor(backgroundGrid[0].length / 2) - 1;
    player.position.y = 0;
    playerReset();
    linecomplete();
  }

}

var customSpeed=1000;

function update() {
  player.speed=customSpeed;
  draw();
  drawNext();
  playerDrop();
  player.level=math.floor(elapsed/1000/30);
  player.speed=Math.max(100,player.speed-player.level*50);
  updateScore();
  setTimeout(update,player.speed)
}





//Keyboard user input to move left/right, rotate, smashdown

document.onkeydown = function (e) {
  document.getElementById("BackgroundMusic").play();
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
    if (player.position.x < math.floor(backgroundGrid[0].length / 2) - 1) {
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
    if (player.position.x < math.floor(backgroundGrid[0].length / 2) - 1) {
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
  drawNext();
}

var start = new Date().getTime();
var now, elapsed, m, s, format;

function chronometer() {
  setInterval(function () {
    now = new Date().getTime();
    elapsed = now - start;
    m = Math.floor(elapsed % 3600000 / 60000);
    s = Math.floor(elapsed % 60000 / 1000);
    format = ("0" + m).slice(-2) + ":" + ("0" + s).slice(-2);
    document.getElementById("chrono").innerHTML = format;
  }, 1000);
}


//Found on StackOverflow a way to run introduction tour only once.
window.onload = function () {
  if (localStorage.getItem("hasCodeRunBefore") === null) {
  
    //Discovered promises in the documentation of Sweet Alert
    swal({
      title: 'Wecome to Iron Tetris',
      text: 'Let me give you a quick tour',
      imageUrl: 'images/templatebackground.png',
      imageWidth: 400,
      imageHeight: 200,
      animation: false
    }).then(()=>{
      swal({
        title: 'Keyboard',
        text: 'Use the keys above to move and rotate pieces',
        imageUrl: 'images/keyboard.png',
        imageWidth: 706,
        imageHeight: 305,
        animation: true
      }).then(()=>{
        swal({
          title: 'Mouse',
          text: 'Click on the bonus buttons but choose your timing wisely!',
          imageUrl: 'images/bonus.png',
          imageWidth: 706,
          imageHeight: 305,
          animation: false
        }).then(()=>{
          swal({
            title: "Enough talking, ready!?",
            imageWidth: 400,
            timer: 3000,
            showConfirmButton: false
          })})
      })
    })

      localStorage.setItem("hasCodeRunBefore", true);
  } 
}


var vid = document.getElementById("BackgroundMusic");
vid.volume = 0.03;
updateScore();
playerReset();
draw();
setTimeout(update,1000)
chronometer();


$(document).ready(function(){
  $("#CoolDown").click(function(){
      $(this).addClass('disabled');
      tempSpeed=customSpeed;
      customSpeed=2000;
setTimeout(function() {
  customSpeed = tempSpeed;
}, 10000);
$(this).prop('disabled', true);
document.getElementById('CoolDownMusic').play();
  });

  $("#Sniper").click(function(){
    $(this).addClass('disabled');
    pieces = 'A'
    nextTetromino = createPiece('A');
setTimeout(function() {
  pieces = 'IOTLJZS'
}, 10000);
$(this).prop('disabled', true);
document.getElementById('SniperMusic').play();
});

$("#Atomic").click(function(){
  $(this).addClass('disabled');
  backgroundGrid[39].fill(9);
  backgroundGrid[38].fill(9);
  backgroundGrid[37].fill(9);
  backgroundGrid[36].fill(9);
  backgroundGrid[35].fill(9);
  backgroundGrid[34].fill(9);
  backgroundGrid[33].fill(9);
  backgroundGrid[32].fill(9);
  backgroundGrid[31].fill(9);
  backgroundGrid[30].fill(9);
$(this).prop('disabled', true);
document.getElementById('BombMusic').play();
});

$("#Blind").click(function(){
  $(this).addClass('disabled');
  blind=true;
  setTimeout(function() {
    blind=false;
  }, 10000);
$(this).prop('disabled', true);
});

$("#Polymorph").click(function(){
  $(this).addClass('disabled');
  pieces = 'VWXY'
setTimeout(function() {
pieces = 'IOTLJZS'
}, 10000);
$(this).prop('disabled', true);
});

$("#noGhost").click(function(){
  $(this).addClass('disabled');
  var colorTemp=colorsGhost;
  var borderTemp=borderColorGhost;

  colorsGhost = [
    null,
    'rgb(0,255,255,0)',
    'rgb(251,255,0,0)',
    'rgb(190,0,255,0)',
    'rgb(255,164,0,0)',
    'rgb(55,0,255,0)',
    'rgb(255,0,0,0)',
    'rgb(0,255,0,0)',
    'rgb(0,0,0,0)',
    'rgb(255,215,0,0)',
  ];
  
  borderColorGhost = 'rgb(0,0,0,0)'

  setTimeout(function() {
    colorsGhost=colorTemp;
    borderColorGhost=borderTemp;
  }, 5000);
$(this).prop('disabled', true);
});
});

