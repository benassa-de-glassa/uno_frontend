import React from 'react'
import Deck from './Deck'
import Pile from './Pile'

function Stacks(props) {
  return (
    <div className="row">
      <div className="col-sm-2">
      {/* aufnahmestapel */}
      <Deck/>
      </div>
      <div className="col-sm-10">
      {/* ablagestapel */}
      <Pile topCard={props.topCard} updateTopCard={props.updateTopCard}/>
      </div> 
    </div>
  )
}


export default Stacks
