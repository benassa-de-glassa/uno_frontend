import React, { Component } from 'react'
import Hand from './Hand'
import Deal7Button from './DealCardsButton'
import UnoButton from './UnoButton'
import ChooseColor from './ChooseColor'

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
                <ChooseColor/>
                <UnoButton hasUno={this.state.hasUno}/>
                <Deal7Button/>
                <Hand/>
            </div>
        )
    }
}

export default Player
