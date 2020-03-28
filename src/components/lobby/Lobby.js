import React from 'react'

import OtherPlayers from './OtherPlayers'
import ChatLog from './ChatLog'
import SideBarWebSocket from './SideBarWebSocket'

function Lobby(props) {
  return (
    <div className="container lobby">
      <SideBarWebSocket> 
        <OtherPlayers/>
        <ChatLog messages={props.messages}/>
      </SideBarWebSocket>
    </div>
  )
}

export default Lobby
