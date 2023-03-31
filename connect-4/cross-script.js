// Define the board memory object
const boardMemory = [
  ['', '', '', '', '', '', ''], // 0
  ['', '', '', '', '', '', ''], // 1
  ['', '', '', '', '', '', ''], // 2
  ['', '', '', '', '', '', ''], // 3
  ['', '', '', '', '', '', ''], // 4
  ['', '', '', '', '', '', ''], // 5
];

function convertIdToPositions(string){

  // Split the string into parts based on the "-" separator
const parts = string.split("-");

// Extract the numbers from the parts
const y = parseInt(parts[1]);
const x = parseInt(parts[3]);
  return {
    x:x-1,y:y-1
  }
}

function getDropPosition(y,x){
  const length=boardMemory.length
  for (let i = y; i < length; i++) {    
    const currentSpace=boardMemory[i][x]
    if(currentSpace) {
      // go back one space
      if(boardMemory[i-1] && !boardMemory[i-1][x]) {
        return i-1
      }

      return -1
    }

    
    const isNotTooFar=i<length-1
    // if its not the end then run the code in me
    if(isNotTooFar){
      const nextSpace=boardMemory[i+1][x]
      if(nextSpace){
        return i //solved the hunt
      }

      //the next space is free
    }

    //we have reached the last space
  }
  return length-1
}

function reportId() {
  const positions=convertIdToPositions(this.id)
  const x =positions.x  
  let y = positions.y 
  y = getDropPosition(y,x)

  if(y < 0) {
    alert('invalid move')
    return
  }
  
  //this is where the players space is marked
  boardMemory[y][x]= currentPlayer
  const id = 'row-' + (y+1) + '-col-' + (x + 1)

  onClick(id,{},checkForWinner)
}

function checkForWinner(){
  const didWin1=checkForWinnerBy(player1)
  if(didWin1){
    return true
  }
  
  const didWin2=checkForWinnerBy(player2)
  if(didWin2){
    return true
  }
}

function checkForWinnerBy(matchValue){

  // Define the size of the grid
  const numRows = 6;
  const numCols = 7;

  // Check for horizontal matches
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols - 3; col++) {
      if (boardMemory[row][col] === matchValue &&
          boardMemory[row][col + 1] === matchValue &&
          boardMemory[row][col + 2] === matchValue &&
          boardMemory[row][col + 3] === matchValue) {
        return true
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
        return true
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
        return true
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
            return true
      }
    }
  }
}

window.onload = function() {
  var tds = document.getElementsByTagName("td");
  for (var i = 0; i < tds.length; i++) {
  tds[i].addEventListener("click", reportId);
  }
}