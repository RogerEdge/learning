export function PlayerSelects(props) {
  var selectedEmojis = [
    "😀", "😂", "😍", "🤔", "🤢", "🤖", "🐶", "🍕", "🎉", "🔥",
    "🔴", "⚫️"
  ]
  return (
    <div className="flex flex-wrap">
      <select onChange={props.handleSetPlayer1} value={props.gameSession.player1Emoji}
        disabled={props.gameSession.startedAt}
        className="flex1 pad-sm"
      >
        <option disabled>Choose player 1:</option>
        {selectedEmojis.map(emoji =>
          <option key={emoji} value={emoji}>{emoji}</option>
        )}
      </select>

      <select onChange={props.handleSetPlayer2} value={props.gameSession.player2Emoji}
        disabled={props.gameSession.startedAt}
        className="flex1 pad-sm"
      >
        <option disabled>Choose player 2:</option>
        {selectedEmojis.map(emoji =>
          <option key={emoji} value={emoji}>{emoji}</option>
        )}
      </select>

      {props.gameSession.startedAt ? '' : <button type="button" onClick={props.onStart} className="pad-sm">start</button>}
    </div>
  )
}
