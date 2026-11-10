const Gameboard = (() => {
  const board = generateGameboard();

  function generateGameboard () {
    const gameBoard = [];

    for (let i = 0; i < 3; i++) {
      const temp = new Array(3).fill('.');
      gameBoard.push(temp);
    }
    return gameBoard;
  }

  const placeMark = (row, col, mark) => {
    const isRange = (row >= 0) && (row < 3) &&
      (col >= 0) && (col < 3)

    if (!isRange) return false;

    const cell = board[row][col];
    if (cell === '.') {
      board[row][col] = mark;
      return true;
    }
    return false;
  }

  const reset = () => board.forEach( row => row.fill('.') );

  const isFull = () => board.every( (row) => row.every( cell => cell !== '.' ) );
  
  const getCell = (row, col) => board[row][col]

  return { 
    getCell, placeMark, reset, isFull 
  }

})();

const Game = ( () => {
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

  function checkWinner(lines=LINES) {
    for (const line of lines) {
      const [a, b, c] = line.map( ([row, col]) => Gameboard.getCell(row, col));
      if (a !== '.' && a === b && b === c) return a;
    }
    return null;
  }

  return { checkWinner }

})();

const Players = ( () => {
  const players = [ 'O', 'X' ];

  return { players }
})();




placeMark(Gameboard, 1, 1, players[0]);
placeMark(Gameboard, 2, 1, players[1]);
printGameboard(Gameboard);
