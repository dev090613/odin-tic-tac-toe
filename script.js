const Player = (sign) => {
  const getSign = () => sign;
  return { getSign }
}

const gameBoard = ( () => {
  const board = Array.from(9).fill(".");

  const isValidIndex = (index) =>
    (Number.isInteger(index) && index >= 0 && index < board.length);

  const setField = (index, sign) => {
    if (!isValidIndex(index)) return false;
    board[index] = sign;
    return true;
  };

  const getField = (index) => {
    if (!isValidIndex(index)) return undefined;
    return board[index];
  };

  const getBoard = () => [...board];

  const reset = () => board.fill(".");

  return { setField, getField, getBoard, reset };
})();

const gameController = (() => {
  const playerX = Player("X");
  const playerO = Player("O");

  let round = 1;
  let isOver = false;

  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // 가로
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // 세로
    [0, 4, 8], [2, 4, 6] // 대각선
  ]

  const getCurrentPlayerSign = () =>
    round % 2 === 1 ? playerX.getSign() : playerO.getSign();

  const getIsOver = () => isOver;

  const checkWinner = (index) => {
    const sign = gameBoard.getField(index);
    if (!sign) return false;

    return winningCombos
      .filter( (combo) => combo.includes(index) )
      .some( (combo) => combo.every( (i) => gameboard.getField(i) === sign ) )
  }

  const playRound = (index) => {
    if (isOver) return { status: "over" }
    if (gameBoard.getField(index) != "") return { status: "occupied" };

    const sign = getCurrentPlayerSign()
    if (!gameBoard.setField(index, sign)) return { status: "invalid" };

    if (checkWinner(index)) {
      isOver = true;
      return { status: "win", sign, index };
    }

    if (round === 9) {
      isOver = true;
      return { status: "draw", index };
    }

    round += 1;
    return { status: "continue", sign, index }
  };

  const reset = () => {
    round = 1;
    isOver = false;
    gameBoard.reset();
  };

  return { playRound, getCurrentPlayerSign, getIsOver, reset }

})();

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
