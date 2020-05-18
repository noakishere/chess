
const game = new Chess();


function onDragStart (source, piece, position, orientation)
{
  // dont pick up pieces if the game is over
  if (game.game_over()) 
    return false;

    // only pick up pieces for White
  if (piece.search(/^b/) !== -1) 
    return false;
}

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

  //if illegal move, nuh uh !
  if (move == null) 
    return 'snapback';

  //make random legal move for black  
  window.setTimeout(makeRandomMove,250);
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

function makeRandomMove() {
  var possibleMoves = game.moves()

  // exit if the game is over
  if (game.game_over()) return

  //I dont understand this?
  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  game.move(possibleMoves[randomIdx])
  board.position(game.fen())

  window.setTimeout(makeRandomMove, 500)
}



var config = {
  sparePieces: true,
  draggable: true,
  onChange: onChange,
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd, onSnapEnd
};

var board = Chessboard('board1', config)


$('#startBtn').on('click', board.start);
$('#clearBtn').on('click', board.clear);
$('#flip').on('click', board.flip);
$('#rndmBtn').on('click',function(){
  board.start();
  window.setTimeout(makeRandomMove, 500);
});