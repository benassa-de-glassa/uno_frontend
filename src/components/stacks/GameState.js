import React from 'react'

function GameState(props) {
  return (
    <div>
    <p><strong>{props.activePlayerName}</strong>'s turn</p>
    <h3>+{props.currentPenalty}</h3>
    { props.colorChosen &&
      <p>{props.chosenColor}</p>
    }
    </div>
  )
}

export default GameState
