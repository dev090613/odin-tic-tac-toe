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
