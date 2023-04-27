import { setUserHook } from "./components";
import { gameWon, getCurrentPlayer, getPlayer1Emoji, getPlayer2Emoji, markBoardSpace, onClick, setCurrentPlayer, setPlayer1Emoji, setPlayer2Emoji, getGameSession, resetGameSession, paramSession, getSession, saveGameSession } from "./shared-game-code";

export class ReactTic {
  constructor(setGameSession) {
    this.setGameSession = setGameSession
  }

  load() {
    let refetchCount = 0
    //every 2s new info is brought in
    setUserHook((user) => {
      //console.log('refetchCount', refetchCount,user)
      if (!refetchCount) {
        console.info('first hook')
        this.updateDisplay(user, user.tictactoe)
      }

      ++refetchCount
      const session = getSession()
      console.log('22222getGameSession', this)
      const gameSession = getGameSession(this)
      //gameSession.lastUpdatedAt=gameSession.lastUpdatedAt || 0

      const lastUpdatedAt = session.isAdmin ? session.userSession.lastUpdatedAt : session.lastUpdatedAt
      const outdated = lastUpdatedAt >= user.lastUpdatedAt
      // console.log('outdated', outdated,lastUpdatedAt, user.lastUpdatedAt)

      if (outdated) {
        console.info('server memory outdated', outdated, lastUpdatedAt - user.lastUpdatedAt)
        return
      }

      //console.log('hook refetch', user)
      this.updateDisplay(user.tictactoe)

      //game is won
      if (user.tictactoe.winningPlayer && !gameSession.winningPlayer) {
        gameWon(gameSession, gameSession.winningPlayer)
      }
    })
  }

  updateDisplay(session, gameSession) {
    if (gameSession.player1) {
      setPlayer1Emoji(gameSession.player1Emoji)
    }
  
    const selectPlayer1 = document.getElementById('select-player-1')
    if (getPlayer1Emoji() && gameSession.player1Emoji) {
      selectPlayer1.value = getPlayer1Emoji()
      selectPlayer1.setAttribute('disabled', true)
      this.checkForStart(session, gameSession)
    } else {
      //TODO:will need to restore disabling player select
      //selectPlayer1.removeAttribute('disabled')
      //selectPlayer1.value = '' 
    }
  
    if (gameSession.player2) {
      setPlayer2Emoji(gameSession.player2Emoji)
    }
  
    const selectPlayer2 = document.getElementById('select-player-2')
    if (getPlayer2Emoji() && gameSession.player2Emoji) {
      selectPlayer2.value = getPlayer2Emoji()
      selectPlayer2.setAttribute('disabled', true)
      this.checkForStart(session, gameSession)
    } else {
      //TODO:will need to restore disabling player select
      //selectPlayer2.removeAttribute('disabled')
      //selectPlayer2.value = ''
    }

    this.setGameSession({...gameSession})
  
    if (gameSession.startedAt) {
      const boardShown = isBoardShown()
      if (!boardShown) {
        console.info('board opened by refetch')
        showBoard()
        this.addListeners(session, gameSession)
      }
    } else {
      //hideBoard()
    }
  
    gameSession.board.forEach((space, i) => {
      markBoardSpace(i, space)
    })
  
    setCurrentPlayer(gameSession.currentPlayer)
    document.getElementById('current-player').innerHTML = gameSession.currentPlayer
  }

  startGame(session, gameSession) {
    console.info('game started locally')
    gameSession.startedAt = Date.now()
    gameSession.currentPlayer = gameSession.player1Emoji
    this.updateDisplay(session, gameSession)
    saveGameSession(session, gameSession, 'tictactoe')
    this.addListeners(session, gameSession)
  }

  setPlayer1(emoji) {
    const { session, gameSession } = paramSession(this)
    setPlayer1Emoji(gameSession.player1Emoji = emoji)
    this.checkForStart(session, gameSession)
    this.updateDisplay(session, gameSession)
  }
  
  setPlayer2(emoji) {
    const { session, gameSession } = paramSession(this) // ensure we have game memory
    setPlayer2Emoji(gameSession.player2Emoji = emoji)
    this.checkForStart(session, gameSession)
    this.updateDisplay(session, gameSession)
  }

