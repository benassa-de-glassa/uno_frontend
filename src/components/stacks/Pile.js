import React from 'react'
import Card from '../Card'

function Pile(props) {
  return (
    <div>
      <Card 
        color={props.topCard.color}
        number={props.topCard.number}
        onClick={ props.updateTopCard }
      />
    </div>
  )
}

export default Pile
