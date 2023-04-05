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
      userSession.tictactoe = resetGameSession()
      pushUserSession(userSession)
    }
    return userSession.tictactoe
  }
  
  session.tictactoe = session.tictactoe || resetGameSession()
  return session.tictactoe
}

function saveGameSession(gameSession) {
  console.log('tttttt', gameSession)
  const session = getSession()
  if (session.isAdmin) {
    session.userSession.lastUpdatedAt=Date.now()
    session.userSession.tictactoe = gameSession
    // server handles assigning updated date
    //session.userSession.lastUpdatedAt
    pushUserSession(session.userSession)
    saveSession(session)
    return
  }
  
  session.tictactoe = session.tictactoe || {}
  session.tictactoe=mergeObjects(session.tictactoe, gameSession)
  session.lastUpdatedAt=Date.now()
  
  //update localstorage
  pushUserSession(session)
  saveSession(session)
}

function checkForStart() {
  const session = getSession()
  const gameSession = getGameSession()
  //set player1 1 time and only 1 time
  
  const changePlayer1 = player1Emoji && player1Emoji != gameSession.player1Emoji
  if (changePlayer1) {
    if(gameSession.player1 && gameSession.player1!==session.userType){
      console.warn('🟠 player does not match user')
      return
    }
    gameSession.player1 = session.isAdmin ? 'admin' : 'user'
    gameSession.player2 = session.isAdmin ?  'user' : 'admin'
    gameSession.player1Emoji = player1Emoji
    saveGameSession(gameSession)
    console.info('player1 set')
  }
  
  const changePlayer2 = player2Emoji && player2Emoji != gameSession.player2Emoji
  if (changePlayer2) {
    if(gameSession.player2 && gameSession.player2!==session.userType){
      console.warn('🟠 player 2 does not match user',gameSession.player2,session.userType )
      return
    }
    gameSession.player2 = session.isAdmin ? 'admin' : 'user'
    gameSession.player1 = session.isAdmin ?  'user' : 'admin'
    gameSession.player2Emoji = player2Emoji
    saveGameSession(gameSession)
    console.info('player2 set')
  }

  if (player1Emoji && player2Emoji &&
    gameSession.player1Emoji && gameSession.player2Emoji
  ) {
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
  console.info('game started locally')
  // resetGame()
  const gameSession = getGameSession()
  gameSession.startedAt=Date.now()
  gameSession.currentPlayer=gameSession.player1Emoji
  updateDisplay(gameSession)
  saveGameSession(gameSession)
  //showBoard()
  addListeners()
}

function isPlayersTurn() {
  const session=getSession()
  const gameSession=getGameSession()
  const isAdminPlayer1=gameSession.player1==='admin'
  const isSessionAdmin=session.isAdmin


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


let listening = false
function addListeners() {
  if(listening){
    return
  }
  listening = true
  const gameSession=getGameSession()
  //add board click event listeners
  for (var i = 0; i < gameSession.board.length; i++) {
    document.getElementById(i).addEventListener("click", function(){
      //get freshest memory at click event
      const gameSession=getGameSession()
      const myTurn=isPlayersTurn()
      
      if(!myTurn){
        console.warn('its not your turn')
        return
      }
      const id=this.getAttribute('id')
      onClick(id, gameSession.board, gameSession, checkForWinner);
      
      gameSession.currentPlayer=currentPlayer
      saveGameSession(gameSession)
    })
  }

  gameSession.currentPlayer = gameSession.currentPlayer || player1Emoji
  setCurrentPlayer(player1Emoji)
  
  saveGameSession(gameSession)
  console.info('event listeners added')
}

function checkForWinner(gameSession) {
  
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
  console.log('gameSession.board', gameSession.board)
}

function disableBoard() {
  const gameSession=getGameSession()
    for (var i = 0; i < gameSession.board.length; i++) {
      document.getElementById(i).removeEventListener("click", onClick);
    }
}

let refetchCount=0
//every 2s new info is brought in
refetchUserHook = (user) => {
  //console.log('refetchCount', refetchCount,user)
  if(!refetchCount){
    console.info('first hook')
    updateDisplay(user.tictactoe)
  }

  ++refetchCount
  const session=getSession()
  //gameSession.lastUpdatedAt=gameSession.lastUpdatedAt || 0

  const lastUpdatedAt=session.isAdmin ? session.userSession.lastUpdatedAt : session.lastUpdatedAt
  const outdated=lastUpdatedAt>=user.lastUpdatedAt
// console.log('outdated', outdated,lastUpdatedAt, user.lastUpdatedAt)

  if(outdated){
    console.info('current memory>server')
    return 
  }
  console.log('hook refetch', user)
  updateDisplay(user.tictactoe)
}

function updateDisplay(user) {
  const gameSession = getGameSession()
  user.board=user.board || gameSession.board
  
  if (gameSession.player1) {
    player1Emoji = gameSession.player1Emoji
  }
  if (user.player1) {
    player1Emoji = user.player1Emoji
  }
  //player1Emoji = gameSession.player1
  console.log('player1Emoji', player1Emoji)
  if(player1Emoji){
    const selectPlayer1 = document.getElementById('select-player-1')
    selectPlayer1.value = player1Emoji
    selectPlayer1.setAttribute('disabled',true)
  }

  if (gameSession.player2) {
    player2Emoji = gameSession.player2Emoji
  }
  if (user.player2) {
    player2Emoji = user.player2Emoji
  }
  //player2Emoji = gameSession.player2
  if(player2Emoji){
    const selectPlayer2 = document.getElementById('select-player-2')
    selectPlayer2.value = player2Emoji
    selectPlayer2.setAttribute('disabled',true)
  }
  
  console.log('user.startedAt', user.startedAt,user)
  if(user.startedAt){
    const boardShown=isBoardShown()
    if(!boardShown){
      console.info('board opened by refetch')
      showBoard()
      addListeners()
    }
  }

  user.board.forEach((space,i) => {
    markBoardSpace(i, space)
  })

  currentPlayer=user.currentPlayer
  document.getElementById('current-player').innerHTML=user.currentPlayer
}

function resetGame() {
  showBoard()
  const gameSession=resetGameSession()
  return gameSession
}

function resetGameSession() {
  console.info('game session resetting')
  const gameSession={} //getGameSession()

  gameSession.player1=''
  gameSession.player2=''
  player1Emoji=''
  player2Emoji=''
  gameSession.player1Emoji= ''
  gameSession.player2Emoji= ''
  delete gameSession.startedAt//=Date.now()
  gameSession.board = ["", "", "", "", "", "", "", "", ""];
  gameSession.currentPlayer = player1Emoji
  saveGameSession(gameSession)
  console.info('game session reset')

  const selectPlayer1 = document.getElementById('select-player-1')
  selectPlayer1.setAttribute('disabled',false)
  const selectPlayer2 = document.getElementById('select-player-2')
  selectPlayer2.setAttribute('disabled',false)

  return gameSession
  
}
