let board = Array(9).fill().map(() => Array(9).fill(''));
let inputElements = Array(9).fill().map(() => Array(9).fill(null));

window.onload = () => {
    let boardDiv = document.getElementById('board');
    for(let gridRow = 0; gridRow < 3; gridRow++) {
        for(let gridCol = 0; gridCol < 3; gridCol++) {
            let grid = document.createElement('div');
            grid.className = 'grid';
            boardDiv.appendChild(grid);

            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    let row = gridRow * 3 + i;
                    let col = gridCol * 3 + j;

                    let input = document.createElement('input');
                    input.type = "number";
                    input.min = 1;
                    input.max = 9;
                    input.addEventListener('input', () => {
                        if (input.value) {
                            if(input.value >= 1 && input.value <= 9) {
                                board[row][col] = parseInt(input.value);
                            } else {
                                input.value = '';
                            }
                        } else {
                            board[row][col] = '';
                        }
                    });
                    grid.appendChild(input);
                    inputElements[row][col] = input;
                }
            }
        }
    }
}

function solveBoard() {
    if (solve(0, 0)) {
        inputElements.forEach((row, i) => {
            row.forEach((input, j) => {
                input.value = board[i][j];
            });
        });
    } else {
        alert('No solution exists for the given Sudoku');
    }
}

function clearBoard() {
    inputElements.forEach(row => {
        row.forEach(input => {
            input.value = '';
        });
    });
    board = Array(9).fill().map(() => Array(9).fill(''));
}

function solve(row, col) {
    if (row === 9) {
        return true;
    }

    if (col === 9) {
        return solve(row + 1, 0);
    }

    if (board[row][col] !== '') {
        return solve(row, col + 1);
    }

    for(let num = 1; num <= 9; num++) {
        if (isSafe(board, row, col, num)) {
            board[row][col] = num;

            if (solve(row, col + 1)) {
                return true;
            }

            board[row][col] = '';
        }
    }

    return false;
}

function isSafe(board, row, col, num) {
    for(let x = 0; x <= 8; x++) {
        if (board[row][x] == num) {
            return false;
        }
    }

    for(let x = 0; x <= 8; x++) {
        if (board[x][col] == num) {
            return false;
        }
    }

    let startRow = row - row % 3, startCol = col - col % 3;
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] == num) {
                return false;
            }
        }
    }

    return true;
}
