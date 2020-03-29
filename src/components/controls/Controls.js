import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap'

export class Controls extends Component {
  constructor(props){
    super(props)
    this.props = props;
  }

  render() {
    return (
      <div>
        { !this.props.gameStarted &&
        <Button onClick = { this.props.startGame }>Start Game</Button>
        }
      </div>
    )
  }
}   

Controls.propTypes = {
  gameStarted: PropTypes.bool,
  startGame: PropTypes.func
}


export default Controls
