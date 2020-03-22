import React, { Component } from 'react'
import Deck from './Deck'
import Pile from './Pile'

export class Stacks extends Component {
    render() {
        return (
            <div className="stacks">
                {/* aufnahmestapel */}
                <Deck /> 
                {/* ablagestapel */}
                <Pile />
            </div>
        )
    }
}

export default Stacks
