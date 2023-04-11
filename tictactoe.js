//player 1 select emoji code
var selectedEmojis = [
  "😀", "😂", "😍", "🤔", "🤢", "🤖", "🐶", "🍕", "🎉", "🔥",
  player1Emoji, player2Emoji
];
selectedEmojis.forEach(function (emoji) {
  var option = document.createElement("option");
  option.value = emoji;
  option.text = emoji;
  document.getElementById("select-player-1").appendChild(option);
});

//player 2 select emoji code
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
      console.info('reset game session by get game session admin')
      userSession.tictactoe = resetGameSession(session)
      pushUserSession(userSession)
    }
    return userSession.tictactoe
  }
  
  if(!session.tictactoe){
    console.info('reset game session by get game session user')
  }
  session.tictactoe = session.tictactoe || resetGameSession(session)
  return session.tictactoe
}

function saveGameSession(session,gameSession) {
  console.log('tttttt', gameSession)

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
  // session.tictactoe=mergeObjects(session.tictactoe, gameSession)
  session.tictactoe=gameSession
  session.lastUpdatedAt=Date.now()
  
  //update localstorage
  pushUserSession(session)
  saveSession(session)
}

function checkForStart(session,gameSession) {
  if(gameSession.startedAt){
    console.warn('game already started')
    return
  }

  // Assume userType is user if its not defined. Allows a user to play by themselves
  session.userType = session.userType || 'user'
  
  if(player1Emoji){
    console.log('🔴player1Emoji', player1Emoji)
  }
  const changePlayer1 = player1Emoji && player1Emoji != gameSession.player1Emoji
  console.log('changePlayer1', changePlayer1,player1Emoji,gameSession.player1Emoji)
  if (changePlayer1) {
    if(gameSession.player1 && gameSession.player1!==session.userType){
      console.warn('🟠 player 1 does not match userType', {
        player1Emoji: player1Emoji,
        gameSession: {
          player1Emoji: gameSession.player1Emoji,
          player1: gameSession.player1,
        },
        userType: session.userType,
      })
      return
    }
    gameSession.player1 = session.isAdmin ? 'admin' : 'user'
    
    // should we assume admin is the other player?
    if ( session.code ) {
      gameSession.player2 = session.isAdmin ?  'user' : 'admin'
    } else {
      // its a local only game, no networking
      gameSession.player2 = 'user'
    }
    
    gameSession.player1Emoji = player1Emoji
    saveGameSession(session,gameSession)
    console.info('player1 set',player1Emoji)
  }
  
  const changePlayer2 = player2Emoji && player2Emoji != gameSession.player2Emoji
  if (changePlayer2) {
    if(gameSession.player2 && gameSession.player2!==session.userType){
      console.warn('🟠 player 2 does not match userType', {
        player2Emoji: player2Emoji,
        gameSession: {
          player2Emoji: gameSession.player2Emoji,
          player2: gameSession.player2,
        },
        userType: session.userType,
      })
      return
    }
    gameSession.player2 = session.isAdmin ? 'admin' : 'user'

    // should we assume admin is the other player?
    if ( session.code ) {
      gameSession.player1 = session.isAdmin ?  'user' : 'admin'
    } else {
      gameSession.player1 = 'user'
    }

    gameSession.player2Emoji = player2Emoji
    saveGameSession(session,gameSession)
    console.info('player2 set',player2Emoji)
  }

  const startReady=player1Emoji && player2Emoji &&
  gameSession.player1Emoji && gameSession.player2Emoji
  console.log('startReady', startReady)
  if (startReady) {
    startGame(session,gameSession)
  }
}

function hideBoard() {
  const boardElement = document.getElementById('board');
  boardElement.style.display = 'none';
}

function showBoard() {
  const boardElement = document.getElementById('board');
  boardElement.style.display = 'block';
}

function isBoardShown() {
  return document.getElementById('board').style.display!='none'
}

//tictactoe game code
function startGame(session,gameSession) {
  console.info('game started locally')
  // resetGame()
  //const session = getSession()
  //const gameSession = getGameSession()
  gameSession.startedAt=Date.now()
  gameSession.currentPlayer=gameSession.player1Emoji
  updateDisplay(session,gameSession)
  saveGameSession(session,gameSession)
  addListeners(session,gameSession)
}

