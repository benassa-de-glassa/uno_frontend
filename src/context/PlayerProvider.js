import React, { Component } from 'react';
import PlayerContext from './PlayerContext'

import { API_URL } from '../paths'

class PlayerProvider extends Component {

  constructor(props){
    super(props)
    this.state = {
      player: {
        id: undefined,
        name: ''
      },
      // test card
      cards: [],
      topCard: {id: 999, color: "grey", number: ""},
      activePlayer: {id: -1, name: "no one"},
    }
    this.updateCards = this.updateCards.bind(this);
    this.updateTopCard = this.updateTopCard.bind(this);
    this.playBlackCard = this.playBlackCard.bind(this);
    this.playCard = this.playCard.bind(this);
    this.updateActivePlayer = this.updateActivePlayer.bind(this);
  }

  async updateCards () {
    var url = new URL(API_URL);
    url.pathname += "game/cards" 
    url.searchParams.append("player_id", this.state.player.id)

    const response = await fetch(url, {method:'GET'})
    response.json()
      .then( d => { this.setState({cards: d}) } )
  }

  async updateTopCard () {
    var url = new URL(API_URL);
    url.pathname += "game/top_card" 

    const response = await fetch(url, {method:'GET'})
    response.json()
      .then( d => { this.setState({topCard: d}) } )
  }
  
  async playBlackCard (card_id) {
    var url = new URL(API_URL);
    url.pathname += "game/play_black_card" 
    url.searchParams.append("player_id", this.state.player.id)
    url.searchParams.append("card_id", card_id)
    
    const response = await fetch(url, {method:'POST'})
    response.json()
      .then( d => { console.log(d) } )
    
      this.updateCards()
      this.updateTopCard()
      this.updateActivePlayer()
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
      this.updateTopCard()
      this.updateActivePlayer()
  }

  async updateActivePlayer () {
    var url = new URL(API_URL);
    url.pathname += "game/active_player" 
    const response = await fetch(url, {method:'GET'})
    response.json()
      .then( d => this.state.activePlayer = d )
  }

  render() {
    return(
      <PlayerContext.Provider 
        value={{
          state: this.state,
          updateCards: this.updateCards,
          updateTopCard: this.updateTopCard,
          updateActivePlayer: this.updateActivePlayer,
          updateUser: player => { 
            player.then(player => this.setState({player:player}))
          },
          playCard: this.playCard,
          playBlackCard: this.playBlackCard
        }}
      >     
        {this.props.children}
      </PlayerContext.Provider>
    )
  }
}

export default PlayerProvider