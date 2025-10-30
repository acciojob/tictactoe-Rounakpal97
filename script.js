//your JS code here. If required.
const startScreen = document.querySelector('.start-screen');
const gameScreen = document.querySelector('.game-screen');
const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const submitBtn = document.getElementById('submit');
const message = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let player1 = '';
let player2 = '';
let currentPlayer = '';
let currentSymbol = 'X';
let gameActive = true;
let board = Array(9).fill('');

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

// Start game
submitBtn.addEventListener('click', () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (!player1 || !player2) {
    alert('Please enter names for both players!');
    return;
  }

  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');

  currentPlayer = player1;
  currentSymbol = 'X';
  message.textContent = `${currentPlayer}, you're up`;
});

// Cell click
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (!gameActive || board[index] !== '') return;

    board[index] = currentSymbol;
    cell.textContent = currentSymbol;

    if (checkWinner()) {
      message.textContent = `${currentPlayer}, congratulations you won!`;
      highlightWinner();
      gameActive = false;
      return;
    }

    if (board.every(cell => cell !== '')) {
      message.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    // Switch turn
    if (currentPlayer === player1) {
      currentPlayer = player2;
      currentSymbol = 'O';
    } else {
      currentPlayer = player1;
      currentSymbol = 'X';
    }

    message.textContent = `${currentPlayer}, you're up`;
  });
});

function checkWinner() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    );
  });
}

function highlightWinner() {
  winningCombos.forEach(combo => {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      document.getElementById(a + 1).classList.add('winner');
      document.getElementById(b + 1).classList.add('winner');
      document.getElementById(c + 1).classList.add('winner');
    }
  });
}
