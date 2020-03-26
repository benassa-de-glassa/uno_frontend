import React from 'react'
import Deck from './Deck'
import Pile from './Pile'

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
    </div>
  )
}


export default Stacks
