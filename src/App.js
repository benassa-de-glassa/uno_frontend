import React from 'react';
import './App.css';

import PlayerProvider from './context/PlayerProvider'

import UserRegistration from './components/user-registration/UserRegistration'
import Stacks from './components/stacks/Stacks'
import Player from './components/player/Player'

function App () {
  var state = {
    player: {
      id: 0,
      name: 'test_name'
    },
    cards: []
  }
  
  return (
    <PlayerProvider value={state}>
      <div className="App">
        <UserRegistration />
        <Stacks />
        <Player />
      </div>
    </PlayerProvider>
  )
}



export default App;
