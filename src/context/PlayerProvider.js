import React, { Component } from 'react';
import PlayerContext from './PlayerContext'

import { API_URL } from '../paths'

class PlayerProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      player: {
        id: undefined,
        name: ''
      },
      canChooseColor: false,
      cardPickedUp: false,
    }
    this.setPlayer = this.setPlayer.bind(this);
    this.playCard = this.playCard.bind(this);
    this.playBlackCard = this.playBlackCard.bind(this);
    this.pickupCard = this.pickupCard.bind(this);
    this.cantPlay = this.cantPlay.bind(this);
    this.chooseColor = this.chooseColor.bind(this);
    this.sayUno = this.sayUno.bind(this);
    this.clearPlayer = this.clearPlayer.bind(this);
  }

  setPlayer(player) {
    this.setState({ player: player })
  }

  async playCard(card_id) {
    var url = new URL(API_URL);
    url.pathname += "game/play_card"
    url.searchParams.append("player_id", this.state.player.id)
    url.searchParams.append("card_id", card_id)

    const response = await fetch(url, { method: 'POST' })
    const responseJson = await response.json()

    if (responseJson.requestValid) { 
      // card has been played
      
      // store moment of last played card to only allow UNO calls within 
      // 3 seconds of playing a card
      let d = new Date()
      let n = d.getTime()
      this.props.cardPlayedAt(n)
      this.setState({ cardPickedUp: false })
      this.props.updateCards()
    } else {
      console.log(responseJson)
    }
  }

  async playBlackCard(card_id) {
    var url = new URL(API_URL);
    url.pathname += "game/play_black_card"
    url.searchParams.append("player_id", this.state.player.id)
    url.searchParams.append("card_id", card_id)

    const response = await fetch(url, { method: 'POST' })
    const responseJson = await response.json()

    if (responseJson.requestValid) { 
      // card has been played

      // store moment of last played card to only allow UNO calls within 
      // 3 seconds of playing a card
      let d = new Date()
      let n = d.getTime()
      this.props.cardPlayedAt(n)
      this.setState({ canChooseColor: true, cardPickedUp: false })
      this.props.updateCards()
    } else {
      console.log(responseJson)
    }
  }

  async pickupCard() {
    var url = new URL(API_URL);
    url.pathname += "game/pickup_card"
    url.searchParams.append("player_id", this.state.player.id)
    const response = await fetch(url, { method: 'POST' })
    const responseJson = await response.json()

    if (responseJson.requestValid) { 
      // card has been picked up
      if (!responseJson.reasonIsPenalty) { 
        // if the card was not picked up because of a penalty the player is
        // now allowed to click on can't play to end his turn
        this.setState({ cardPickedUp: true }) 
      }
      this.setState({ saidUno: false})
      this.props.updateCards()
    } else {
      console.log(responseJson)
    }
    
  }

  async cantPlay() {
    var url = new URL(API_URL);
    url.pathname += "game/cant_play"
    url.searchParams.append("player_id", this.state.player.id)

    const response = await fetch(url, { method: 'POST' })
    const responseJson = await response.json()

    if (responseJson.requestValid)  {
      this.setState({ cardPickedUp: false }) 
    } else {
      console.log(responseJson)
    }
  }

  async chooseColor(color) {
    var url = new URL(API_URL);
    url.pathname += "game/choose_color"
    url.searchParams.append("player_id", this.state.player.id)
    url.searchParams.append("color", color)

    const response = await fetch(url, { method: 'POST' })
    const responseJson = await response.json()

    if (responseJson.requestValid) {
      // hides the color selection buttons
      this.setState({ canChooseColor: false })
    } else {
      console.log(responseJson)
    }
  }

  async sayUno() {
    this.props.sayUno(this.state.player.id)
  }

  clearPlayer() {
    this.setState({ player: { name: "", id: undefined } })
  }

  render() {
    return (
      <PlayerContext.Provider
        value={{
          state: this.state,
          props: this.props,
          dealInitialCards: this.props.dealInitialCards,
          updateCards: this.props.updateCards,
          setPlayer: this.setPlayer,
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