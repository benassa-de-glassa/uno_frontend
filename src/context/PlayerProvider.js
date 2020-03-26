import React, { Component } from 'react';
import PlayerContext from './PlayerContext'

import { API_URL } from '../paths'

class PlayerProvider extends Component {
  constructor(props){
    super(props)
    this.state = {
      initialCardsDealt: false,
      player: {
        id: undefined,
        name: ''
      },
      // test card
      cards: [],
      canChooseColor: false,
    }
    this.dealInitialCards = this.dealInitialCards.bind(this);
    this.updateCards = this.updateCards.bind(this);
    this.playBlackCard = this.playBlackCard.bind(this);
    this.playCard = this.playCard.bind(this);
    this.pickupCard = this.pickupCard.bind(this);
    this.chooseColor = this.chooseColor.bind(this);
  }

  async dealInitialCards () {
    console.log("try to deal cards to", this.state.player.id)
    this.setState({initialCardsDealt: true})

    var url = new URL(API_URL);
    url.pathname += "game/deal_cards" 
    url.searchParams.append("player_id", this.state.player.id)
    url.searchParams.append("n_cards", 7)

    await fetch(url, {method:'POST'})

    this.updateCards()
  }

  async updateCards () {
    var url = new URL(API_URL);
    url.pathname += "game/cards" 
    url.searchParams.append("player_id", this.state.player.id)

    const response = await fetch(url, {method:'GET'})
    response.json()
      .then( d => { this.setState({cards: d}) } )
  }

  async playBlackCard (card_id) {
    var url = new URL(API_URL);
    url.pathname += "game/play_black_card" 
    url.searchParams.append("player_id", this.state.player.id)
    url.searchParams.append("card_id", card_id)
    
    const response = await fetch(url, {method:'POST'})
    response.json()
      .then( d => { 
        console.log(d) 
        if (d[0]) { this.setState({canChooseColor: true})}
      })
      this.updateCards()
      this.props.updateTopCard()
      this.props.updateActivePlayer()
  }

  async playCard (card_id) {
    var url = new URL(API_URL);
    url.pathname += "game/play_card" 
    url.searchParams.append("player_id", this.state.player.id)
    url.searchParams.append("card_id", card_id)
    
    const response = await fetch(url, {method:'POST'})
    response.json()
      .then( d => { console.log(d) } )
    
      this.updateCards()
      this.props.updateTopCard()
      this.props.updateActivePlayer()
  }

  async pickupCard() {
    var url = new URL(API_URL);
    url.pathname += "game/pickup_card" 
    url.searchParams.append("player_id", this.state.player.id)
    const response = await fetch(url, {method:'POST'})
    response.json()
      .then( d => { console.log(d) } )
    
      this.updateCards()
      this.props.updateTopCard()
      this.props.updateActivePlayer()
  }

  async chooseColor (color) {
    var url = new URL(API_URL);
    url.pathname += "game/choose_color" 
    url.searchParams.append("player_id", this.state.player.id)
    url.searchParams.append("color", color)
    
    const response = await fetch(url, {method:'POST'})
    response.json()
      .then( d => { console.log(d) } )

    this.setState({canChooseColor: false})
  }

  render() {
    return(
      <PlayerContext.Provider 
        value={{
          state: this.state,
          dealInitialCards: this.dealInitialCards,
          updateCards: this.updateCards,
          updateUser: player => { 
            player.then(player => this.setState({player:player}))
          },
          playCard: this.playCard,
          playBlackCard: this.playBlackCard,
          chooseColor: this.chooseColor,
          pickupCard: this.pickupCard
        }}
      >     
        {this.props.children}
      </PlayerContext.Provider>
    )
  }
}

export default PlayerProvider