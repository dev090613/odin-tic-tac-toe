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

  const players = [
    { name: 'Player1', mark: 'X' },
    { name: 'Player2', mark: 'O' }
  ];

  let turnIndex = 0;

  const getStatus = (board) => {
    const winner = checkWinner(board);
    if (winner) return { status: 'won', winner: players.find(p => p.mark === winner) };
    if (board.isFull()) return { status: 'draw', winner: null };
    return { status: 'playing', winner: null };
  }

  const checkWinner = (board) => {
    for (const line of LINES) {
      const [a, b, c] = line.map( ([row, col]) => board.getCell(row, col));
      if (a !== '.' && a === b && b === c) return a;
    }
    return null;
  }

  function playTurn(board, row, col) {
    if (!getStatus(board).status !== 'playing') return false;

    const player = getCurrentPlayer();
    const mark = player.mark;

    if (!board.placeMark(row, col, mark)) {
      return false
    }

    turnIndex = (turnIndex + 1) % players.length;
    return true
  };

  const getCurrentPlayer = () => players[turnIndex];
  const reset = () => { 
    turnIndex = 0 
  };

  return { checkWinner, getStatus, getCurrentPlayer, reset, playTurn }

})();



Gameboard.getCell(0, 0)
