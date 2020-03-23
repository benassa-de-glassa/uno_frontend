import React, { Component } from 'react'

import Card from '../Card'

import { API_URL } from '../../paths'
import PlayerContext from '../../context/PlayerContext'

export class Hand extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
    }

    // this.getCardsFromServer = this.initialCards.bind(this)
    this.playCard = this.playCard.bind(this)
  }

  async playCard(card_id, player_id) {
    var url = new URL(API_URL)
    url.pathname += 'game/play_card'
    var playCardParams = { card_id: card_id, player_id: player_id }
    // create the correct request based on the type parameter
    Object.keys(playCardParams).forEach(key =>
      url.searchParams.append(key, playCardParams[key])
    )

    // check with the backend whether we are allowed to play this card
    // var isPlayableCard = false
    const valid_card_response = await fetch(url, { method: 'POST' })
    const updatedCards = await valid_card_response.json()
    
    return updatedCards
  }


  componentDidMount() {
    // this.initialCards()
  }

  render() {

    return (
      <div className="hand">
        <PlayerContext.Consumer>
          {context =>
            context.state.cards.map(
              card => 
                <Card
                  key={card.id}
                  id={card.id}
                  color={card.color}
                  number={card.number}
                  onClick={() => context.updateCards(this.playCard(context.state.player.id))}
                />
            )
          }
        </PlayerContext.Consumer>
      </div>
    )
  }
}

export default Hand
