import React from 'react';
import './App.scss';

import { Button } from 'react-bootstrap'

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
      <Button variant="primary" className="mr-2">Primary</Button>
        <UserRegistration />
        <Stacks />
        <Player />
      </div>
    </PlayerProvider>
  )
}



export default App;
