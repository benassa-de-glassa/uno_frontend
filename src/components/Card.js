import React, { Component } from 'react'

export class Card extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            color: this.props.color,
            number:this.props.number
        }
        this.onClick = this.onClick.bind(this)
    }

    onClick(event) {
        this.props.onClick(this.state.id)
    }

    render() {
        return (
            <div 
                className='card' 
                onClick={this.onClick} 
                style={{
                    background: this.props.color, 
                    }}
            >
                <h3> 
                    {this.props.number}
                </h3>
            </div>
        )
    }
}

export default Card
