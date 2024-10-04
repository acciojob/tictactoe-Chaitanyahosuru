//your JS code here. If required.
document.getElementById('submit').addEventListener('click', function() {
    // Get player names
    const player1 = document.getElementById('player-1').value;
    const player2 = document.getElementById('player-2').value;

    // Show error if players' names are empty
    if (!player1 || !player2) {
        alert('Please enter both player names.');
        return;
    }

    // Hide the form and show the game board
    document.getElementById('player-form').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';

    // Initialize game
    let currentPlayer = player1;
    let currentSymbol = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = `${currentPlayer}, you're up!`;

    // Cell click event handler
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.addEventListener('click', function() {
            const cellIndex = cell.id - 1;

            if (boardState[cellIndex] === '' && gameActive) {
                boardState[cellIndex] = currentSymbol;
                cell.innerHTML = currentSymbol;

                // Check for a win or tie
                if (checkWin(boardState)) {
                    gameActive = false;
                    messageDiv.innerHTML = `${currentPlayer}, congratulations you won!`;
                } else if (boardState.every(cell => cell !== '')) {
                    messageDiv.innerHTML = `It's a tie!`;
                } else {
                    // Switch players
                    currentPlayer = currentPlayer === player1 ? player2 : player1;
                    currentSymbol = currentSymbol === 'X' ? 'O' : 'X';
                    messageDiv.innerHTML = `${currentPlayer}, you're up!`;
                }
            }
        });
    });

    // Check if someone has won the game
    function checkWin(board) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningCombinations.some(combination => {
            return combination.every(index => board[index] === currentSymbol);
        });
    }
});

