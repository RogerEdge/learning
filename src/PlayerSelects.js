export function PlayerSelects(props) {
  var selectedEmojis = [
    "😀", "😂", "😍", "🤔", "🤢", "🤖", "🐶", "🍕", "🎉", "🔥",
    "🔴", "⚫️"
  ]
  return (
    <div>
      <select id="select-player-1" onChange={props.handleSetPlayer1}>
        <option disabled>Choose player 1:</option>
        {selectedEmojis.map(emoji =>
          <option key={emoji} value={emoji}>{emoji}</option>
        )}
      </select>

      <select id="select-player-2" onChange={props.handleSetPlayer2}>
        <option disabled>Choose player 2:</option>
        {selectedEmojis.map(emoji =>
          <option key={emoji} value={emoji}>{emoji}</option>
        )}
      </select>
    </div>
  )
}
