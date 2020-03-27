import React from 'react'
import Deck from './Deck'
import Pile from './Pile'
import GameState from './GameState'

function Stacks(props) {
  return (
    <div className="row">
      <div className="col">
      {/* aufnahmestapel */}
      <Deck/>
      </div>
      <div className="col">
      {/* ablagestapel */}
      <Pile topCard={props.topCard} updateTopCard={props.updateTopCard}/>
      </div> 
      <div className="col">
      <GameState activePlayerName={props.activePlayerName} />
      </div>
    </div>
  )
}


export default Stacks
