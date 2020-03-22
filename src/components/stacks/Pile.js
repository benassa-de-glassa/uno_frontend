import React, { Component } from 'react'
import Card from '../Card'

export class Pile extends Component {
    constructor(props){
        super(props)
        this.state = {
            topCard: undefined
        }
    }


    render() {
        return (
            <div>
                <Card 
                //   id={this.state.topCard.id}
                  color={this.state.topCard.color}
                  number={this.state.topCard.number}
                  onClick={()=>{}}
                />
            </div>
        )
    }
}

export default Pile
