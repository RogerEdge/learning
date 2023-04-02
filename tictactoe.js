//player 1 select emoji code
var emojis = ["😀", "😂", "😍", "🤔", "🤢", "🤖", "🐶", "🍕", "🎉", "🔥"];
var selectedEmojis = [];
for (var i = 0; i < 10; i++) {
  var randomIndex = Math.floor(Math.random() * emojis.length);
  selectedEmojis.push(emojis[randomIndex]);
  emojis.splice(randomIndex, 1);
}
selectedEmojis.forEach(function (emoji) {
  var option = document.createElement("option");
  option.value = emoji;
  option.text = emoji;
  document.getElementById("select-player-1").appendChild(option);
});

//player 2 select emoji code
var emojis = ["😀", "😂", "😍", "🤔", "🤢", "🤖", "🐶", "🍕", "🎉", "🔥"];
var selectedEmojis = [];

for (var i = 0; i < 10; i++) {
  var randomIndex = Math.floor(Math.random() * emojis.length);
  selectedEmojis.push(emojis[randomIndex]);
  emojis.splice(randomIndex, 1);
}

selectedEmojis.forEach(function (emoji) {
  var option = document.createElement("option");
  option.value = emoji;
  option.text = emoji;
  document.getElementById("select-player-2").appendChild(option);
});

function getGameSession() {
  const session = getSession()
  if (session.isAdmin) {
    const userSession = getUserSession()
    if (!userSession.tictactoe) {
      userSession.tictactoe = {}
      pushUserSession(userSession)
    }
    return userSession.tictactoe
  }
  session.tictactoe = session.tictactoe || {}
  return session.tictactoe
}

function saveGameSession(gameSession) {
  const session = getSession()
  if (session.isAdmin) {
    session.userSession.tictactoe = gameSession
    pushUserSession(session.userSession)
    return
  }

  session.tictactoe = session.tictactoe || {}
  session.tictactoe=mergeObjects(session.tictactoe, gameSession)
  saveSession(session)
}

function checkForStart() {
  const gameSession = getGameSession()
  const session = getSession()
  //set player1 1 time and only 1 time
  const changePlayer1 = player1Emoji && player1Emoji != gameSession.player1Emoji
  if (changePlayer1) {
    if(gameSession.player1 && gameSession.player1!==session.userType){
      console.warn('🟠 player does not match user')
      return
    }
    gameSession.player1 = session.isAdmin ? 'admin' : 'user'
    gameSession.player1Emoji = player1Emoji
    saveGameSession(gameSession)
  }

  const changePlayer2 = player2Emoji && player2Emoji != gameSession.player2Emoji
  if (changePlayer2) {
    if(gameSession.player2 && gameSession.player2!==session.userType){
      console.warn('🟠 player 2 does not match user',gameSession.player2,session.userType )
      return
    }
    gameSession.player2 = session.isAdmin ? 'admin' : 'user'
    gameSession.player2Emoji = player2Emoji
    saveGameSession(gameSession)
  }

  if (player1Emoji && player2Emoji) {
    startGame()
  }
}

function showBoard() {
  const boardElement = document.getElementById('board');
  boardElement.style.display = 'block';
}

function isBoardShown() {
  return document.getElementById('board').style.display!='none'
}

//tictactoe game code
function startGame() {
  resetGame()
  addListeners()
}

function isPlayersTurn() {
  const session=getSession()
  const gameSession=getGameSession()
  const isAdminPlayer1=gameSession.player1==='admin'
  const isSessionAdmin=session.isAdmin

  console.log('isAdminPlayer1', isAdminPlayer1)
  console.log('isSessionAdmin', isSessionAdmin)
  console.log('222222', currentPlayer)

  if(isAdminPlayer1 && isSessionAdmin){
    return currentPlayer===gameSession.player1Emoji
  }

  if(!isAdminPlayer1 && isSessionAdmin){
    return currentPlayer===gameSession.player2Emoji
  }

  if(!isAdminPlayer1 && !isSessionAdmin){
    return currentPlayer===gameSession.player1Emoji
  }

  if(isAdminPlayer1 && !isSessionAdmin){
    return currentPlayer===gameSession.player2Emoji
  }

  return false
}

function addListeners() {
  const gameSession=getGameSession()
  //add board click event listeners
  for (var i = 0; i < gameSession.board.length; i++) {
    document.getElementById(i).addEventListener("click", function(){
      const myTurn=isPlayersTurn()
      console.log('myTurn', myTurn)
      if(!myTurn){
        console.warn('its not your turn')
        return
      }
      const id=this.getAttribute('id')
      onClick(id, gameSession.board, checkForWinner);
      gameSession.currentPlayer=currentPlayer
      saveGameSession(gameSession)
    })
  }

  gameSession.currentPlayer = gameSession.currentPlayer || player1Emoji
  setCurrentPlayer(player1Emoji)
  
  saveGameSession(gameSession)
}

function checkForWinner() {
  const gameSession=getGameSession()
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
      disableBoard();
      return true;
    }
  }
  if (gameSession.board.every((val) => val !== "")) {
    document.getElementById("winner").innerHTML = "Tie!";
  }
}

function disableBoard() {
  const gameSession=getGameSession()
    for (var i = 0; i < gameSession.board.length; i++) {
      document.getElementById(i).removeEventListener("click", onClick);
    }
}

refetchUserHook = (user) => {
  const gameSession = getGameSession()
  
    if (user.player1) {
      player1Emoji = user.player1Emoji
    }
    if (gameSession.player1) {
      player1Emoji = gameSession.player1Emoji
    }
    //player1Emoji = gameSession.player1
    document.getElementById('select-player-1').value = player1Emoji

  
    if (user.player2) {
      player2Emoji = user.player2Emoji
    }
    if (gameSession.player2) {
      player2Emoji = gameSession.player2Emoji
    }
    //player2Emoji = gameSession.player2
    document.getElementById('select-player-2').value = player2Emoji
    
    if(gameSession.startedAt){
      const boardShown=isBoardShown()
      if(!boardShown){
        showBoard()
        addListeners()
      }
    }

    gameSession.board.forEach((space,i) => {
      markBoardSpace(i, space)
    })

    currentPlayer=gameSession.currentPlayer
    document.getElementById('current-player').innerHTML=gameSession.currentPlayer
}

function resetGame() {
  showBoard()
  const gameSession=getGameSession()
  
  gameSession.startedAt=Date.now()
  gameSession.board = ["", "", "", "", "", "", "", "", ""];
  gameSession.currentPlayer = player1Emoji
  saveGameSession(gameSession)
}