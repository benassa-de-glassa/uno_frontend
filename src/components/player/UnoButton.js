import React from 'react'
import { Button } from 'react-bootstrap'

import PlayerContext from '../../context/PlayerContext';

function UnoButton() {
  return (
    <PlayerContext.Consumer>
      { (value) => 
        <div style={{float:"left"}}>
          { !value.state.saidUno &&
                <Button 
                  onClick = { value.sayUno }
                >
                    Uno
                </Button>
          }
        </div>
      }
    </PlayerContext.Consumer>
  )
}

export default UnoButton
