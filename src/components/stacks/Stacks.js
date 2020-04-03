import React from 'react'
import PropTypes from 'prop-types';

import Deck from './Deck'
import Pile from './Pile'
import GameState from './GameState'

function Stacks(props) {
  return (
    <div className="row" 
      style={(props.isActive) 
        ? {'backgroundColor': 'lightgreen', 'border': '1px solid green'}
        : {'backgroundColor': 'white'}}>
      <div className="col-md-auto">
        <Deck />
      </div>
      <div className="col-md-auto">
        <Pile topCard={props.topCard}/>
      </div> 
      <div className="col-md-auto">
        <GameState isActive={props.isActive}/>
      </div>
    </div>
  )
}

Stacks.propTypes = {
  topCard: PropTypes.object
}


export default Stacks
