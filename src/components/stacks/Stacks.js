import React from 'react'
import PropTypes from 'prop-types';

import Deck from './Deck'
import Pile from './Pile'
import GameState from './GameState'
import Notifications from './Notifications'

function Stacks(props) {
  return (
    <div className="row stacks" 
      style={(props.isActive) 
        ? {'backgroundColor': 'lightgoldenrodyellow', 'border': '2px solid yellow'}
        : {'backgroundColor': 'white', 'border': "2px solid white"}}>
      <div className="col-md-auto">
        <Deck />
      </div>
      <div className="col-md-auto">
        <Pile topCard={props.topCard}/>
      </div> 
      <div className="col-md-auto">
        <GameState isActive={props.isActive}/>
      </div>
      <div className="col-md-auto">
        <Notifications notifications={props.notifications}/>
      </div>
    </div>
  )
}

Stacks.propTypes = {
  topCard: PropTypes.object
}


export default Stacks
