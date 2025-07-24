const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const vsPlayerBtn = document.getElementById('vsPlayer');
const vsComputerBtn = document.getElementById('vsComputer');

let board = Array(9).fill('');
let currentPlayer = 'X';
let isGameOver = false;
let vsComputer = false;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], 
  [0,3,6], [1,4,7], [2,5,8], 
  [0,4,8], [2,4,6]           
];

function startGame() {
  board.fill('');
  isGameOver = false;
  currentPlayer = 'X';
  statusText.textContent = `Current Turn: ${currentPlayer}`;
  cells.forEach(cell => {
    cell.className = 'cell';
  });
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      pattern.forEach(i => cells[i].classList.add('winner'));
      statusText.textContent = `${board[a]} Wins! 🎉`;
      isGameOver = true;
      return true;
    }
  }

  if (!board.includes('')) {
    statusText.textContent = `It's a Draw 😐`;
    isGameOver = true;
    return true;
  }
  return false;
}

function makeMove(index) {
  if (board[index] || isGameOver) return;

  board[index] = currentPlayer;
  cells[index].classList.add(currentPlayer.toLowerCase());

  if (!checkWinner()) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Current Turn: ${currentPlayer}`;
    if (vsComputer && currentPlayer === 'O') {
      setTimeout(computerMove, 500);
    }
  }
}

function computerMove() {
  let emptyIndices = board.map((val, idx) => val === '' ? idx : null).filter(i => i !== null);
  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(randomIndex);
}

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    makeMove(index);
  });
});

resetBtn.addEventListener('click', startGame);

vsPlayerBtn.addEventListener('click', () => {
  vsComputer = false;
  startGame();
});

vsComputerBtn.addEventListener('click', () => {
  vsComputer = true;
  startGame();
});

startGame();
