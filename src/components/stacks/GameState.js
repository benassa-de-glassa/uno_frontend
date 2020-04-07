import React, { Component } from 'react'

import socketIO from "socket.io-client"
import { WS_URL } from '../../paths'

export class GameState extends Component {
  constructor(props) {
    super(props)
    this.state = {
      colorChosen: false,
      chosenColor: null,
      penalty: 0,
      activePlayerName: "",
      endpoint: WS_URL
    }

    const socket = socketIO(WS_URL, {
      transports: ['websocket'],
      jsonp: false
    });

    this.startSocketIO = () => {
      socket.connect();

      socket.on('connect', () => {
        console.log('GameState.js >> socket.io connection successful')
      })
      socket.on('disconnect', () => {
        console.log('GameState.js >> connection to socket.io lost.');
      });

      socket.on('gamestate', (data) => {
        // console.log("gamestate:", data);
        this.setState({
          penalty: data.penalty,
          colorChosen: data.colorChosen,
          chosenColor: data.chosenColor,
          activePlayerName: data.activePlayerName,
          forward: data.forward,
        })
      })
    }
  }

  componentDidMount() {
    this.startSocketIO()
  }

  render() {
    var directionSymbol;
    if (this.state.forward) { directionSymbol = "\u2193" }
    else { directionSymbol = "\u2191"}

    return (
      <div>
        <p className="mb-1"><strong>{this.state.activePlayerName}</strong>'s turn</p>
        <h3>{directionSymbol}</h3>
        { this.state.penalty !== 0 && 
          <h3>+{this.state.penalty}</h3>
        }
        { this.state.colorChosen &&
           <svg height="35" width="35">
             <circle cx="16" cy="16" r="15" stroke="black" strokeWidth="2" fill={this.state.chosenColor} />
           </svg> 
        }
      </div>
    )
  }
}

export default GameState
