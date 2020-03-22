import React, { Component } from 'react'
import Card from '../Card'

export class Pile extends Component {
    constructor(props){
        super(props)
        this.state = {
            topCard: {id:108, color: 'pink', number: -1}
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
