import React, { Component } from 'react';
import './App.css';

import PlayerProvider from './context/PlayerProvider'

import UserRegistration from './components/user-registration/UserRegistration'
import Controls from './components/controls/Controls'
import Stacks from './components/stacks/Stacks'
import Player from './components/player/Player'
//import Lobby from './components/lobby/Lobby'

import {API_URL} from './paths'

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      gameStarted: false,
      players: [],
      topCard: {id: 999, color:"grey", number:""},
      activePlayer: undefined,
    }
    this.startGame = this.startGame.bind(this);
    this.playerLoggedIn = this.playerLoggedIn.bind(this);
    this.updateTopCard = this.updateTopCard.bind(this);
    this.updateActivePlayer = this.updateActivePlayer.bind(this);
  }

  async startGame() { 
    this.setState({gameStarted: true})
    var url = new URL(API_URL);
    url.pathname += "game/start_game" 

    const response = await fetch(url, {method:'POST'})
    response.json().then( d => {
        this.updateTopCard();
        this.updateActivePlayer();
    }).catch( err => console.log(err) )
  }

  playerLoggedIn() {
    this.setState({loggedIn: true})
  }

  async updateTopCard () {
    var url = new URL(API_URL);
    url.pathname += "game/top_card" 

    const response = await fetch(url, {method:'GET'})
    response.json()
      .then( d => { this.setState({topCard: d}) } )
      .catch( err => { console.log(err) } )
  }

  async updateActivePlayer () {
    var url = new URL(API_URL);
    url.pathname += "game/active_player" 
    const response = await fetch(url, {method:'GET'})
    response.json()
      .then( d => this.setState({activePlayer: d}) )
  }

  render () {
    return (
      <PlayerProvider 
        updateTopCard={this.updateTopCard} 
        updateActivePlayer={this.updateActivePlayer}
      >
        <div className="App">
          <UserRegistration loggedIn={this.state.loggedIn} playerLoggedIn={this.playerLoggedIn}/>
          <div className="container">
            <div className="row">
              <div className="col">
              { this.state.loggedIn && 
                <div>
                  <Controls gameStarted={this.state.gameStarted} startGame={this.startGame}/>
                </div>
              } { this.state.loggedIn && this.state.gameStarted &&
                <div>
                  <Stacks topCard={this.state.topCard} updateTopCard={this.updateTopCard}/>
                  <Player />
                </div>
              }
              </div>
              <div className="col">
                <p>Here comes the lobby</p>
              </div>
            </div>
          </div>
        </div>
      </PlayerProvider>
    );
  } 
}

export default App;