  checkForStart(session, gameSession) {
    if (gameSession.startedAt) {
      console.warn('game already started')
      return
    }
  
    // Assume userType is user if its not defined. Allows a user to play by themselves
    session.userType = session.userType || 'user'
  
    if (getPlayer1Emoji()) {
      console.log('🔴player1Emoji', getPlayer1Emoji())
    }
    const changePlayer1 = getPlayer1Emoji() && getPlayer1Emoji() !== gameSession.player1Emoji
    console.log('changePlayer1', changePlayer1, getPlayer1Emoji(), gameSession.player1Emoji)
    if (changePlayer1) {
      if (gameSession.player1 && gameSession.player1 !== session.userType) {
        console.warn('🟠 player 1 does not match userType', {
          player1Emoji: getPlayer1Emoji(),
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
      if (session.code) {
        gameSession.player2 = session.isAdmin ? 'user' : 'admin'
      } else {
        // its a local only game, no networking
        gameSession.player2 = 'user'
      }
  
      gameSession.player1Emoji = getPlayer1Emoji()
      saveGameSession(session, gameSession, 'tictactoe')
      console.info('player1 set', getPlayer1Emoji())
    }
  
    const changePlayer2 = getPlayer2Emoji() && getPlayer2Emoji() !== gameSession.player2Emoji
    if (changePlayer2) {
      if (gameSession.player2 && gameSession.player2 !== session.userType) {
        console.warn('🟠 player 2 does not match userType', {
          player2Emoji: getPlayer2Emoji(),
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
      if (session.code) {
        gameSession.player1 = session.isAdmin ? 'user' : 'admin'
      } else {
        gameSession.player1 = 'user'
      }
  
      gameSession.player2Emoji = getPlayer2Emoji()
      saveGameSession(session, gameSession, 'tictactoe')
      console.info('player2 set', getPlayer2Emoji())
    }
  
    const startReady = getPlayer1Emoji() && getPlayer2Emoji() &&
      gameSession.player1Emoji && gameSession.player2Emoji
    console.log('startReady', startReady)
    if (startReady) {
      this.startGame(session, gameSession)
    }
  }

  resetGame() {
    const session = getSession()
    showBoard()
    console.log('this', this)
    const gameSession = resetGameSession(session,this)
    return gameSession
  }

  disableBoard() {
    console.log('this11111', this)
    const gameSession = getGameSession(this)
    for (var i = 0; i < gameSession.board.length; i++) {
      document.getElementById(i).removeEventListener("click", onClick);
    }
  }

  listening=false
  addListeners(session, gameSession) {
    if (this.listening) {
      return
    }
    this.listening = true
    
    //add board click event listeners
    for (var i = 0; i < gameSession.board.length; i++) {
      document.getElementById(i).addEventListener("click", this.getElementClick(i))
    }
  
    gameSession.currentPlayer = gameSession.currentPlayer || getPlayer1Emoji()
    setCurrentPlayer(getPlayer1Emoji())
  
    saveGameSession(session, gameSession, 'tictactoe')
    console.info('event listeners added')
  }

  getElementClick(id){
    return ()=> {
      const currentPlayer = getCurrentPlayer()
      //get freshest memory at click event
      const session = getSession()
      console.log('this1111133', this)
      const gameSession = getGameSession(this)
      const myTurn = this.isPlayersTurn()

      if (!myTurn) {
        console.warn('its not your turn', {
          currentPlayer: currentPlayer,
          you: session.isAdmin ? 'admin' : 'user',
          gameSession: gameSession
        })
        return
      }

      onClick(id, gameSession.board, gameSession, (gameSession)=>this.checkForWinner(gameSession));

      gameSession.currentPlayer = currentPlayer
      saveGameSession(session, gameSession, 'tictactoe')
    }
  }

  checkForWinner(gameSession) {

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
        this.disableBoard();
        return true;
      }
    }
    if (gameSession.board.every((val) => val !== "")) {
      document.getElementById("winner").innerHTML = "Tie!";
    }
    console.log('gameSession.board', gameSession.board)
  }

  isPlayersTurn() {
    const session = getSession()
  
    // is this just a local game and not network connected?
    if (!session.code) {
      return true // its always someones turn then
    }
  
    const gameSession = getGameSession(this)
    const isAdminPlayer1 = gameSession.player1 === 'admin'
    const isSessionAdmin = session.isAdmin
  
    if (isAdminPlayer1 && isSessionAdmin) {
      return getCurrentPlayer() === gameSession.player1Emoji
    }
  
    if (!isAdminPlayer1 && isSessionAdmin) {
      return getCurrentPlayer() === gameSession.player2Emoji
    }
  
    if (!isAdminPlayer1 && !isSessionAdmin) {
      return getCurrentPlayer() === gameSession.player1Emoji
    }
  
    if (isAdminPlayer1 && !isSessionAdmin) {
      return getCurrentPlayer() === gameSession.player2Emoji
    }
  
    return false
  }
}


/*function hideBoard() {
  const boardElement = document.getElementById('board');
  boardElement.style.display = 'none';
}*/

function showBoard() {
  const boardElement = document.getElementById('board');
  boardElement.style.display = 'block';
  boardElement.classList.remove('displayNone')
}

function isBoardShown() {
  return document.getElementById('board').style.display !== 'none'
}