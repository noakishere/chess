
var board,
   game = new Chess();

//AI calculation

var minimaxRoot = function(depth, game, isMaximisingPlayer){
  
  var newGameMoves = game.moves();
  var bestMove =-9999;
  var bestMoveFound;

  for(var i = 0; i < newGameMoves.length; i++)
  {
    var newGameMove = newGameMoves[i];
    game.move(newGameMove);
    var value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
    game.undo();

    if(value > bestMove)
    {
      bestMove = value;
      bestMoveFound = newGameMove;
    }

    else if(value == bestMove)
    {
      if(Math.floor(Math.random() * 2) > 0.5)
      {
        bestMove = value;
        bestMoveFound = newGameMove;
      }
    }
  }

  return bestMoveFound;
}

var minimax = function (depth, game, alpha, beta, isMaximisingPlayer) {

  positionCount++;

  if(depth === 0)
    return -evaluateBoard(game.board());

  var newGameMoves = game.moves();

  if (isMaximisingPlayer)
  {
    var bestMove = -9999;
    for (var i = 0; i < newGameMoves.length; i++)
    {
      game.move(newGameMoves[i]);
      bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
      game.undo();
      alpha = Math.max(alpha, bestMove);

      if (beta <= alpha) 
        return bestMove;
    }
    return bestMove;
  }

  else
  {
    var bestMove = 9999;
    for (var i = 0; i < newGameMoves.length; i++)
    {
      game.move(newGameMoves[i]);
      bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
      game.undo();
      beta = Math.min(beta, bestMove);

      if(beta <= alpha)
        return bestMove;
    }
    return bestMove;
  }
};

//Board evaluation returns a total evaluation for the AI to decide
//uses getPieceValue function
var evaluateBoard = function (board) {
  var totalEvaluation = 0;

  for(var i = 0; i < 8; i++) {
    for(var j = 0; j < 8; j++) {
      totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i, j);
    }
  }

  return totalEvaluation;
};

var reverseArray = function(array) {
  return array.slice().reverse();
};

var pawnEvalWhite =
  [
      [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
      [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
      [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
      [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
      [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
      [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
      [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
      [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
  ];

var pawnEvalBlack = reverseArray(pawnEvalWhite);

var knightEval =
  [
      [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
      [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
      [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
      [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
      [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
      [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
      [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
      [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
  ];

var bishopEvalWhite = [
  [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
  [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
  [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
  [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
  [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
  [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
  [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
  [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

var bishopEvalBlack = reverseArray(bishopEvalWhite);

var rookEvalWhite = [
  [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
  [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
  [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
  [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
  [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
  [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
  [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
  [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

var rookEvalBlack = reverseArray(rookEvalWhite);

var evalQueen =
  [
  [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
  [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
  [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
  [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
  [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
  [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
  [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
  [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

var kingEvalWhite = [

  [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
  [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
  [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
  [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
];

var kingEvalBlack = reverseArray(kingEvalWhite);



//Each pieces value is stored in this function to be used by Piece evaluator
var getPieceValue = function (piece, x, y) {
  if (piece === null) {
      return 0;
  }
  var getAbsoluteValue = function (piece, isWhite, x ,y) {
      if (piece.type === 'p') {
          return 10 + ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
      } else if (piece.type === 'r') {
          return 50 + ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
      } else if (piece.type === 'n') {
          return 30 + knightEval[y][x];
      } else if (piece.type === 'b') {
          return 30 + ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
      } else if (piece.type === 'q') {
          return 90 + evalQueen[y][x];
      } else if (piece.type === 'k') {
          return 900 + ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
      }
      throw "Unknown piece type: " + piece.type;
  };

  var absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y);
  return piece.color === 'w' ? absoluteValue : -absoluteValue;
};


/*
 --Board visualization--
*/

var onDragStart = function (source, piece, position, orientation) {
  if (game.in_checkmate() === true || game.in_draw() === true ||
      piece.search(/^b/) !== -1) {
      return false;
  }
};

//AI best moves
//references getBestMove function
var makeBestMove = function() {
  var bestMove = getBestMove(game);

  game.move(bestMove);

  board.position(game.fen());

  // renderMoveHistory(game.history());

  if(game.game_over())
    alert('Game OVER');

  window.setTimeout(makeBestMove, 500);
};

var positionCount;
//uses calculateBestMove to return the value to makeBestMove
var getBestMove = function (game) {
  if(game.game_over()) 
    alert('Game OVER');

  positionCount = 0;
  var depth =3;

  var d = new Date().getTime();
  var bestMove = minimaxRoot(depth, game, true);
  var d2 = new Date().getTime();
    var moveTime = (d2 - d);
    $('#position-count').text(positionCount);
    $('#time').text(moveTime/1000 + 's');
  return bestMove;
};


//random game
function makeRandomMove() {
  var possibleMoves = game.moves();

  //game over
  if(possibleMoves.length == 0)
    return alert("It's done. Pathetic.");

    //I dont understand this?
  var randomIdx = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIdx]);
  board.position(game.fen());
}

function onDrop(source, target)
{
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // promotes to queen
  });

  removeGreySquares();
  //if illegal move, nuh uh !
  if (move == null) 
    return 'snapback';

  //make a move, filthy AI
  window.setTimeout(makeBestMove,250);
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd(){
  board.position(game.fen());
}

function onChange (oldPos, newPos)
{
  console.log('Old position: ' + Chessboard.objToFen(oldPos));
  console.log('New Position: ' + newPos);
}


var onMouseoverSquare = function(square, piece) {
    var moves = game.moves({
        square: square,
        verbose: true
    });

    if (moves.length === 0) return;

    greySquare(square);

    for (var i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
    }
};

var onMouseoutSquare = function(square, piece) {
    removeGreySquares();
};

var removeGreySquares = function() {
    $('#board .square-55d63').css('background', '');
};

var greySquare = function(square) {
    var squareEl = $('#board .square-' + square);

    var background = '#a9a9a9';
    if (squareEl.hasClass('black-3c85d') === true) {
        background = '#696969';
    }

    squareEl.css('background', background);
};

//configuration
var config = {
  draggable: true,
  onChange: onChange,
  // onDragStart: onDragStart,
  // onDrop: onDrop,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare, 
  onSnapEnd, onSnapEnd,
  position: 'start'
};

board = Chessboard('board', config)

window.setTimeout(makeBestMove, 500);

$('#startBtn').on('click', board.start);
$('#clearBtn').on('click', board.clear);
$('#flip').on('click', board.flip);
$('#rndmBtn').on('click',function(){
  board.start();
  window.setTimeout(makeRandomMove, 500);
});
$("#undoBtn").click(function(){
  game.undo();
});
