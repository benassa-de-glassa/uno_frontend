import React from 'react'
import PlayerContext from '../../context/PlayerContext'

function Test() {
    return (
        <PlayerContext.Consumer>
            {(value) => console.log(value.state.cards)}
        </PlayerContext.Consumer>
    )
}

export default Test
