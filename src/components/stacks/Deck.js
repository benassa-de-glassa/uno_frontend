import React, { Component } from 'react'

import PlayerContext from '../../context/PlayerContext'

//import Card from '../Card'
import unologo from './images/uno_logo.png'

// Aufnahmestapel
export class Deck extends Component {

  render() {
    return (
      <PlayerContext.Consumer>
        { context =>
          <div className="card" id="turnedcard" style={{background: "black"}}
            onClick={ context.pickupCard }
          >
              <img src={unologo} alt="" width="80%" style={{marginTop: "60%", marginLeft: "5%"}}/>
          </div>
        }
      </PlayerContext.Consumer>
    )
  }
}

export default Deck
