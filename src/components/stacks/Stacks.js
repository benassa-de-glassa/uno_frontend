import React from 'react'
import Deck from './Deck'
import Pile from './Pile'
import GameState from './GameState'

function Stacks(props) {
  return (
    <div className="row">
      <div className="col-md-auto">
      <Deck/>
      </div>
      <div className="col-md-auto">
      <Pile topCard={props.topCard} updateTopCard={props.updateTopCard}/>
      </div> 
      <div className="col-md-auto">
      <GameState activePlayerName={props.activePlayerName} />
      </div>
    </div>
  )
}


export default Stacks
