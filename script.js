let selectedPlayer1 = ''
let selectedPlayer2 = ''

//player 1 select emoji code
var emojis = ["😀", "😂", "😍", "🤔", "🤢", "🤖", "🐶", "🍕", "🎉", "🔥"];
var selectedEmojis = [];
for (var i = 0; i < 10; i++) {
  var randomIndex = Math.floor(Math.random() * emojis.length);
  selectedEmojis.push(emojis[randomIndex]);
  emojis.splice(randomIndex, 1);
}
selectedEmojis.forEach(function(emoji) {
  var option = document.createElement("option");
  option.value = emoji;
  option.text = emoji;
  document.getElementById("emoji-menu").appendChild(option);
});

//player 2 select emoji code
var emojis = ["😀", "😂", "😍", "🤔", "🤢", "🤖", "🐶", "🍕", "🎉", "🔥"];
var selectedEmojis = [];

for (var i = 0; i < 10; i++) {
  var randomIndex = Math.floor(Math.random() * emojis.length);
  selectedEmojis.push(emojis[randomIndex]);
  emojis.splice(randomIndex, 1);
}

selectedEmojis.forEach(function(emoji) {
  var option = document.createElement("option");
  option.value = emoji;
  option.text = emoji;
  document.getElementById("emoji-menu2").appendChild(option);
});

function checkForStart() {
  if (selectedPlayer1 && selectedPlayer2) {
    player1 = selectedPlayer1
    player2 = selectedPlayer2
    startGame()
  }
}

//tictactoe game code
function startGame() {
  const boardElement = document.getElementById('board');
boardElement.style.display = 'block';

  setCurrentPlayer(player1)
  var board = ["", "", "", "", "", "", "", "", ""];
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

  function checkForWinner() {
    for (var i = 0; i < winningCombinations.length; i++) {
      var combo = winningCombinations[i];
      if (board[combo[0]] !== "" && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
        document.getElementById("winner").innerHTML = "Winner: " + board[combo[0]];
        disableBoard();
        return true ;
      }
    }
    if (board.every((val) => val !== "")) {
      document.getElementById("winner").innerHTML = "Tie!";
    }
  }

  function disableBoard() {
    for (var i = 0; i < board.length; i++) {
      document.getElementById(i).removeEventListener("click", onClick);
    }
  }

  for (var i = 0; i < board.length; i++) {
    document.getElementById(i).addEventListener("click", onClick.bind(null, i, board,checkForWinner));
  }
}
    