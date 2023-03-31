// Define the size of the grid
const numRows = 6;
const numCols = 7;

// Define the values to search for
const matchValue = '⚫️';



// Check for horizontal matches
for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols - 3; col++) {
    if(row === 5 && col === 0){
      console.log('r5c0', boardMemory[row][col])
    }
    if (boardMemory[row][col] === matchValue &&
        boardMemory[row][col + 1] === matchValue &&
        boardMemory[row][col + 2] === matchValue &&
        boardMemory[row][col + 3] === matchValue) {
      console.log(`Horizontal match found at row ${row} and column ${col}`);
    }
  }
}

// Check for vertical matches
for (let row = 0; row < numRows - 3; row++) {
  for (let col = 0; col < numCols; col++) {
    if (boardMemory[row][col] === matchValue &&
        boardMemory[row + 1][col] === matchValue &&
        boardMemory[row + 2][col] === matchValue &&
        boardMemory[row + 3][col] === matchValue) {
      console.log(`Vertical match found at row ${row} and column ${col}`);
    }
  }
}

// Check for diagonal matches (top-left to bottom-right)
for (let row = 0; row < numRows - 3; row++) {
  for (let col = 0; col < numCols - 3; col++) {
    if (boardMemory[row][col] === matchValue &&
        boardMemory[row + 1][col + 1] === matchValue &&
        boardMemory[row + 2][col + 2] === matchValue &&
        boardMemory[row + 3][col + 3] === matchValue) {
      console.log(`Diagonal match (top-left to bottom-right) found at row ${row} and column ${col}`);
    }
  }
}

// Check for diagonal matches (bottom-left to top-right)
for (let row = 3; row < numRows; row++) {
  for (let col = 0; col < numCols - 3; col++) {
    if (boardMemory[row][col] === matchValue &&
        boardMemory[row - 1][col + 1] === matchValue &&
        boardMemory[row - 2][col + 2] === matchValue &&
        boardMemory[row - 3][col + 3] === matchValue) {
      console.log(`Diagonal match (bottom-left to top-right) found at row ${row} and column ${col}`);
    }
  }
}