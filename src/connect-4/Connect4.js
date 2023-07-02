import { useCallback, useEffect, useState } from "react"
import "./Connect4.css"
import { PlayerSelects } from "../PlayerSelects"
import { ReactBoard } from "../ReactBoard.class"
import { getPlayer1Emoji, getPlayer2Emoji } from "../shared-game-code"

export class Connect4Board extends ReactBoard {
  gameName = 'connect4'
  blankBoard = [
// 0,0 0,1 0,2 0,3 0,4 0,5 0,6
    "", "", "", "", "", "", "",//0-6
    "", "", "", "", "", "", "",//7-13
    "", "", "", "", "", "", "",//14-20
    "", "", "", "", "", "", "",//21-27
    "", "", "", "", "", "", "",//28-34
    "", "", "", "", "", "", "",//35-41
  ];

  getSpot(row, col) {
    const index = getSpotIndex(row, col)
    const gameSession = this.getGameSession()
    const result = gameSession.board[index]
    //const result=this.blankBoard[index]
    return result
  }

  checkForWinner(gameSession){
    const result=checkForWinner(this)
    /*if (gameSession.board[combo[0]] !== "" && gameSession.board[combo[0]] === gameSession.board[combo[1]] && gameSession.board[combo[1]] === gameSession.board[combo[2]]) {
      document.getElementById("winner").innerHTML = "Winner: " + gameSession.board[combo[0]];
      this.disableBoard();
      return true;
    }*/
    return result
  }

  getDropPosition(id) {//y,x
    const depth = 6 //boardMemory.length
    const length = 7
    const x = id === depth ? depth : (id % depth)
    const y = Math.floor(id / length)
    for (let i = y; i < depth; i++) {
      const currentSpace = this.getSpot(i,x)//boardMemory[i][x]
      if (currentSpace) {
        // go back one space
        for (let backI = i - 1; backI >= 0; backI--) {
          if (!this.getSpot(backI,x)) {
            console.log("MMMM")
            return backI
          }
        }
  
        return -1
      }
  
  
      const isNotTooFar = i < depth - 1
      // if its not the end then run the code in me
      if (isNotTooFar) {
        const nextSpace = this.getSpot(i+1,x)//boardMemory[i + 1][x]
        if (nextSpace) {
          return i * length + x//solved the hunt
        }
        
        //the next space is free
      }
      
      //we have reached the last space
    }
    console.log("ppp",y,x)
    return ((depth-1) * length) + x //solved the hunt
    //return depth - 1
    
  }
  

}

let boardGame;
export function Connect4() {
  const [hasError, error] = useErrorBoundary();
  if (hasError) {
    console.log('error', error)
  }

  const [gameSession, setGameSession] = useState({})
  useEffect(() => {
    boardGame = new Connect4Board(setGameSession)
    console.log('load')
    try {

      boardGame.load()
    } catch (error) {
      console.log('error ppp', error)
    }
  }, [])

  const handleReset = () => {
    boardGame.resetGame()
  }

  useEffect(() => {
    console.log('load maybe')
    //load()
  }, [])

  const handleSetPlayer1 = (event) => {
    boardGame.setPlayer1(event.target.value)
  }
  const handleSetPlayer2 = (event) => {
    boardGame.setPlayer2(event.target.value)
  }

  return (
    <div>
      <h1 className="title">Connect-4</h1>
      <PlayerSelects
        handleSetPlayer1={handleSetPlayer1}
        handleSetPlayer2={handleSetPlayer2}
        onStart={() => boardGame.start()}
        gameSession={gameSession}
      ></PlayerSelects>
      <br />
      <br />
      current player:{gameSession.currentPlayer}
      <br />
      <br />
      <table>
        <tbody>

          <tr id="row-1">
            <td className="td-one" id="0"></td>
            <td className="td-one" id="1"></td>
            <td className="td-one" id="2"></td>
            <td className="td-one" id="3"></td>
            <td className="td-one" id="4"></td>
            <td className="td-one" id="5"></td>
            <td className="td-one" id="6"></td>
          </tr>
          <tr id="row-2">
            <td className="td-one" id="7"></td>
            <td className="td-one" id="8"></td>
            <td className="td-one" id="9"></td>
            <td className="td-one" id="10"></td>
            <td className="td-one" id="11"></td>
            <td className="td-one" id="12"></td>
            <td className="td-one" id="13"></td>
          </tr>
          <tr id="row-3">
            <td className="td-one" id="14"></td>
            <td className="td-one" id="15"></td>
            <td className="td-one" id="16"></td>
            <td className="td-one" id="17"></td>
            <td className="td-one" id="18"></td>
            <td className="td-one" id="19"></td>
            <td className="td-one" id="20"></td>
          </tr>
          <tr id="row-4">
            <td className="td-one" id="21"></td>
            <td className="td-one" id="22"></td>
            <td className="td-one" id="23"></td>
            <td className="td-one" id="24"></td>
            <td className="td-one" id="25"></td>
            <td className="td-one" id="26"></td>
            <td className="td-one" id="27"></td>
          </tr>
          <tr id="row-5">
            <td className="td-one" id="28"></td>
            <td className="td-one" id="29"></td>
            <td className="td-one" id="30"></td>
            <td className="td-one" id="31"></td>
            <td className="td-one" id="32"></td>
            <td className="td-one" id="33"></td>
            <td className="td-one" id="34"></td>
          </tr>
          <tr id="row-6">
            <td className="td-one" id="35"></td>
            <td className="td-one" id="36"></td>
            <td className="td-one" id="37"></td>
            <td className="td-one" id="38"></td>
            <td className="td-one" id="39"></td>
            <td className="td-one" id="40"></td>
            <td className="td-one" id="41"></td>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
      <div id="winner"></div>
      <br />
      <br />
      <div className='flex flex-wrap'>
      <br />
        <button type="button" className="flex1" onClick={handleReset} style={{ backgroundColor: 'red', fontSize: 'inherit' }}>
          reset game
        </button>

      </div>
    </div>
  )
}

