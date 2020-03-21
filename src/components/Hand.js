import React, { Component } from 'react'

import Card from './Card'

import {API_URL} from '../paths'

export class Hand extends Component {
    constructor(props){
        super(props)
        this.state = {
            cards:[],
        }

        this.getCardsFromServer = this.getCardsFromServer.bind(this)
        this.playCard = this.playCard.bind(this)
    }

    getCardsFromServer(){
        var url = new URL(API_URL)
        url.pathname += 'player/cards'
        var params = {'player_id': this.props.playerID}
        // create the correct request based on the type parameter
        Object.keys(params).forEach(key =>
          url.searchParams.append(key, params[key])
        )
    
        // fetch the url
        // .then function chaining
        fetch(url)
          .then(res => res.json())
          .then(res => {
            this.setState(prevState => ({
              ...prevState,
              cards: res
              }
            ))
          })
      }

    playCard(e, color, number) {
        console.log(color, number)
        var url = new URL(API_URL)
        url.pathname += 'game/valid_card'
        var params = {'color': color, 'number': number}
        // create the correct request based on the type parameter
        Object.keys(params).forEach(key =>
          url.searchParams.append(key, params[key])
        )
        
        // fetch the url
        // .then function chaining
        fetch(url)
          .then(res => res.json())
          .then(res => {
            console.log(res)
          })
    }
    
    componentDidMount(){
        this.getCardsFromServer()
    }
    componentDidUpdate(prevState){
        if (this.state.cards !== prevState.cards) {
            
        }
    }

    render() {
        const onClick = (event, color, number) => this.playCard(event, color, number)
        var cards = this.state.cards.map(
            card => 
            <Card 
                color={card.color} 
                number={card.number}
                onClick={onClick}
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
