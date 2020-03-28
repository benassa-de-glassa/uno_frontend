import React, { Component } from 'react';
import PlayerContext from './PlayerContext'

import { API_URL } from '../paths'

class PlayerProvider extends Component {
  constructor(props){
    super(props)
    this.props = props
    this.state = {
      player: {
        id: undefined,
        name: ''
      },
      canChooseColor: false,
      cardPickedUp: false,
      saidUno: false,
    }
    this.dealInitialCards = this.dealInitialCards.bind(this);
    this.updateCards = this.updateCards.bind(this);
    this.playBlackCard = this.playBlackCard.bind(this);
    this.playCard = this.playCard.bind(this);
    this.pickupCard = this.pickupCard.bind(this);
    this.cantPlay = this.cantPlay.bind(this);
    this.chooseColor = this.chooseColor.bind(this);
    this.sayUno = this.sayUno.bind(this);
    this.clearPlayer = this.clearPlayer.bind(this);
  }

  async dealInitialCards () {
    this.props.dealInitialCards(this.state.player.id)
    this.updateCards()
  }
  
  async updateCards() {
    this.props.updateCards(this.state.player.id)
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
        if (d[0]) { this.setState({canChooseColor: true}) }
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

    // d is an array of length 3
    // the first entry is if a card was picked up whereas the second indicates
    // if the card was picked up because of a penalty
    response.json()
      .then( d => { 
        console.log(d);
        if ( d[0] && !d[1] ) { this.setState({cardPickedUp: true}) } 
      })
    
    this.setState({saidUno: false})
    this.updateCards()
    this.props.updateTopCard()
    this.props.updateActivePlayer()
  }

  async cantPlay() {
    var url = new URL(API_URL);
    url.pathname += "game/cant_play" 
    url.searchParams.append("player_id", this.state.player.id)
    
    const response = await fetch(url, {method:'POST'})
    response.json()
      .then( d => { console.log(d) } )
    
    this.setState({cardPickedUp: false})
    this.props.updateActivePlayer()
  }

  async chooseColor(color) {
    var url = new URL(API_URL);
    url.pathname += "game/choose_color" 
    url.searchParams.append("player_id", this.state.player.id)
    url.searchParams.append("color", color)
    
    const response = await fetch(url, {method:'POST'})
    response.json()
      .then( d => { console.log(d) } )

    this.setState({canChooseColor: false})
    this.props.colorSelected(color)

  }

  async sayUno() {
    var url = new URL(API_URL);
    url.pathname += "game/say_uno" 
    url.searchParams.append("player_id", this.state.player.id)
    
    const response = await fetch(url, {method:'POST'})
    response.json()
      .then( d => { 
        console.log(d);
        if (d[0]) { this.setState({saidUno: true})}
      })
  }

  clearPlayer() {
    this.setState({player:{name: "", id: undefined}})
  }

  render() {
    return(
      <PlayerContext.Provider 
        value={{
          state: this.state,
          props: this.props,
          dealInitialCards: this.dealInitialCards,
          updateCards: this.updateCards,
          updateUser: player => { 
            player.then(player => this.setState({player:player}))
          },
          playCard: this.playCard,
          playBlackCard: this.playBlackCard,
          chooseColor: this.chooseColor,
          pickupCard: this.pickupCard,
          cantPlay: this.cantPlay,
          sayUno: this.sayUno,
          clearPlayer: this.clearPlayer,
        }}
      >     
        {this.props.children}
      </PlayerContext.Provider>
    )
  }
}

export default PlayerProvider