import React from 'react'
import { Button } from 'react-bootstrap'

import PlayerContext from '../../context/PlayerContext';

function UnoButton() {
  return (
    <PlayerContext.Consumer>
      { context => 
        <div style={{float:"left"}}>
          { !context.state.saidUno &&
                <Button 
                  onClick = { context.sayUno }
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
