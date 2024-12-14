const N = 9;

// Bitmasks for each row/column/box
let row = new Array(N).fill(0), col = new Array(N).fill(0), box = new Array(N).fill(0);
let seted = false;

// Utility function to find the box index
function getBox(i, j) {
    return Math.floor(i / 3) * 3 + Math.floor(j / 3);
}

// Utility function to check if a number is present in the corresponding row/column/box
function isSafe(i, j, number) {
    return !((row[i] >> number) & 1) && !((col[j] >> number) & 1) && !((box[getBox(i, j)] >> number) & 1);
}

// Utility function to set the initial values of a Sudoku board (map the values in the bitmasks)
function setInitialValues(grid) {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (grid[i][j] !== 0) { // Only set if cell is filled
                row[i] |= 1 << grid[i][j];
                col[j] |= 1 << grid[i][j];
                box[getBox(i, j)] |= 1 << grid[i][j];
            }
        }
    }
}

// The core solving function using backtracking and bitmasks
export function solveSudoku(grid, i = 0, j = 0) {
    // Set the initial values
    if (!seted) {
        seted = true;
        setInitialValues(grid);
    }

    if (i == N - 1 && j == N)
        return true;

    if (j == N) {
        j = 0;
        i++;
    }

    if (grid[i][j] !== 0)
        return solveSudoku(grid, i, j + 1);

    for (let nr = 1; nr <= N; nr++) {
        if (isSafe(i, j, nr)) {
            grid[i][j] = nr;
            row[i] |= 1 << nr;
            col[j] |= 1 << nr;
            box[getBox(i, j)] |= 1 << nr;

            if (solveSudoku(grid, i, j + 1)) {
                return true;
            }

            // Backtrack
            grid[i][j] = 0;
            row[i] &= ~(1 << nr);
            col[j] &= ~(1 << nr);
            box[getBox(i, j)] &= ~(1 << nr);
        }
    }

    return false;
}