function useErrorBoundary() {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  const handleErrors = useCallback((error, errorInfo) => {
    setHasError(true);
    setError(error);
    // You can log the error or perform any other error handling here
    console.error(error);
  }, []);

  useEffect(() => {
    window.addEventListener('error', handleErrors);
    return () => {
      window.removeEventListener('error', handleErrors);
    };
  }, [handleErrors]);

  return [hasError, error];
}

export function getSpotIndex(row, col) {
  return (row * 6) + row % 6 + col
}
export function checkForWinner(board) {
  const didWin1 = checkForWinnerBy(getPlayer1Emoji(),board)
  if (didWin1) {
    return true
  }
  
  const didWin2 = checkForWinnerBy(getPlayer2Emoji(),board)
  if (didWin2) {
    return true
  }
  return false
}

function checkForWinnerBy(matchValue,board) {
  // Define the size of the grid
  const numRows = 6;
  const numCols = 7;

  // Check for horizontal matches
  for (let row = 0; row <= numRows; row++) {
    for (let col = 0; col < numCols - 3; col++) {
      const spotOne=board.getSpot(row,col) === matchValue 
      const spotTwo=board.getSpot(row, col + 1) === matchValue
      const spotThree=board.getSpot(row, col + 3) === matchValue
      const spotFour=board.getSpot(row, col + 2) === matchValue
      if (spotOne &&
        spotTwo &&
        spotThree &&
        spotFour) {
        return true
        
      }
    }
  }

  // Check for vertical matches
  for (let row = 0; row < numRows - 3; row++) {
    for (let col = 0; col < numCols; col++) {
      if (board.getSpot(row, col) === matchValue &&
        board.getSpot(row + 1, col) === matchValue &&
        board.getSpot(row + 2, col) === matchValue &&
        board.getSpot(row + 3, col) === matchValue) {
        return true
      }
    }
  }

  // Check for diagonal matches (top-left to bottom-right)
  for (let row = 0; row < numRows - 3; row++) {
    for (let col = 0; col < numCols - 3; col++) {
      if (board.getSpot(row, col) === matchValue &&
        board.getSpot(row + 1, col + 1) === matchValue &&
        board.getSpot(row + 2, col + 2) === matchValue &&
        board.getSpot(row + 3, col + 3) === matchValue) {
        return true
      }
    }
  }

  // Check for diagonal matches (bottom-left to top-right)
  for (let row = 3; row < numRows; row++) {
    for (let col = 0; col < numCols - 3; col++) {
      if (board.getSpot(row, col) === matchValue &&
        board.getSpot(row - 1, col + 1) === matchValue &&
        board.getSpot(row - 2, col + 2) === matchValue &&
        board.getSpot(row - 3, col + 3) === matchValue) {
        return true
      }
    }
  }


}
