const Gameboard = generateGameboard();
const players = [ 'O', 'X' ];

function generateGameboard () {
  const gameBoard = [];

  for (let i = 0; i < 3; i++) {
    const temp = new Array(3).fill('.');
    gameBoard.push(temp);
  }
  return gameBoard;
}

function playMark(board, row, col, player) {
  const isRange = (row >= 0) && (row < 3) &&
    (col >= 0) && (col < 3)

  if (!isRange) return false;

  const cell = board[row][col];
  if (cell === '.') {
    board[row][col] = player;
    return true;
  }
  return false;
}

function printGameboard(board) {
  console.table(board);
}

playMark(Gameboard, 1, 1, players[0]);
playMark(Gameboard, 2, 1, players[1]);
printGameboard(Gameboard);
