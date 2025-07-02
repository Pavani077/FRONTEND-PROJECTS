const board = [];
const rows = 6;
const cols = 7;
let currentPlayer = 'red';

// Initialize the board with empty cells
for (let row = 0; row < rows; row++) {
    board.push([]);
    for (let col = 0; col < cols; col++) {
        board[row].push('');
    }
}

// Create the board in the HTML
const boardElement = document.getElementById('board');
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-row', row);
        cell.setAttribute('data-col', col);
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }
}

function handleCellClick(event) {
    const row = parseInt(event.target.getAttribute('data-row'));
    const col = parseInt(event.target.getAttribute('data-col'));

    // Find the lowest empty row in the column
    let targetRow = -1;
    for (let i = rows - 1; i >= 0; i--) {
        if (board[i][col] === '') {
            targetRow = i;
            break;
        }
    }

    if (targetRow !== -1) {
        board[targetRow][col] = currentPlayer;
        event.target.classList.add(currentPlayer);

        if (checkWin(currentPlayer)) {
            alert(currentPlayer + ' wins!');
            resetGame();
        } else if (isBoardFull()) {
            alert("It's a draw!");
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
        }
    }
}

function checkWin(player) {
    // Check horizontal
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 3; col++) {
            if (board[row][col] === player &&
                board[row][col + 1] === player &&
                board[row][col + 2] === player &&
                board[row][col + 3] === player) {
                return true;
            }
        }
    }
 // Check vertical
 for (let row = 0; row < rows - 3; row++) {
    for (let col = 0; col < cols; col++) {
        if (board[row][col] === player &&
            board[row + 1][col] === player &&
            board[row + 2][col] === player &&
            board[row + 3][col] === player) {
            return true;
        }
    }
}

// Check diagonal (top-left to bottom-right)
for (let row = 0; row < rows - 3; row++) {
    for (let col = 0; col < cols - 3; col++) {
        if (board[row][col] === player &&
            board[row + 1][col + 1] === player &&
            board[row + 2][col + 2] === player &&
            board[row + 3][col + 3] === player) {
            return true;
        }
    }
}

// Check diagonal (top-right to bottom-left)
for (let row = 0; row < rows - 3; row++) {
    for (let col = 3; col < cols; col++) {
        if (board[row][col] === player &&
            board[row + 1][col - 1] === player &&
            board[row + 2][col - 2] === player &&
            board[row + 3][col - 3] === player) {
            return true;
        }
    }
}

return false;
}

function isBoardFull() {
for (let col = 0; col < cols; col++) {
    if (board[0][col] === '') {
        return false;
    }
}
return true;
}

function resetGame() {
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        board[row][col] = '';
        const cell = document.querySelectorAll('.cell')[row * cols + col];
        cell.classList.remove('red', 'yellow');
    }
}
currentPlayer='red';
}