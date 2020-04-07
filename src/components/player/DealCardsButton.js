import React from 'react'
import { Button } from 'react-bootstrap'

import PlayerContext from '../../context/PlayerContext';


function Deal7Button() {
  return (
    <PlayerContext.Consumer>
      { context => 
        <div>
          { !context.props.initialCardsDealt &&
                <Button 
                  className="deal" 
                  onClick = { context.dealInitialCards }
                >
                    Give me cards
                </Button>
          }
        </div>
      }
    </PlayerContext.Consumer>
  )
}

export default Deal7Button
