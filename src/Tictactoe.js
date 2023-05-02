import { PlayerSelects } from './PlayerSelects.js'
import { ReactTic } from "./tic-game"

import "./tic-style.css"
import { useEffect, useState } from 'react'

let reactTic;
export function Tictactoe() {
  const [gameSession, setGameSession] = useState({})
  useEffect(() => {
    reactTic = new ReactTic(setGameSession)
    console.log('load')
    reactTic.load()
  }, [])
  console.log('getting game session')

  const handleReset = () => {
    reactTic.resetGame()
  }
  const handleRestart = () => {
    console.log('handle restart')
    reactTic.restartGame()
  }
  const handleSetPlayer1 = (event) => {
    reactTic.setPlayer1(event.target.value)
  }
  const handleSetPlayer2 = (event) => {
    reactTic.setPlayer2(event.target.value)
  }

  console.log('react gamesession', gameSession)
  return (
    <div>
      <PlayerSelects
        handleSetPlayer1={handleSetPlayer1}
        handleSetPlayer2={handleSetPlayer2}
        onStart={() => reactTic.start()}
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