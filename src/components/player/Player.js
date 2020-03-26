import React, { Component } from 'react'
import Hand from './Hand'
import UnoButton from './UnoButton'
import DealCardsButton from './DealCardsButton'
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
                <DealCardsButton/>
                <Hand playerID={this.props.playerID}/>
                <UnoButton hasUno={this.state.hasUno}/>
            </div>
        )
    }
}

export default Player
