import React, { Component } from 'react'

export class OtherPlayers extends Component {
    constructor(props){
        super(props)
        this.state = {
            started: true,
        }
    }
    render() {
        return (
            <div className="container">
                <p>Here come the other players</p>
            </div>
        )
    }
}

export default OtherPlayers
