import React from 'react'
import { Button } from 'react-bootstrap'

import PlayerContext from '../../context/PlayerContext';


function CantPlayButton() {
  return (
    <PlayerContext.Consumer>
      { (value) => 
        <div>
          { value.state.cardPickedUp &&
            <Button 
              onClick = { value.cantPlay }
            >
              Can't play
            </Button>
          }
        </div>
      }
    </PlayerContext.Consumer>
  )
}

export default CantPlayButton
