import React, { Component } from 'react'
import Hand from './Hand'
import UnoButton from './UnoButton'
import DealCardsButton from './DealCardsButton'
import ChooseColor from './ChooseColor'
import CantPlayButton from './CantPlayButton'

export class Player extends Component {
    constructor(props){
        super(props)
        this.state = {
            isPlaying: true,
        }
    }
    render() {
        return (
            <div className="player">
                <ChooseColor/>
                <DealCardsButton/>
                <CantPlayButton/>
                <Hand/>
                <UnoButton/>
            </div>
        )
    }
}

export default Player
