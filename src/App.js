import React, { Component, Fragment } from 'react';
import './App.css';

import PlayerProvider from './context/PlayerProvider'

import UserRegistration from './components/user-registration/UserRegistration'
import Controls from './components/controls/Controls'
import Stacks from './components/stacks/Stacks'
import Player from './components/player/Player'
import Lobby from './components/lobby/Lobby'

import { Button, Navbar, NavItem } from 'react-bootstrap'

import socketIO from "socket.io-client"

import { API_URL, WS_URL } from './paths'

var INEGLEIT_ICON_DURATION = 3000 // ms

class App extends Component {
  constructor() {
    super();
    this.state = {
      socketConnected: false,
      loggedIn: false,
      gameStarted: false,
      initialCardsDealt: false,
      isActive: false,
      players: [],
      topCard: { id: 999, color: "grey", number: "" }, // placeholder
      activePlayerName: "",
      cards: [],
      player: {
        name: "",
        id: undefined,
        king: false,
      },
      saidUno: false,
      currentPenalty: 0,
      colorChosen: false,
      chosenColor: "",
      lastPlayed: 0,
      notifications: [],
      inegleitIconVisible: false,
    }
    this.startGame = this.startGame.bind(this);
    this.setPlayer = this.setPlayer.bind(this);
    this.dealInitialCards = this.dealInitialCards.bind(this);
    this.updateCards = this.updateCards.bind(this);
    this.updateTopCard = this.updateTopCard.bind(this);
    this.updateActivePlayer = this.updateActivePlayer.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.colorSelected = this.colorSelected.bind(this);
    this.sayUno = this.sayUno.bind(this);
    this.cardPlayedAt = this.cardPlayedAt.bind(this);
    this.quitGame = this.quitGame.bind(this);
    this.kickPlayer = this.kickPlayer.bind(this);

    const socket = socketIO(WS_URL, {
      transports: ['websocket'],
      jsonp: false
    })

    this.startSocketIO = () => {
      socket.connect();

      socket.on('connect', () => {
        console.log('App.js >> socket.io connection successful')
        this.setState({ socketConnected: true })
      })
      socket.on('disconnect', () => {
        console.log('App.js >> connection to socket.io lost.');
        this.setState({ socketConnected: false })
      });

      socket.on('gamestate', (data) => {
        this.setState({ isActive: data.activePlayerName === this.state.player.name })
      });

      socket.on('playerstate', (data) => {
        // player_id = -1 means it applies to all players
        if (data.player_id === this.state.player.id || data.player_id === -1) {
          if (data.message === "kicked") { 
            this.setState({ 
                loggedIn: false,
                player: { name: "", id: undefined },
                initialCardsDealt: false,
                cards: []
            })
          }
        }
      });


      socket.on('inegleit', (data) => {
        let notification = ["BOOM! " + data.playerName + " has inegleit!"]
        this.setState({ inegleitIconVisible: true })
        this.setState({ notifications: notification })
        setTimeout(() => {
          this.setState({ inegleitIconVisible: false })
          this.setState({ notifications: [] })
        }, INEGLEIT_ICON_DURATION)
      })
    }
  }

  async startGame() {
    this.setState({ gameStarted: true })
    var url = new URL(API_URL);
    url.pathname += "game/start_game"

    const response = await fetch(url, { method: 'POST' })
    response.json().then(() => {
      this.updateTopCard();
      this.updateActivePlayer();
    }).catch(err => console.log(err))
  }

  setPlayer(player) {
    this.setState({ loggedIn: true, player: player })
  }

  async dealInitialCards() {
    this.setState({ initialCardsDealt: true })

    var url = new URL(API_URL);
    url.pathname += "game/deal_cards"
    url.searchParams.append("player_id", this.state.player.id)
    url.searchParams.append("n_cards", 7)

    await fetch(url, { method: 'POST' })

    this.updateCards()
  }

  async updateCards() {
    var url = new URL(API_URL);
    url.pathname += "game/cards"
    url.searchParams.append("player_id", this.state.player.id)

    const response = await fetch(url, { method: 'GET' })
    const responseJson = await response.json()
    this.setState({ cards: responseJson })
  }

  async updateTopCard() {
    var url = new URL(API_URL);
    url.pathname += "game/top_card"

    const response = await fetch(url, { method: 'GET' })
    response.json()
      .then(d => { this.setState({ topCard: d }) })
      .catch(err => { console.log(err) })
  }

  async updateActivePlayer() {
    var url = new URL(API_URL);
    url.pathname += "game/active_player"
    const response = await fetch(url, { method: 'GET' })
    response.json()
      .then(d => { this.setState({ activePlayerName: d.name }) })
  }

