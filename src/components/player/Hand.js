import React, { Component } from 'react'

import Card from '../Card'

import PlayerContext from '../../context/PlayerContext'

export class Hand extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
    }
  }

  componentDidMount() {
    // this.initialCards()
  }

  render() {
    return (
      <div className="hand">
        <PlayerContext.Consumer>
          { (value) =>
            value.state.cards.map(
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
