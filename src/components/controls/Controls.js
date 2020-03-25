import React, { Component } from 'react'

import { Button } from 'react-bootstrap'

export class Controls extends Component {
    constructor(props){
        super(props)
        this.props = props;
    }

    render() {
        return (
<div>
    { !this.props.gameStarted &&
        <Button onClick = { this.props.startGame }>Start Game</Button>
    }
</div>
        )
    }
}   



export default Controls
