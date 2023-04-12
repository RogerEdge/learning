import { useEffect } from "react";
import { loadDisplay, resetGame, setPlayer1, setPlayer2 } from "./tic-game"

import "./tic-style.css"
import "./choose-emoji.css"

export function Tictactoe() {
  useEffect(() => {
    loadDisplay();
  }, []);

  const handleReset=()=> {
    resetGame()
  }
  const handleSetPlayer1=(event)=>{
    setPlayer1(event.target.value)
  }
  const handleSetPlayer2=(event)=>{
    setPlayer2(event.target.value)
  }
  
  const bgRed={
    backgroundColor: 'red'
  }

  return (
    <div>
      {/*player1 select*/}
      <select id="select-player-1" onChange={handleSetPlayer1}>
        <option disabled>Choose player 1:</option>
      </select>

      {/*player2 select*/}
      <select id="select-player-2" onChange={handleSetPlayer2}>
        <option disabled>Choose player 2:</option>
      </select>

      <br /><br />

      {/*the board*/}
      <div id="board" className={"displayNone"}>
        <div>
          current player:<span id="current-player">?</span>
        </div>


        <table>
          <tbody>
          <tr>
            <td id="0"></td>
            <td id="1"></td>
            <td id="2"></td>
          </tr>
          <tr>
            <td id="3"></td>
            <td id="4"></td>
            <td id="5"></td>
          </tr>
          <tr>
            <td id="6"></td>
            <td id="7"></td>
            <td id="8"></td>
          </tr>
          </tbody>
        </table>

        <button onClick={handleReset} style={bgRed}>reset game</button>
      </div>
      <div id="winner"></div>


    </div >
  )
}