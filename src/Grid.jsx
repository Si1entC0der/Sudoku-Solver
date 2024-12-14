import { useState } from "react";
import { solveSudoku } from "./Solver";
import Toast from "./Toast";

const Grid = () => {
  const [board, setBoard] = useState(
    Array(9)
      .fill(0)
      .map(() => Array(9).fill(0))
  );
  const [userInputs, setUserInputs] = useState(
    Array(9)
      .fill(0)
      .map(() => Array(9).fill(false))
  );

  const [isSolved, setIsSolved] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e, row, col) => {
    const value = parseInt(e.target.value) || 0;

    if (value >= 0 && value <= 9) {
      const newBoard = [...board];

      // Check for duplicates in the same row, column, or 3x3 box
      const isDuplicate = (val, r, c) => {
        for (let i = 0; i < 9; i++) {
          // Check row and column
          if (
            (newBoard[r][i] === val && i !== c) ||
            (newBoard[i][c] === val && i !== r)
          ) {
            return true;
          }
        }
        // Check the 3x3 box
        const startRow = Math.floor(r / 3) * 3;
        const startCol = Math.floor(c / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
          for (let j = startCol; j < startCol + 3; j++) {
            if (newBoard[i][j] === val && !(i === r && j === c)) {
              return true;
            }
          }
        }
        return false;
      };

      if (!isDuplicate(value, row, col)) {
        // If no duplicate, update the board and mark user input
        const newUserInputs = [...userInputs];
        newBoard[row][col] = value;
        newUserInputs[row][col] = value !== 0; // Mark as user input if value is not zero
        setBoard(newBoard);
        setUserInputs(newUserInputs);
      } else {
        setToastMessage(
          "Invalid move! Duplicate number in row, column, or box."
        ); // Set the error message
        setShowToast(true); // Show the toast
        setTimeout(() => setShowToast(false), 1500); 
      }
    }
  };

  const handleKeyDown = (e, row, col) => {
    const key = e.key;
    if (key === "Enter" || key === " ") {
      e.preventDefault();
      moveFocus(row, col, "right");
    }
    if (key === "ArrowUp") moveFocus(row, col, "up");
    else if (key === "ArrowDown") moveFocus(row, col, "down");
    else if (key === "ArrowLeft") moveFocus(row, col, "left");
    else if (key === "ArrowRight") moveFocus(row, col, "right");
  };

  const moveFocus = (row, col, direction) => {
    const totalRows = 9;
    const totalCols = 9;
    let newRow = row,
      newCol = col;
    switch (direction) {
      case "up":
        newRow = row > 0 ? row - 1 : row;
        break;
      case "down":
        newRow = row < totalRows - 1 ? row + 1 : row;
        break;
      case "left":
        newCol = col > 0 ? col - 1 : col;
        break;
      case "right":
        newCol = col < totalCols - 1 ? col + 1 : col;
        break;
      default:
        break;
    }
    const nextInput = document.getElementById(`cell-${newRow}-${newCol}`);
    if (nextInput) nextInput.focus();
  };

  const handleSolve = () => {
    const newBoard = [...board];
    if (solveSudoku(newBoard)) {
      setBoard(newBoard);
      setIsSolved(true);
    } else {
      setToastMessage("No solution exists for the given Sudoku!"); // Set the error message
      setShowToast(true); // Show the toast
      setTimeout(() => setShowToast(false), 1000); 
    }
  };

  const handleReset = () => {
    setBoard(
      Array(9)
        .fill(0)
        .map(() => Array(9).fill(0))
    );
    setUserInputs(
      Array(9)
        .fill(0)
        .map(() => Array(9).fill(false))
    );
    window.location.reload();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto rounded-xl shadow-md space-y-4 bg-blue-100">
      <div className="grid grid-cols-9">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <input
              key={`${i}-${j}`}
              id={`cell-${i}-${j}`}
              type="text"
              value={cell === 0 ? "" : cell}
              onChange={(e) => handleChange(e, i, j)}
              onKeyDown={(e) => handleKeyDown(e, i, j)}
              className={`w-11 h-11 text-center text-lg border
                ${i === 0 ? "border-t-4" : ""}  
                ${i === 8 || i % 3 === 2 ? "border-b-4" : "border-b-dotted"}  
                ${j === 0 ? "border-l-4" : ""}  
                ${j === 8 || j % 3 === 2 ? "border-r-4" : "border-r-dotted"}  
                border-[#243c5a] 
                ${
                  userInputs[i][j]
                    ? "bg-blue-200 text-black"
                    : "bg-gray-100 text-black"
                }`}
              maxLength="1"
              disabled={isSolved}
            />
          ))
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
        >
          Reset
        </button>
        <button
          onClick={handleSolve}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
        >
          Solve
        </button>
      </div>

      <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />

    </div>
  );
};

export default Grid;