  async resetGame() {
    var url = new URL(API_URL);
    url.pathname += "game/reset_game"
    url.searchParams.append("player_id", this.state.player.id)
    const response = await fetch(url, { method: 'POST' })
    const responseJson = await response.json()
    if (responseJson.requestValid) {
      console.log("game reset")
      this.setState({
        loggedIn: false,
        gameStarted: false,
        initialCardsDealt: false,
        players: [],
        topCard: { id: 999, color: "grey", number: "" },
        activePlayerName: "",
        cards: [],
      })
    }
  }

  colorSelected(color) {
    this.setState({ colorChosen: true, chosenColor: color })
  }

  cardPlayedAt(time) {
    // store the time of the last played card to allow UNO calls within 3s
    this.setState({ lastPlayed: time })
  }

  async sayUno() {
    var d = new Date();
    var n = d.getTime();

    console.log("time since last played (s)", (n - this.state.lastPlayed) / 1000)

    if ((n - this.state.lastPlayed < 3000) || 
      (this.state.activePlayerName === this.state.player.id)) {
      // the last card was played within 3 seconds or the player is still active (e.g. choosing a color or something)
      var url = new URL(API_URL);
      url.pathname += "game/say_uno"
      url.searchParams.append("player_id", this.state.player.id)

      const response = await fetch(url, { method: 'POST' })
      const responseJson = await response.json()

      if (responseJson.requestValid) {
        this.setState({ saidUno: true })
      } else {
        alert(responseJson.message)
      }
    } else {
      alert("Oops, you didn't say uno in time!")
    }
  }

  async quitGame() {
    var url = new URL(API_URL);
    url.pathname += "game/remove_player"
    url.searchParams.append("player_id", this.state.player.id)

    const response = await fetch(url, { method: 'POST' })
    const responseJson = await response.json()

    if (responseJson.requestValid) {
      this.setState(
        { 
          loggedIn: false, 
          player: { name: "", id: undefined },
          initialCardsDealt: false,
          cards: []
        }
      )
    } else {
      console.log(responseJson)
    }
  }

  async kickPlayer(player_id) {
    var url = new URL(API_URL);
    url.pathname += "game/kick_player"
    url.searchParams.append("player_id", player_id)
    url.searchParams.append("from_id", this.state.player.id)

    const response = await fetch(url, { method: 'POST' })
    const responseJson = await response.json()

    if (responseJson.requestValid) {
    } else {
      console.log(responseJson)
    }
  }

  componentDidMount() {
    this.startSocketIO()
  }

  render() {
    return (
      <PlayerProvider
        player={this.state.player}
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
        <div className="App">
          {this.state.inegleitIconVisible &&
            <div className="inegleit"></div>}
          <Navbar className="topbar">
            <NavItem className="mr-3">
              <h1>Inegleit <small>Online</small></h1>
            </NavItem>
            <NavItem className="m-1">
              <svg height="35" width="35">
                <circle cx="16" cy="16" r="10" stroke="black" strokeWidth="1" fill={this.state.socketConnected ? "green" : "red"} />
              </svg>
            </NavItem>
            {this.state.player.king &&
              <NavItem className="mr-2">
                <Button variant="danger" onClick={() => {
                  this.resetGame();
                }}
                >
                  Reset Game
                </Button>
              </NavItem>
            }
            {this.state.loggedIn &&
              <NavItem className="mr-auto ml-2">
                <Controls gameStarted={this.state.gameStarted} startGame={this.startGame} />
              </NavItem>
            }
            {(this.state.player.name !== "") &&
              <Fragment>
                <NavItem className="mr-sm-2">
                  <span className="text-md-left align-middle ml-2 mr-2">
                    Playing as  <strong>{this.state.player.name} (#{this.state.player.id})</strong>
                  </span>
                </NavItem>
                <NavItem className="mr-1">
                  <Button variant="secondary" onClick={() => {
                    this.quitGame();
                  }
                  }
                  >
                    Quit
          </Button>
                </NavItem>
              </Fragment>
            }
          </Navbar>
          <div className="container">
            <div className="row">
              <div className="col-8 p-0">
                {!this.state.loggedIn &&
                  <div>
                    <UserRegistration  
                      setPlayer={this.setPlayer}
                    />
                  </div>
                }
                {this.state.loggedIn && this.state.gameStarted &&
                  <div>
                    <Stacks
                      topCard={this.state.topCard}
                      updateTopCard={this.updateTopCard}
                      activePlayerName={this.state.activePlayerName}
                      currentPenalty={this.state.currentPenalty}
                      colorChosen={this.state.colorChosen}
                      chosenColor={this.state.chosenColor}
                      isActive={this.state.isActive}
                      notifications={this.state.notifications}
                    />
                    <Player />
                  </div>
                }
              </div>
              <div className="col-4">
                <Lobby 
                  player={this.state.player.name} 
                  king={this.state.player.king} 
                  kickPlayer={this.kickPlayer}
                />
              </div>
            </div>
          </div>
        </div>
      </PlayerProvider>
    );
  }
}

export default App;
