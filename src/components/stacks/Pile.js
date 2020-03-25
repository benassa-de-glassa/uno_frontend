import React, { Component } from 'react'
import Card from '../Card'

import PlayerContext from '../../context/PlayerContext'

// Ablagestapel
export class Pile extends Component {
  
  render() {
    return (
      <div>
        <PlayerContext.Consumer>
          { (value) => 
            <Card 
              //   id={this.state.topCard.id}
              color={value.state.topCard.color}
              number={value.state.topCard.number}
              onClick={()=>{ value.updateTopCard() }}
            />
      }
        </PlayerContext.Consumer>
      </div>
    )
  }
}

export default Pile
