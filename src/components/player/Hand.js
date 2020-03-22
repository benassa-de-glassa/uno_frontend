import React, { Component } from 'react'

import Card from '../Card'

import {API_URL} from '../../paths'

export class Hand extends Component {
    constructor(props){
        super(props)
        this.state = {
            cards:{},
        }

        this.getCardsFromServer = this.getCardsFromServer.bind(this)
        this.playCard = this.playCard.bind(this)
    }

    async getCardsFromServer(){
        var url = new URL(API_URL)
        url.pathname += 'player/cards'
        var params = {'player_id': this.props.playerID}
        // create the correct request based on the type parameter
        Object.keys(params).forEach(key =>
          url.searchParams.append(key, params[key])
        )
        const response = await fetch(url)
        const updatedCards= await response.json()
        this.setState(prevState => ({
          ...prevState,
          cards: updatedCards
          }
        ))
      }

    async playCard(id) {
      var url = new URL(API_URL)
      url.pathname += 'game/valid_card'
      var playCardParams = {'card_id': id}
      // create the correct request based on the type parameter
      Object.keys(playCardParams).forEach(key =>
        url.searchParams.append(key, playCardParams[key])
      )

      // check with the backend whether we are allowed to play this card
      // var isPlayableCard = false
      const valid_card_response = await fetch(url, {method: 'POST'})
      const updatedCards= await valid_card_response.json()
      this.setState(prevState => ({
        ...prevState,
        cards: updatedCards
        }
      ))      
    }
    
    componentDidMount(){
        this.getCardsFromServer()
    }
    componentDidUpdate(prevState){
        if (this.state.cards !== prevState.cards) {
            
        }
    }

    render() {
        var cards = Object.entries(this.state.cards).map(
            ([id, card]) => 
              <Card 
                id={card.id}
                color={card.color} 
                number={card.number}
                onClick={this.playCard}
              />
        )
        return (
            <div className="hand">
                {cards}    
            </div>
        )
    }
}

export default Hand
