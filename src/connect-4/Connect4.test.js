import * as shared from "../shared-game-code";
import { setPlayer1Emoji, setPlayer2Emoji , setBoardSpace} from "../shared-game-code";
import { Connect4Board, checkForWinner, getSpotIndex } from "./Connect4";

describe('testconnect4',()=>{
  const p1='😀'
  const p2='😄'
  beforeEach(()=>{
    jest.spyOn(shared,"markBoardSpace").mockReturnValue()
    setPlayer1Emoji(p1)
    setPlayer2Emoji(p2)
  })

  test('#checkForWinner-p2all' , () => {
    const board=new Connect4Board(()=>null)
    board.blankBoard = board.blankBoard.map(x=>p2)
    const result=checkForWinner(board)
    expect(result).toBe(true)
  });

  test('#checkForWinner-p2 some', () => {
    const board=new Connect4Board(()=>null)
    board.blankBoard[38]=p2
    board.blankBoard[39]=p2
    board.blankBoard[40]=p2
    board.blankBoard[41]=p2

    expect(getSpotIndex(0,0)).toBe(0)
    expect(getSpotIndex(1,0)).toBe(7)
    expect(getSpotIndex(2,0)).toBe(14)
    expect(getSpotIndex(3,0)).toBe(21)
    expect(getSpotIndex(4,0)).toBe(28)
    expect(getSpotIndex(5,0)).toBe(35)
    expect(getSpotIndex(5,1)).toBe(36)
    expect(getSpotIndex(5,2)).toBe(37)
    expect(getSpotIndex(5,3)).toBe(38)
    

    expect(getSpotIndex(5,4)).toBe(39)
    expect(getSpotIndex(5,5)).toBe(40)
    expect(getSpotIndex(5,6)).toBe(41)
    

    let spotCheck = board.getSpot(5,3)
    expect(spotCheck).toBe(p2)

    spotCheck = board.getSpot(5,4)
    expect(spotCheck).toBe(p2)

    spotCheck = board.getSpot(5,5)
    expect(spotCheck).toBe(p2)

    spotCheck = board.getSpot(5,6)
    expect(spotCheck).toBe(p2)

    spotCheck = board.getSpot(5,2)
    expect(spotCheck).not.toBe(p2)

    const result=checkForWinner(board)
    expect(result).toBe(true)
    expect(board.blankBoard[33]).toBe('')
    console.log('result',result)
  });

  test.only('#getDropPosition', () => {
    const board=new Connect4Board(()=>null)
    const result=board.getDropPosition(0)
    expect(result).toBe(35)

   const resultPlus=board.getDropPosition(6)
    expect(resultPlus).toBe(41)

    const result1=board.getDropPosition(1)
    expect(result1).toBe(36)
    
    //board.blankBoard[21]=p1
    const gameSession=board.getGameSession()
    const session=board.getSession()
    setBoardSpace(gameSession.board, '35', session, gameSession, board.gameName)

    expect(board.getGameSession().board[35]).toBe(p1)
    expect(getSpotIndex(5,0)).toBe(35)
    expect(board.getSpot(5,0)).toBe(p1)

    setBoardSpace(gameSession.board, '36', session, gameSession, board.gameName)
    setBoardSpace(gameSession.board, '9', session, gameSession, board.gameName)



    const result2=board.getDropPosition(0)
    expect(result2).toBe(28)

    const result3=board.getDropPosition(1)
    expect(result3).toBe(29)

    const result4=board.getDropPosition(2)
    expect(result4).toBe(2)

  } )


  test('#checkForWinner-p1 some', () => {
    const board=new Connect4Board(()=>null)
    board.blankBoard[0]=p1
    board.blankBoard[7]=p1
    board.blankBoard[14]=p1
    board.blankBoard[21]=p1

    let spotCheck = board.getSpot(0,0)
    expect(spotCheck).toBe(p1)

    spotCheck = board.getSpot(1,0)
    expect(spotCheck).toBe(p1)

    spotCheck = board.getSpot(2,0)
    expect(spotCheck).toBe(p1)

    spotCheck = board.getSpot(3,0)
    expect(spotCheck).toBe(p1)

    spotCheck = board.getSpot(4,0)
    expect(spotCheck).not.toBe(p1)

    const result=checkForWinner(board)
    expect(result).toBe(true)
    console.log('result',result)
  });
})
