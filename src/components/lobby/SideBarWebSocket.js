import React, { Component, Fragment } from 'react'

import socketIO from "socket.io-client"
import { WS_URL } from '../../paths'
import OtherPlayers from './OtherPlayers'


export class SideBarWebSocket extends Component {
  constructor(props){
    super(props)
    this.state = {
      player: [],
      turn: 0,
      endpoint: WS_URL
    }
    const socket = socketIO(WS_URL, {
      transports: ['websocket'],
      jsonp: false
    });
    
    this.startSocketIO = () => {
      socket.connect();
      
      socket.on('connect', () => {
        console.log('connected')
      })
      socket.on('disconnect', () => {
        console.log('connection to server lost.');
      });
      
      socket.on('player-list', (data) => {
        console.log(data)
        if (this.state.player !== data.playerList || this.state.turn !== data.turn) {
          this.setState({player: data.playerList, turn: data.turn})
        }
      });
    }
  }
 

  componentDidMount() {
    this.startSocketIO()
  }

  render() {
    return (
      <Fragment>
        <OtherPlayers playerList={this.state.player} turn={this.state.turn}/>
      </Fragment>
    )
  }

}
export default SideBarWebSocket
