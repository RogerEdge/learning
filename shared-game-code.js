let gameOver = false
let player1 = '⚫️'
let player2 = '🔴'
let currentPlayer = player1;

function setCurrentPlayer(player){
  currentPlayer = player;  
}

function onClick(id, boardMemory,checkForWinner) {
  //If the game is over, prevent anymore code from running
  if (gameOver){
    return
  }

  if (!boardMemory[id]) {
    //mark the memory space with the current player
    boardMemory[id] = currentPlayer;
    //mark the space with the current players emoji
    document.getElementById(id).innerHTML = currentPlayer;
    const isPlayerOne = currentPlayer === player1
    const isGameOver = checkForWinner();
    if (isGameOver){
      gameOver=true
      const winningPlayer = isPlayerOne ? 1 : 2
      setTimeout(() => {
        alert('✅ player ' + winningPlayer + ' won')
      }, 1);
    }
    
    //change players
    currentPlayer = isPlayerOne ? player2 : player1;
  }
}
