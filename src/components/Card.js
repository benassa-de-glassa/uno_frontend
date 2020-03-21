import React from 'react'

function Card(props) {
    const color = props.color
    const number = props.number
    return (
        <div 
            className='card' 
            onClick={props.onClick(undefined, color, number)} 
            style={{
                background: props.color, 
                }}
        >
            <h3> 
                {props.number}
            </h3>
        </div>
    )
}

export default Card
