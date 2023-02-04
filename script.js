const makeGameBoard = (() => {
  const gameBoard = document.getElementById('gameBoard');

  const boardArray = ['', '', '', '', '', '', '', '', ''];

  function newBoard() {
    for (let i = 0; i < boardArray.length; i++) {
      const newBox = document.createElement('div');
      newBox.classList.add('box');
      newBox.setAttribute('data-index', i);
      newBox.addEventListener('click', (e) => {
        playRound.placeMove(e);
      }, { once: true });
      gameBoard.appendChild(newBox);
    }
  }

  function clearBoard() {
    gameBoard.innerHTML = '';
  }

  return { newBoard, clearBoard };
})();

const playRound = (() => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // tracks player's moves
  const xMoves = [];
  const oMoves = [];
  let moveCount = 0;
  let playerTurn = 'x';
  // indicates current player's turn
  const displayTurnX = document.getElementById('playerX');
  const displayTurnO = document.getElementById('playerO');
  const restartButton = document.getElementById('button');
  const popUp = document.getElementById('pop-up');

  function displayTurn() {
    if (playerTurn === 'x') {
      displayTurnX.classList.add('highlighted');
      displayTurnO.classList.remove('highlighted');
    } else {
      displayTurnO.classList.add('highlighted');
      displayTurnX.classList.remove('highlighted');
    }
  }

  function checkWin() {
    winningCombos.forEach((array) => {
      if (array.every((element) => xMoves.includes(element))) {
        popUp.innerHTML = 'x wins';
        popUp.classList.remove('hidden');
      } else if (array.every((element) => oMoves.includes(element))) {
        popUp.innerHTML = 'o wins';
        popUp.classList.remove('hidden');
      } else if (moveCount === 9) {
        popUp.innerHTML = 'draw';
        popUp.classList.remove('hidden');
      }
    });
  }

  function placeMove(e) {
    const moveIndex = e.target.getAttribute('data-index');
    if (playerTurn === 'x') {
      e.target.innerHTML = 'X';
      xMoves.push(parseInt(moveIndex));
      console.log(xMoves);
      playerTurn = 'o';
    } else {
      e.target.innerHTML = 'O';
      oMoves.push(parseInt(moveIndex));
      console.log(oMoves);
      playerTurn = 'x';
    }
    moveCount += 1;
    checkWin();
    displayTurn();
  }

  function restart() {
    xMoves.length = 0;
    oMoves.length = 0;
    moveCount = 0;
    makeGameBoard.clearBoard();
    makeGameBoard.newBoard();
    popUp.classList.add('hidden');
  }
  restartButton.addEventListener('click', restart);

  return { placeMove };
})();

makeGameBoard.newBoard();
