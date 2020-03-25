import React, { Component } from 'react'
import Hand from './Hand'
import Deal7Button from './DealCardsButton'
import UnoButton from './UnoButton'
import StartGameButton from './StartGameButton'

export class Player extends Component {
    constructor(props){
        super(props)
        this.state = {
            isPlaying: true,
            hasUno: false,
        }
    }
    render() {
        return (
            <div className="player">
                <UnoButton hasUno={this.state.hasUno}/>
                <Deal7Button/>
                <StartGameButton/>
                <Hand/>
            </div>
        )
    }
}

export default Player
