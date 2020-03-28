import React from 'react'

import OtherPlayers from './OtherPlayers'
import ChatLog from './ChatLog'

function Lobby() {
    return (
        <div className="container lobby">
        <OtherPlayers/>
        <ChatLog/>
        </div>
    )
}

export default Lobby
