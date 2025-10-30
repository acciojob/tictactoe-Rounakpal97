const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const submitBtn = document.getElementById('submit');
const startScreen = document.querySelector('.start-screen');
const gameScreen = document.querySelector('.game-screen');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let player1 = '';
let player2 = '';
let currentPlayer = '';
let currentSymbol = 'x';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

submitBtn.addEventListener('click', () => {
  player1 = player1Input.value.trim() || 'Player1';
  player2 = player2Input.value.trim() || 'Player2';
  currentPlayer = player1;
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  messageDiv.textContent = `${currentPlayer}, you're up`;
});

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (!gameActive || cell.textContent !== '') return;

    cell.textContent = currentSymbol;
    board[index] = currentSymbol;

    if (checkWinner()) {
      messageDiv.textContent = `${currentPlayer} congratulations you won!`;
      gameActive = false;
      return;
    }

    if (board.every(cell => cell !== '')) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    currentSymbol = currentSymbol === 'x' ? 'o' : 'x';
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    messageDiv.textContent = `${currentPlayer}, you're up`;
  });
});

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWin(pattern);
      return true;
    }
  }
  return false;
}

function highlightWin(pattern) {
  pattern.forEach(i => {
    cells[i].classList.add('win');
  });
}
