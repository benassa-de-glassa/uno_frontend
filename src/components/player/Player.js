import React, { Component } from 'react'
import Hand from './Hand'
import UnoButton from './UnoButton'

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
                <Hand playerID={this.props.playerID}/>
                <UnoButton hasUno={this.state.hasUno}/>
            </div>
        )
    }
}

export default Player
