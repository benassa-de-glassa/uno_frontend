import React, { Component, Fragment } from 'react';
import './App.css';

import PlayerProvider from './context/PlayerProvider'
import PlayerContext from './context/PlayerContext'


import UserRegistration from './components/user-registration/UserRegistration'
import Controls from './components/controls/Controls'
import Stacks from './components/stacks/Stacks'
import Player from './components/player/Player'
import Lobby from './components/lobby/Lobby'

import { Button, Navbar, NavItem } from 'react-bootstrap'

import socketIO from "socket.io-client"

import { API_URL, WS_URL} from './paths'

var DEBUG = true;
var INEGLEIT_SHOW_DURATION = 3000;

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      gameStarted: false,
      initialCardsDealt: false,
      isActive: false,
      players: [],
      topCard: {id: 999, color:"grey", number:""},
      activePlayerName: "",
      cards: [],
      player: {
        name: "",
        id: undefined,
      },
      saidUno: false,
      currentPenalty: 0,
      colorChosen: false,
      chosenColor: "",
      lastPlayed: 0,
      notification: ["Boom, Lara het inegleit"],
      inegleitIconVisible: false,
    }
    this.startGame = this.startGame.bind(this);
    this.playerLoggedIn = this.playerLoggedIn.bind(this);
    this.dealInitialCards = this.dealInitialCards.bind(this);
    this.updateCards = this.updateCards.bind(this);
    this.updateTopCard = this.updateTopCard.bind(this);
    this.updateActivePlayer = this.updateActivePlayer.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.colorSelected = this.colorSelected.bind(this);
    this.sayUno = this.sayUno.bind(this);
    this.cardPlayedAt = this.cardPlayedAt.bind(this);

    

    const socket = socketIO(WS_URL, {
      transports: ['websocket'], 
      jsonp: false
    })

    this.startSocketIO = () => {
      socket.connect();
  
      socket.on('connect', () => {
        console.log('connection to gamestate successful')
      })
      socket.on('disconnect', () => {
        console.log('connection to socket.io lost.');
      });
  
      socket.on('gamestate', (data) => {
        // console.log("gamestate:", data);
        this.setState({isActive: data.activePlayerName === this.state.player.name})
      });

      socket.on('inegleit', (data) => {
        console.log("now its supposed to show")
        this.setState({inegleitIconVisible: true})
        setTimeout( () => {
          this.setState({inegleitIconVisible: false})
          console.log("and now its suppposed to hide")
        }, INEGLEIT_SHOW_DURATION) 
      })
    }

  }

  async startGame() { 
    this.setState({gameStarted: true})
    var url = new URL(API_URL);
    url.pathname += "game/start_game" 

    const response = await fetch(url, {method:'POST'})
    response.json().then( () => {
      this.updateTopCard();
      this.updateActivePlayer();
    }).catch( err => console.log(err) )
  }

  playerLoggedIn(player) {
    this.setState({loggedIn: true, player: player})
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
      .then( d => { this.setState({activePlayerName: d.name}) })
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

  colorSelected(color) {
    this.setState({colorChosen: true, chosenColor: color})
  }

  cardPlayedAt(time) {
    this.setState({lastPlayed: time})
  }

  async sayUno(player_id) {
    var d = new Date();
    var n = d.getTime();

    console.log("time since last played (s)", (n-this.state.lastPlayed)/1000)

    if ( (n - this.state.lastPlayed < 3000) || (this.state.activePlayerName === player_id) ) {
      var url = new URL(API_URL);
      url.pathname += "game/say_uno" 
      url.searchParams.append("player_id", player_id)

      const response = await fetch(url, {method:'POST'})
      response.json()
        .then( d => { 
          console.log(d);
          if (d[0]) { this.setState({saidUno: true})}
        })
    } else {
      alert("Oops, you didn't say uno in time!")
    }
  }

  componentDidMount() {
    this.startSocketIO()
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
        colorSelected={this.colorSelected}
        sayUno={this.sayUno}
        cardPlayedAt={this.cardPlayedAt}
      >
        <PlayerContext.Consumer>
          { context => 
            <div className="App">
              { this.state.inegleitIconVisible &&
                <div className="inegleit"></div> }
              <Navbar className="topbar">
                <NavItem className="mr-3">
                  <h1>Inegleit <small>Online</small></h1>
                </NavItem>
                { this.state.loggedIn && 
            <NavItem className="mr-2 ml-2">
              <Controls gameStarted={this.state.gameStarted} startGame={this.startGame}/>
            </NavItem>
                } 
                { DEBUG &&
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
                  {context.state.player.name} ( id: {context.state.player.id} )
                </p>
              
              </NavItem>
            </Fragment>
                }
              </Navbar>
              <div className="container">
                <div className="row">
                  <div className="col-8 p-0">
                    { !this.state.loggedIn &&
            <div>
              <UserRegistration playerLoggedIn={this.playerLoggedIn}/>
            </div>
                    }
                    { this.state.loggedIn && this.state.gameStarted &&
            <div>
              <Stacks 
                topCard={this.state.topCard} 
                updateTopCard={this.updateTopCard}
                activePlayerName={this.state.activePlayerName}
                currentPenalty={this.state.currentPenalty}
                colorChosen={this.state.colorChosen}
                chosenColor={this.state.chosenColor}
                isActive={this.state.isActive}
                notifications={this.state.notification}
              />
              <Player/>
            </div>
                    }
                  </div>
                  <div className="col-4">
                    <Lobby player={context.state.player.name}/>
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
