import React, { Component } from 'react'

import Card from '../Card'

import PlayerContext from '../../context/PlayerContext'

export class Hand extends Component {
  render() {
    return (
      <div className="container hand">
        <PlayerContext.Consumer>
          { (value) =>
            value.props.cards.map(
              card => 
                <Card
                  key={card.id}
                  id={card.id}
                  color={card.color}
                  number={card.number}
                  onClick={ () => {
                    if (card.color === "black") {
                      console.log("can now choose color");
                      value.playBlackCard(card.id);
                    } else {
                      console.log("clicked on", card.color, card.number);
                      value.playCard(card.id); 
                    }
                  }
                  }
                />
            )
          }
        </PlayerContext.Consumer>
      </div>
    )
  }
}

export default Hand
