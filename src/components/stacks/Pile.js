import React, { Component } from 'react'
import PropTypes from 'prop-types';
import socketIO from "socket.io-client"


import Card from '../Card'
import { WS_URL } from '../../paths'


export class Pile extends Component {
  constructor(props){
    super(props)
    this.state = {
      topCard: this.props.topCard,
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
      
      socket.on('top-card', (data) => {
        if (this.state.topCard !== data.topCard) {
          this.setState({topCard: data.topCard})
        }
      });
    }
  }

  componentDidMount() {
    this.startSocketIO()
  }

  render() {
    return (
      <div>
        <Card 
          color={this.state.topCard.color}
          number={this.state.topCard.number}
        />
      </div>
    )
  }
}

Pile.propTypes = {
  topCard: PropTypes.object
}

export default Pile
