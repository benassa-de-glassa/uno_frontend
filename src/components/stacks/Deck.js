import React, { Component } from 'react'

import PlayerContext from '../../context/PlayerContext'

// Aufnahmestapel
export class Deck extends Component {

  render() {
    return (
      <PlayerContext.Consumer>
        { context =>
          <div className="card" id="turnedcard" onClick={ context.pickupCard }></div>
        }
      </PlayerContext.Consumer>
    )
  }
}

export default Deck
