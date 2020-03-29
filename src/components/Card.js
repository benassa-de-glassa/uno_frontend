import React, { Component } from 'react'

export class Card extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      color: this.props.color,
      number: this.props.number
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick(event) {
    this.props.onClick()
  }

  render() {
    // makes the text black if the card is yellow and changes the numbers
    // 10, 11, 12 to their corresponding text representation 
    // e.g. the number 10 becomes the reverse card displayed as "<=>"
    var textcolor, 
      text = this.props.number;

    if (this.props.color === "yellow") { textcolor="black" }
    else { textcolor = "white"}

    if (this.props.color === "black") {
      if (text === 0) { text = "?"}
      else if (text === 1) { text = "+4"}
    }

    
    else {
      if (text === 10 ) { text = "\u2B0C"}        // <=> unicode symbol
      else if (text === 11 ) { text = "\u2000 \u20E0"}   // (/) unicode symbol
      else if (text === 12 ) { text = "+2"}
    }
    return (
      <div 
        className='card' 
        onClick={this.onClick} 
        style={{
          background: this.props.color, 
          color: textcolor
        }}
      >
        <h3> 
          {text}
        </h3>
      </div>
    )
  }
}

export default Card
