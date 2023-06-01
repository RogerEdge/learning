import { ReactBoard } from "./ReactBoard.class";



export class ReactTic extends ReactBoard {
  gameName = 'tictactoe'
  blankBoard = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  checkForWinner(gameSession) {

    var winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (var i = 0; i < winningCombinations.length; i++) {
      var combo = winningCombinations[i];
      if (gameSession.board[combo[0]] !== "" && gameSession.board[combo[0]] === gameSession.board[combo[1]] && gameSession.board[combo[1]] === gameSession.board[combo[2]]) {
        document.getElementById("winner").innerHTML = "Winner: " + gameSession.board[combo[0]];
        this.disableBoard();
        return true;
      }
    }
    if (gameSession.board.every((val) => val !== "")) {
      document.getElementById("winner").innerHTML = "Tie!";
    }
    console.log('gameSession.board', gameSession.board)
  }


}
