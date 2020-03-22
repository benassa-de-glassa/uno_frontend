import React from 'react';
import './App.css';

import Player from './components/player/Player'
import Stacks from './components/stacks/Stacks'

function App() {
  return (
    <div className="App">
      <Stacks />
      <Player playerID='5' />
    </div>
  );
}

export default App;
