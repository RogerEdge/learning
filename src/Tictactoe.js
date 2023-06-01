import { PlayerSelects } from './PlayerSelects.js'
import { ReactTic } from "./tic-game"

import "./tic-style.css"
import { useEffect, useState } from 'react'

let boardGame;
export function Tictactoe() {
  const [gameSession, setGameSession] = useState({})
  useEffect(() => {
    boardGame = new ReactTic(setGameSession)
    console.log('load')
    boardGame.load()
  }, [])
  console.log('getting game session')

  const handleReset = () => {
    boardGame.resetGame()
  }
  const handleRestart = () => {
    console.log('handle restart')
    boardGame.restartGame()
  }
  const handleSetPlayer1 = (event) => {
    boardGame.setPlayer1(event.target.value)
  }
  const handleSetPlayer2 = (event) => {
    boardGame.setPlayer2(event.target.value)
  }

  console.log('react gamesession', gameSession)
  return (
    <div>
      <h1 className="title">Tic-Tac-Toe</h1>
      <PlayerSelects
        handleSetPlayer1={handleSetPlayer1}
        handleSetPlayer2={handleSetPlayer2}
        onStart={() => boardGame.start()}
        gameSession={gameSession}
      ></PlayerSelects>

      <br /><br />

      {/*the board*/}
      <div className={gameSession.startedAt ? "" : "displayNone"}>
        <div>
          <br />
          current player:{gameSession.currentPlayer}
          <br /><br />
        </div>

        <table>
          <tbody>
            <tr>
              <td class="horizontal-line" id="0"></td>
              <td class="vertical-line horizontal-line" id="1"></td>
              <td class="vertical-line horizontal-line" id="2"></td>
            </tr>
            <tr>
              <td class="horizontal-line" id="3"></td>
              <td class="vertical-line horizontal-line" id="4" ></td>
              <td class="vertical-line horizontal-line" id="5"></td>
            </tr>
            <tr>
              <td id="6"></td>
              <td class="vertical-line" id="7"></td>
              <td class="vertical-line" id="8"></td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />

        <div id="winner"></div>
        <br />
        <br />
        <div className='flex flex-wrap'>

          <button type="button" className="flex1" onClick={handleReset} style={{ backgroundColor: 'red', fontSize: 'inherit' }}>
            reset game
          </button>
          <button type="button" className="flex1" onClick={handleRestart} style={{ backgroundColor: 'orange', fontSize: 'inherit' }}>
            restart game
          </button>
        </div>

      </div >
    </div>
  )
}