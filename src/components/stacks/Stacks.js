import React from 'react'
import PropTypes from 'prop-types';

import Deck from './Deck'
import Pile from './Pile'
import GameState from './GameState'

function Stacks(props) {
  return (
    <div className="row">
      <div className="col-md-auto">
        <Deck />
      </div>
      <div className="col-md-auto">
        <Pile topCard={props.topCard}/>
      </div> 
      <div className="col-md-auto">
        <GameState/>
      </div>
    </div>
  )
}

Stacks.propTypes = {
  topCard: PropTypes.object
}


export default Stacks
