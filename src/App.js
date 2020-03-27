import React, { Component, Fragment } from 'react';
import './App.css';

import PlayerProvider from './context/PlayerProvider'
import PlayerContext from './context/PlayerContext'


import UserRegistration from './components/user-registration/UserRegistration'
import Controls from './components/controls/Controls'
import Stacks from './components/stacks/Stacks'
import Player from './components/player/Player'
//import Lobby from './components/lobby/Lobby'

// if DEBUG
import { Button, Navbar, NavItem } from 'react-bootstrap'

import {API_URL} from './paths'

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      gameStarted: false,
      initialCardsDealt: false,
      players: [],
      topCard: {id: 999, color:"grey", number:""},
      activePlayerName: "",
      cards: [],
      player: {
        name: "",
        id: undefined,
      }
    }
    this.startGame = this.startGame.bind(this);
    this.playerLoggedIn = this.playerLoggedIn.bind(this);
    this.dealInitialCards = this.dealInitialCards.bind(this);
    this.updateCards = this.updateCards.bind(this);
    this.updateTopCard = this.updateTopCard.bind(this);
    this.updateActivePlayer = this.updateActivePlayer.bind(this);
    this.resetGame = this.resetGame.bind(this);

    this.DEBUG = true
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

  async dealInitialCards(player_id) {
    this.setState({initialCardsDealt: true})    

    var url = new URL(API_URL);
    url.pathname += "game/deal_cards" 
    url.searchParams.append("player_id", player_id)
    url.searchParams.append("n_cards", 7)

    await fetch(url, {method:'POST'})
  }

  async updateCards (player_id) {
    var url = new URL(API_URL);
    url.pathname += "game/cards" 
    url.searchParams.append("player_id", player_id)

    const response = await fetch(url, {method:'GET'})
    response.json()
      .then( d => { this.setState({cards: d}) } )
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
      .then( d => this.setState({activePlayerName: d.name}) )
  }

  async resetGame() {
    var url = new URL(API_URL);
    url.pathname += "game/reset_game" 
    const response = await fetch(url, {method:'POST'})
    response.json()
      .then( d => { console.log(d) } ) 
    
    this.setState({
      loggedIn:false, 
      gameStarted:false,
      initialCardsDealt: false,
      players: [],
      topCard: {id: 999, color:"grey", number:""},
      activePlayerName: "",
      cards: [],
    })
  }
  

  render () {
    return (
<PlayerProvider 
    updateCards={this.updateCards}
    updateTopCard={this.updateTopCard} 
    updateActivePlayer={this.updateActivePlayer}
    initialCardsDealt={this.state.initialCardsDealt}
    dealInitialCards={this.dealInitialCards}
    cards={this.state.cards}
>
  <PlayerContext.Consumer>
    { context => 
      <div className="App">
        <Navbar style={{backgroundColor: "darksalmon"}}>
          <NavItem className="mr-3">
            <h1>Inegleit <small>Online</small></h1>
          </NavItem>
          { this.state.loggedIn && 
            <NavItem className="mr-2 ml-2">
              <Controls gameStarted={this.state.gameStarted} startGame={this.startGame}/>
            </NavItem>
          } 
          { this.DEBUG &&
            <NavItem className="mr-auto">
            <Button variant="danger" onClick={ () => {
              this.resetGame();
              context.clearPlayer(); }
              }
            >
              Reset Game
            </Button>
            </NavItem>
          }
          { (context.state.player.name !== "") &&
            <Fragment>
            <NavItem className="mr-sm-2">
              <p>Playing as</p>
            </NavItem>
            <NavItem className="mr-sm-2">
              <p className="text-md-left font-weight-bold ml-2">
                {context.state.player.name} ( id = {context.state.player.id} )
              </p>
              
            </NavItem>
            </Fragment>
          }
          </Navbar>
    
      <UserRegistration loggedIn={this.state.loggedIn} playerLoggedIn={this.playerLoggedIn}/>
      <div className="container">
        <div className="row">
          <div className="col">
          { this.state.loggedIn && this.state.gameStarted &&
            <div>
              <Stacks 
                topCard={this.state.topCard} 
                updateTopCard={this.updateTopCard}
                activePlayerName={this.state.activePlayerName}
              />
              <Player/>
            </div>
          }
          </div>
          <div className="col">
            <p>Here comes the lobby</p>
          </div>
        </div>
      </div>
    </div>
    }
  </PlayerContext.Consumer> 
</PlayerProvider>
      
    );
  } 
}

export default App;
