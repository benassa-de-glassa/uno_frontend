import React, { Component } from 'react'

import PlayerContext from '../../context/PlayerContext'

import Card from '../Card'


import { API_URL } from '../../paths'

// Aufnahmestapel
export class Deck extends Component {
  constructor(props) {
    super(props)
    this.getCards = this.getCards.bind(this)
  }
  async getCards(playerID) {
    // get new card from server
    var url = new URL(API_URL)
    url.pathname += 'game/take_card'
    var params = { 'player_id': playerID }
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    )
    const response = await fetch(url, { method: 'POST' })
    console.log(response)
    const updatedCards = await response.json()
    // use consumer
    return updatedCards
  }

  render() {
    return (
      <PlayerContext.Consumer>
        {context =>
          <Card
            color={'black'}
            number={'back \n side'}
            onClick={() => context.updateCards(this.getCards(context.state.player.id))}
          />
        }
      </PlayerContext.Consumer>
    )
  }
}

export default Deck
