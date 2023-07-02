import { getUserSession, pushUserSession, saveSession } from "./components"

let gameOver = false

export function getGameSession(
  GameBoard
) {
  const session = getSession()

  if (session.isAdmin) {
    const userSession = getUserSession()
    if (!userSession[GameBoard.gameName]) {
      console.info('reset game session by get game session admin', GameBoard.gameName)
      userSession[GameBoard.gameName] = resetGameSession(session, userSession[GameBoard.gameName], GameBoard)
      pushUserSession(userSession)
    }
    return userSession[GameBoard.gameName]
  }

  if (!session[GameBoard.gameName]) {
    console.info('reset game session by get game session user', GameBoard.gameName)
  }
  session[GameBoard.gameName] = session[GameBoard.gameName] || resetGameSession(session, session[GameBoard.gameName], GameBoard)
  return session[GameBoard.gameName]
}

export let player1Emoji = '⚫️'
export let player2Emoji = '🔴'
export let currentPlayer = player1Emoji;

export function setPlayer1Emoji(emoji) {
  player1Emoji = emoji
}

export function setPlayer2Emoji(emoji) {
  player2Emoji = emoji
}

export function getPlayer1Emoji() {
  return player1Emoji
}

export function getPlayer2Emoji() {
  return player2Emoji
}

export function getCurrentPlayer() {
  return currentPlayer
}

export function setCurrentPlayer(player) {
  currentPlayer = player;
}

// Create a new Audio object and set the source to your audio file
new Audio("https://assets.mixkit.co/active_storage/sfx/2894/2894-preview.mp3");
export function playMoveSound() {
  const moveAudio = new Audio("https://assets.mixkit.co/active_storage/sfx/2894/2894-preview.mp3");

  // Play the audio
  moveAudio.play();

}

// update display and play a sound
function claimBoardSpace(space, currentPlayer) {
  markBoardSpace(space, currentPlayer)
  playMoveSound()
}

// called just to update display only (no sound)
export function markBoardSpace(space, currentPlayer) {
  document.getElementById(space).innerHTML = currentPlayer;
}

export function onClick(
  boardClass,
  id,
  gameSession,
  checkForWinner,
) {
  const {gameName}=boardClass
  const session=boardClass.getSession()
  //const gameSession=boardClass.getGameSession()
  const boardMemory=gameSession.board
  //If the game is over, prevent anymore code from running
  if (gameOver) {
    console.warn("game is over click ignored")
    return
  }
  
  id=boardClass.getDropPosition(id)
  console.log('id', id)

  if (!boardMemory[id]) {
    console.log('xxx',{boardMemory, id, session, gameSession, gameName})
    //mark the memory space with the current player
    setBoardSpace(boardMemory, id, session, gameSession, gameName)
    
    // claim the space with the current players emoji and play sound
    claimBoardSpace(id, currentPlayer)

    const isPlayerOne = currentPlayer === player1Emoji
    const isGameOver = checkForWinner(gameSession);
    if (isGameOver) {
      gameOver = true
      const winningPlayer = isPlayerOne ? 1 : 2

      gameWon(gameSession, winningPlayer)

      setTimeout(() => {
        alert('✅ player ' + winningPlayer + ' won')
      }, 10);
    }

    //change players
    currentPlayer = isPlayerOne ? player2Emoji : player1Emoji;
  }
}
// Create a new Audio object and set the source to your audio file
const winAudio = new Audio("https://cdn.pixabay.com/audio/2021/08/09/audio_ff81343224.mp3");
export function setBoardSpace(boardMemory, id, session, gameSession, gameName) {
  boardMemory[id] = currentPlayer

  saveGameSession(session, gameSession, gameName)
}

function playWinSound() {

  // Play the audio
  winAudio.play();

}

export function gameWon(gameSession, winningPlayer) {
  gameSession.winningPlayer = winningPlayer
  playWinSound()
  const body = document.getElementsByTagName('body')[0]
  const content = `<div class="gif-overlay">
  <img class="gif-win" src="https://i.pinimg.com/originals/cf/50/6d/cf506d6998d68de01e9171f30fc4e287.gif" alt="Animated GIF">
  </div>
`
  const newElement = document.createElement('div')
  newElement.innerHTML = content

  body.appendChild(newElement)

  setTimeout(() => {
    body.removeChild(newElement)
  }, 5000);
}
//preload winning image
const imgUrl = 'https://i.pinimg.com/originals/cf/50/6d/cf506d6998d68de01e9171f30fc4e287.gif';
const img = new Image();
img.src = imgUrl;

export function resetGameSession(session,gameSession,displayControl,) {
  gameSession = {}

  //console.info('game session resetting', displayControl.gameName, gameSession)
  // const gameSession = {} 

  //reset players
  /*gameSession.player1 = ''
  gameSession.player2 = ''
  setPlayer1Emoji()
  setPlayer2Emoji()
  gameSession.player1Emoji = ''
  gameSession.player2Emoji = ''*/
  
  delete gameSession.startedAt //=Date.now()
  delete gameSession.winningPlayer
  gameOver = false
  document.getElementById("winner").innerHTML = ""
  gameSession.board = displayControl.blankBoard
  gameSession.currentPlayer = getPlayer1Emoji()
  setCurrentPlayer(getPlayer1Emoji())
  saveGameSession(session, gameSession, displayControl.gameName)
  displayControl.updateDisplay(gameSession)
  //console.info('🔄 game session reset', gameSession)

  return gameSession

}

// make sure session already started
export function paramSession(displayControl) {
  const session = getSession()
  const gameSession = getGameSession(displayControl)
  return { session: session, gameSession: gameSession }
}

export function getSession() {
  localStorage.session = localStorage.session || '{}'
  try {
    const session = JSON.parse(localStorage.session)
    // console.log('session', session)
    return session
  } catch (error) {
    console.warn('🟠 the session was lost and reset')
    localStorage.session = '{}'
    return JSON.parse(localStorage.session)
  }
}

export function saveGameSession(session, gameSession, gameName) {
  if (session.isAdmin) {
    session.userSession.lastUpdatedAt = Date.now()
    //session.userSession[gameName] = session.userSession[gameName]
    pushUserSession(session.userSession)
    saveSession(session)
    return
  }

  session[gameName] = session[gameName] || {}
  session[gameName] = gameSession
  session.lastUpdatedAt = Date.now()

  //update localstorage
  pushUserSession(session)
  saveSession(session)
}