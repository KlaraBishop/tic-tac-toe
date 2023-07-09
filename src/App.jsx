import { useState } from 'react';
import './stylesheets/App.css'
import { useEffect } from 'react';

const App = () => {
  const [turnCount, setTurnCount] = useState(0);
  const [boardState, setBoardState] = useState(['','','','','','','','','']);
  const [message, setMessage] = useState('Click a square to start')
  const [activeGame, setActiveGame] = useState(true)

  useEffect(() => {
    if(turnCount >= 9 ){
      setActiveGame(false)
      setMessage('DRAW!')
      return
    }

    const temp = checkWinner()

    if (temp.winner) {
      setActiveGame(false)
      setMessage(`${temp.player} wins!`.toUpperCase())
    }
    else if(turnCount === 0) return
    else setMessage(turnCount%2 === 0 ? "Player 1 turn" : "Player 2 turn")
  }, [boardState])

  const reset = () => {
    setBoardState(['','','','','','','','',''])
    setTurnCount(0)
    setMessage('Click a square to start!')
    setActiveGame(true)
  }

  const onCellClick = (id) => {
    if(!activeGame) return

    var player = turnCount%2 === 0 ? 'x' : 'o'

    setBoardState(() => {
      return boardState.map((cell, i) => {
          if (i === id){
            if(cell) return cell            

            setTurnCount(turnCount + 1)
            return player
          }
          else {
            return cell
          }
      })
    })
  }

  const checkWinner = () => {
    if (turnCount < 5) return { "winner" : false }

    //const winMap = ['123','159', '147', '258', '357', '369', '456', '789']

    if (boardState[0] === boardState[1] && boardState[0] === boardState[2] && boardState[0]){
      return { "winner" : true, "player" : boardState[0]}
    }
    if (boardState[0] === boardState[4] && boardState[0] === boardState[8] && boardState[0]){
      return { "winner" : true, "player" : boardState[0]}
    }
    if (boardState[0] === boardState[3] && boardState[0] === boardState[6] && boardState[0]){
      return { "winner" : true, "player" : boardState[0]}
    }
    if (boardState[1] === boardState[4] && boardState[1] === boardState[7] && boardState[1]){
      return { "winner" : true, "player" : boardState[1]}
    }
    if (boardState[2] === boardState[4] && boardState[2] === boardState[6] && boardState[2]){
      return { "winner" : true, "player" : boardState[2]}
    }
    if (boardState[2] === boardState[5] && boardState[2] === boardState[8] && boardState[2]){
      return { "winner" : true, "player" : boardState[2]}
    }
    if (boardState[3] === boardState[4] && boardState[3] === boardState[5] && boardState[3]){
      return { "winner" : true, "player" : boardState[3]}
    }
    if (boardState[6] === boardState[7] && boardState[6] === boardState[8] && boardState[6]){
      return { "winner" : true, "player" : boardState[6]}
    }

    return { "winner" : false }
  }

  return <div className="App">
      <div className="container">
        <h2>{message}</h2>
        <table>
          <tbody>
            <tr>
              <td onClick={() => onCellClick(0)}>{boardState[0]}</td>
              <td onClick={() => onCellClick(1)}>{boardState[1]}</td>
              <td onClick={() => onCellClick(2)}>{boardState[2]}</td>
            </tr>
            <tr>
              <td onClick={() => onCellClick(3)}>{boardState[3]}</td>
              <td onClick={() => onCellClick(4)}>{boardState[4]}</td>
              <td onClick={() => onCellClick(5)}>{boardState[5]}</td>
            </tr>
            <tr>
              <td onClick={() => onCellClick(6)}>{boardState[6]}</td>
              <td onClick={() => onCellClick(7)}>{boardState[7]}</td>
              <td onClick={() => onCellClick(8)}>{boardState[8]}</td>
            </tr>
          </tbody>
        </table>
        <input type='button' id='reset-button' value='Reset' onClick={() => reset()}/>
      </div>
    </div>
}

export default App
