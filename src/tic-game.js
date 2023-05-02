import { setUserHook } from "./components";
import { gameWon, getCurrentPlayer, getPlayer1Emoji, getPlayer2Emoji, markBoardSpace, onClick, setCurrentPlayer, setPlayer1Emoji, setPlayer2Emoji, getGameSession, resetGameSession, paramSession, getSession, saveGameSession } from "./shared-game-code";

export class ReactTic {
  constructor(setGameSession) {
    this.setGameSession = setGameSession
  }

  isGameSessionStarted(gameSession) {
    return gameSession.startedAt && gameSession.currentPlayer && gameSession.player1Emoji && gameSession.player2Emoji
  }

  load() {
    const session = getSession()
    const gameSession = getGameSession()
    console.info('loading game session', gameSession)
    
    setPlayer1Emoji(gameSession.player1Emoji)
    setPlayer2Emoji(gameSession.player2Emoji)

    if (gameSession.startedAt){
      const valid = this.isGameSessionStarted(gameSession)
      console.info('existing game detected', {valid})
      if ( valid ) {
        this.startGame(session,gameSession)
      } else {
        this.resetGame()
      }
    }

    this.setGameSession(gameSession)
    let refetchCount = 0
    //every 2s new info is brought in
    setUserHook((user) => {
      //console.log('refetchCount', refetchCount,user)
      if (!refetchCount) {
        console.info('first hook')
        this.updateDisplay(user.tictactoe)
      }

      ++refetchCount
      const session = getSession()
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

  updateDisplay(gameSession) {
    /*if (gameSession.player1) {
      setPlayer1Emoji(gameSession.player1Emoji)
    }
    
    if (gameSession.player2) {
      setPlayer2Emoji(gameSession.player2Emoji)
    }*/

    gameSession.board.forEach((space, i) => {
      markBoardSpace(i, space)
    })
  
    setCurrentPlayer(gameSession.currentPlayer)
    //document.getElementById('current-player').innerHTML = gameSession.currentPlayer
   //update react display
   this.setGameSession({...gameSession})
  }

  start() {
    const session = getSession()
    const gameSession = getGameSession()
    this.startGame(session, gameSession)
  }

  startGame(session, gameSession) {
    console.info('game started locally',gameSession)
    gameSession.startedAt = Date.now()
    gameSession.currentPlayer = gameSession.player1Emoji
    this.updateDisplay(gameSession)
    saveGameSession(session, gameSession, 'tictactoe')
    this.addListeners(session, gameSession)
  }

  setPlayer1(emoji) {
    const { session, gameSession } = paramSession(this)
    setPlayer1Emoji(gameSession.player1Emoji = emoji)
    console.info('player1 set',gameSession)
    this.checkForStart(session, gameSession)
    this.updateDisplay(gameSession)
    
    const { gameSession:gameSession2 } = paramSession(this)
    console.info('player1 set v2',gameSession2)
    
  }
  
  setPlayer2(emoji) {
    const { session, gameSession } = paramSession(this) // ensure we have game memory
    setPlayer2Emoji(gameSession.player2Emoji = emoji)
    console.info('player2 set',gameSession)
    this.checkForStart(session, gameSession)
    this.updateDisplay(gameSession)
  }

  checkForStart(session, gameSession) {
    if (gameSession.startedAt && gameSession.currentPlayer) {
      console.warn('game already started',gameSession)
      saveGameSession(session, gameSession, 'tictactoe')
      return
    }
  
    // Assume userType is user if its not defined. Allows a user to play by themselves
    session.userType = session.userType || 'user'
  
    const p1Emoji = getPlayer1Emoji()
    if (p1Emoji) {
      console.log('🔴player1Emoji', p1Emoji)
    }
    const changePlayer1 = p1Emoji && p1Emoji !== gameSession.player1Emoji
    console.log('changePlayer1', changePlayer1, p1Emoji, gameSession.player1Emoji)
    if (changePlayer1) {
      if (gameSession.player1 && gameSession.player1 !== session.userType) {
        console.warn('🟠 player 1 does not match userType', {
          player1Emoji: p1Emoji,
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
  
      gameSession.player1Emoji = p1Emoji
      
      console.info('player1 set', p1Emoji)
    }
  
    const p2Emoji = getPlayer2Emoji()
    const changePlayer2 = p2Emoji && p2Emoji !== gameSession.player2Emoji
    if (changePlayer2) {
      if (gameSession.player2 && gameSession.player2 !== session.userType) {
        console.warn('🟠 player 2 does not match userType', {
          player2Emoji: p2Emoji,
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
  
      gameSession.player2Emoji = p2Emoji
      
      console.info('player2 set', p2Emoji)
    }
  
    const startReady = p1Emoji && p2Emoji &&
      gameSession.player1Emoji && gameSession.player2Emoji
    console.log('startReady?', startReady)
    /*if (startReady) {
      this.startGame(session, gameSession)
    }*/
    saveGameSession(session, gameSession, 'tictactoe')
  }

  resetGame() {
    const session = getSession()
    const gameSession = resetGameSession(session, session.tictactoe, this)
    return gameSession
  }

  restartGame() {
    const session = getSession()
    // const gameSession = getGameSession()
    console.info('restarting game',session.tictactoe)
    const gameSession = this.resetGame()
    gameSession.currentPlayer=gameSession.player1Emoji
    console.info('start game...',gameSession)
    this.startGame(session, gameSession)
    console.info('game restarted',gameSession)
  }

  disableBoard() {
    console.log('disabling board', this)
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
