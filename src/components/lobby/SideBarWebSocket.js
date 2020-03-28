import React, { Component, Fragment } from 'react'

import openSocket from "socket.io-client"
import { WS_URL } from '../../paths'

// import PlayerList from './PlayerList'
var allowedOrigins = "*,*";
const socket = openSocket(WS_URL,  {origins:allowedOrigins})

export class SideBarWebSocket extends Component {
  constructor(props){
    super(props)
    this.state = {
      player: {},
      endpoint: WS_URL
    }
    // const socket = socketIOClient(this.state.endpoint);
    }

  setPlayerList = (playerList) => {
    this.setState({player: playerList})
  }
  

  componentDidMount() {
    socket.connect()
    socket.on('player dict', data => {
      console.log(data)
      this.setState({player: data})
    })
  }

  render() {
    return (
      <Fragment>
        <div onClick={this.submitMessage}> SideBarWebSocket </div>
        {this.props.children}
      </Fragment>
    )
  }

}
export default SideBarWebSocket
