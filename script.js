const Gameboard = generateGameboard();

function generateGameboard () {
  const gameBoard = [];

  for (let i = 0; i < 3; i++) {
    const temp = new Array(3).fill('.');
    gameBoard.push(temp);
  }
  return gameBoard;
}

function printGameboard(board) {
  console.table(board);
}

printGameboard(Gameboard);
