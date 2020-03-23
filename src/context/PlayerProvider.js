import React, { Component } from 'react';
import PlayerContext from './PlayerContext'

// import { API_URL } from '../paths'

class PlayerProvider extends Component {

  constructor(props){
    super(props)
    this.state = {
      player: {
        id: undefined,
        name: ''
      },
      cards: []
    }
  }
  
  //// REDO LATER with context.. move to provider()?
  //   async initialCards() {
  //     var url = new URL(API_URL)
  //     url.pathname += 'player/cards'
  //     var params = { player_name: this.state.player.id }
  //     // create the correct request based on the type parameter
  //     Object.keys(params).forEach(key =>
  //       url.searchParams.append(key, params[key])
  //     )
  //     const response = await fetch(url)
  //     var updatedCards = await response
  //     updatedCards = updatedCards.json()
  //     this.setState(prevState => ({
  //       ...prevState,
  //       cards: updatedCards
  //     })
  //     )
  //   }

  render() {
    return(
      <PlayerContext.Provider 
        value={{
          state: this.state,
          updateCards: cards => {this.setState({cards: cards})},
          updateUser: player => { 
            player.then(player => this.setState({player:player}))
          }
        }}
      >
                
        {this.props.children}
      </PlayerContext.Provider>
    )
  }
}

export default PlayerProvider