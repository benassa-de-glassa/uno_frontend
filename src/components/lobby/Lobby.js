import React from 'react'

import OtherPlayers from './OtherPlayers'
import ChatLog from './ChatLog'
import SideBarWebSocket from './SideBarWebSocket'

function Lobby() {
  return (
    <div className="container lobby">
      <SideBarWebSocket> 
        <OtherPlayers/>
        <ChatLog/>
      </SideBarWebSocket>
    </div>
  )
}

export default Lobby
