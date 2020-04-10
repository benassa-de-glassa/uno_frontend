import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap'

export class Controls extends Component {
  constructor(props){
    super(props)
    this.props = props;
  }

  render() {
    // if no game exists create a new game
    // if a game exists join the game
    return (
      <div>
        {this.props.loggedIn && !this.props.gameStarted &&
          <Button onClick = { this.props.startGame }>
            {this.props.loggedIn ? 
              'Join Game' : 
              'Start Game'}
          </Button>}
      </div>
    )
  }
}   

Controls.propTypes = {
  gameStarted: PropTypes.bool,
  loggedIn: PropTypes.bool,
  startGame: PropTypes.func
}


export default Controls
