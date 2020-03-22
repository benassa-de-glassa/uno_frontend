import React, { Component } from 'react'
import Card from '../Card'

export class Deck extends Component {
    constructor(props){
        super(props)
        this.onClick = this.onClick.bind(this)
    }
    onClick(){
        console.log('deck')
    }

    render() {
        return (
            <div >
                <Card 
                  color={'black'} 
                  number={'back \n side'} 
                  onClick={this.onClick}/>
            </div>
        )
    }
}

export default Deck