function isPlayersTurn() {
  const session=getSession()

  // is this just a local game and not network connected?
  if ( !session.code ) {
    return true // its always someones turn then
  }

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
function addListeners(session,gameSession) {
  if(listening){
    return
  }
  listening = true
  //const session=getSession()
  //const gameSession=getGameSession()
  //add board click event listeners
  for (var i = 0; i < gameSession.board.length; i++) {
    document.getElementById(i).addEventListener("click", function(){
      //get freshest memory at click event
      const session=getSession()
      const gameSession=getGameSession()
      const myTurn=isPlayersTurn()
      
      if(!myTurn){
        console.warn('its not your turn',{
          currentPlayer:currentPlayer,
          you:session.isAdmin ? 'admin': 'user',
          gameSession:gameSession
        })
        return
      }
      const id=this.getAttribute('id')
      onClick(id, gameSession.board, gameSession, checkForWinner);
      
      gameSession.currentPlayer=currentPlayer
      saveGameSession(session,gameSession)
    })
  }

  gameSession.currentPlayer = gameSession.currentPlayer || player1Emoji
  setCurrentPlayer(player1Emoji)
  
  saveGameSession(session,gameSession)
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
    updateDisplay(user, user.tictactoe)
  }

  ++refetchCount
  const session=getSession()
  const gameSession=getGameSession()
  //gameSession.lastUpdatedAt=gameSession.lastUpdatedAt || 0

  const lastUpdatedAt=session.isAdmin ? session.userSession.lastUpdatedAt : session.lastUpdatedAt
  const outdated=lastUpdatedAt>=user.lastUpdatedAt
// console.log('outdated', outdated,lastUpdatedAt, user.lastUpdatedAt)

  if(outdated){
    console.info('server memory outdated', outdated, lastUpdatedAt-user.lastUpdatedAt)
    return 
  }

  //console.log('hook refetch', user)
  updateDisplay(user, user.tictactoe)

  //game is won
  if(user.tictactoe.winningPlayer && !gameSession.winningPlayer){
    gameWon(gameSession,gameSession.winningPlayer)
  }
}

function updateDisplay(session, gameSession) {
  if (gameSession.player1) {
    player1Emoji = gameSession.player1Emoji
  }

  const selectPlayer1 = document.getElementById('select-player-1')
  if(player1Emoji && gameSession.player1Emoji){
    selectPlayer1.value = player1Emoji
    selectPlayer1.setAttribute('disabled',true)
    checkForStart(session,gameSession)
  } else {
    selectPlayer1.removeAttribute('disabled')
    selectPlayer1.value = ''
  }

  if (gameSession.player2) {
    player2Emoji = gameSession.player2Emoji
  }

  const selectPlayer2 = document.getElementById('select-player-2')
  if(player2Emoji && gameSession.player2Emoji){
    selectPlayer2.value = player2Emoji
    selectPlayer2.setAttribute('disabled',true)
    checkForStart(session,gameSession)
  } else {
    selectPlayer2.removeAttribute('disabled')
    selectPlayer2.value = ''
  }

  if(gameSession.startedAt){
    const boardShown=isBoardShown()
    if(!boardShown){
      console.info('board opened by refetch')
      showBoard()
      addListeners(session,gameSession)
    }
  } else {
    hideBoard()
  }

  gameSession.board.forEach((space,i) => {
    markBoardSpace(i, space)
  })

  currentPlayer=gameSession.currentPlayer
  document.getElementById('current-player').innerHTML=gameSession.currentPlayer
}

function resetGame() {
  const session=getSession()
  showBoard()
  const gameSession=resetGameSession(session)
  return gameSession
}

function resetGameSession(session) {
  console.info('game session resetting')
  const gameSession={} //getGameSession()

  gameSession.player1=''
  gameSession.player2=''
  player1Emoji=''
  player2Emoji=''
  gameSession.player1Emoji= ''
  gameSession.player2Emoji= ''
  delete gameSession.startedAt//=Date.now()
  delete gameSession.winningPlayer
  gameSession.board = ["", "", "", "", "", "", "", "", ""];
  gameSession.currentPlayer = player1Emoji
  currentPlayer = player1Emoji
  saveGameSession(session,gameSession)
  updateDisplay(session,gameSession)
  console.info('game session reset')

  return gameSession
  
}

// make sure session already started
function paramSession() {
  const session = getSession()
  const gameSession = getGameSession()
  return { session:session, gameSession: gameSession}
}

function setPlayer1(emoji) {
  const {session,gameSession}=paramSession()
  gameSession.player1Emoji = player1Emoji = emoji
  checkForStart(session,gameSession)
  updateDisplay(session,gameSession)
}

function setPlayer2(emoji) {
  const {session,gameSession}=paramSession() // ensure we have game memory
  gameSession.player2Emoji = player2Emoji = emoji
  checkForStart(session,gameSession)
  updateDisplay(session,gameSession)
}
