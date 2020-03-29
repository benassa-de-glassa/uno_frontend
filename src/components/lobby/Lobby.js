import React, { Component } from 'react'

import socketIO from "socket.io-client"
import { WS_URL } from '../../paths'
import OtherPlayers from './OtherPlayers'
import ChatLog from './ChatLog'

export class Lobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      player: [],
      turn: null,
      endpoint: WS_URL,
      messages: [],
    }
    const socket = socketIO(WS_URL, {
      transports: ['websocket'],
      jsonp: false
    });

    this.startSocketIO = () => {
      socket.connect();

      socket.on('connect', () => {
        console.log('connection to socket.io successful')
      })
      socket.on('disconnect', () => {
        console.log('connection to socket.io lost.');
      });

      socket.on('player-list', (data) => {
        //console.log(data);
        this.setState({messages: data.messages});
        if (this.state.player !== data.playerList || this.state.turn !== data.turn) {
          this.setState({ player: data.playerList, turn: data.turn })
        }
      })
    }
  }


  componentDidMount() {
    this.startSocketIO()
  }

  render() {
    return (
      <div className="container lobby">
        <OtherPlayers playerList={this.state.player} turn={this.state.turn} />
        <ChatLog messages={this.state.messages} />
      </div>
    )
  }
}

export default Lobby
