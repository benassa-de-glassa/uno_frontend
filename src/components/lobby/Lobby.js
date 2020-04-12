import React, { Component } from 'react'

import socketIO from "socket.io-client"
import { WS_URL } from '../../paths'
import { API_URL } from '../../paths'
import OtherPlayers from './OtherPlayers'
import ChatLog from './ChatLog'

export class Lobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [],
      turn: null,
      messages: []
    }

    this.sendMessage = this.sendMessage.bind(this)
    this.addMessage = this.addMessage.bind(this)

    this.socket = socketIO(WS_URL, {
      transports: ['websocket'],
      jsonp: false
    });

    this.startSocketIO = () => {
      this.socket.connect();

      this.socket.on('connect', () => {
        console.log('Lobby.js >> socket.io connection successful')
      })
      this.socket.on('disconnect', () => {
        console.log('Lobby.js >> connection to socket.io lost.');
      });

      this.socket.on('player-list', (data) => {
        if (this.state.players !== data.playerList || this.state.turn !== data.turn) {
          this.setState({ players: data.playerList, turn: data.turn })
        }
      })

      this.socket.on('message', data => this.addMessage(data.message))
    }
  }

  componentDidMount() {
    this.startSocketIO()
  }

  addMessage(message) {
    let currentMessages = this.state.messages
    currentMessages.push(message)
    this.setState(currentMessages)
  }

  async sendMessage(message) {
    var url = new URL(API_URL);
    url.pathname += "lobby/send_message" 
    url.searchParams.append("player_name", this.props.player.name)

    url.searchParams.append("client_message", message)

    await fetch(url, {method:'POST'})
  }

  render() {
    return (
      <div className="container lobby">
        <OtherPlayers 
          playerList={this.state.players} 
          turn={this.state.turn} 
          player={this.props.player} 
          loggedIn={this.props.loggedIn}
          insultPlayer={this.props.insultPlayer}
          kickPlayer={this.props.kickPlayer}/>
        <ChatLog 
          messages={this.state.messages} 
          onSubmit={this.sendMessage} 
          playerHasRegistered={this.props.player.name !== ""}
        />
      </div>
    )
  }
}

export default Lobby
