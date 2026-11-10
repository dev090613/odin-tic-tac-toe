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

const LINES = [
  [ [0, 0], [0, 1], [0, 2] ],
  [ [1, 0], [1, 1], [1, 2] ],
  [ [2, 0], [2, 1], [2, 2] ],
  [ [0, 0], [1, 0], [2, 0] ],
  [ [0, 1], [1, 1], [2, 1] ],
  [ [0, 2], [1, 2], [2, 2] ],
  [ [0, 0], [1, 1], [2, 2] ],
  [ [0, 2], [1, 1], [2, 0] ],
]

function checkWinner(board, lines=LINES) {
  for (const line of lines) {
    const [a, b, c] = line.map( ([row, col]) => board[row][col] );
    if (a !== '.' && a === b && b === c) return a;
  }
  return null;
}

playMark(Gameboard, 1, 1, players[0]);
playMark(Gameboard, 2, 1, players[1]);
printGameboard(Gameboard);
