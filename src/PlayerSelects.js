import React from 'react';
import './playerselects.css'; // Import the CSS file for styling


export function PlayerSelects(props) {
  var selectedEmojis = [
    "😀", "😂", "😍", "🤔", "🤢", "🤖", "🐶", "🍕", "🎉", "🔥",
    "🔴", "⚫️"
  ]

  const defaultPlayer1Emoji = "🔴";
  const defaultPlayer2Emoji = "⚫️";


  return (

    <div className="flex flex-wrap">
      <div className="flex1">
        <p>Player 1:</p>
        <select onChange={props.handleSetPlayer1} value={props.gameSession.player1Emoji || defaultPlayer1Emoji}
          disabled={props.gameSession.startedAt}
          className="flex1 pad-sm select-box"
        >
          <option disabled>Choose player 1:</option>
          {selectedEmojis.map(emoji =>
            <option key={emoji} value={emoji}>{emoji}</option>
          )}
        </select>
      </div>

      <div className="flex1">
        <p>Player 2:</p>
        <select onChange={props.handleSetPlayer2} value={props.gameSession.player2Emoji || defaultPlayer2Emoji}
          disabled={props.gameSession.startedAt}
          className="flex1 pad-sm select-box"
        >
          <option disabled>Choose player 2:</option>
          {selectedEmojis.map(emoji =>
            <option key={emoji} value={emoji}>{emoji}</option>
          )}
        </select>
      </div>

      <div className="start-button">
      {props.gameSession.startedAt ? '' : <button type="button" onClick={props.onStart} className="pad-sm">start</button>}
    </div>
    </div>
  )
}
