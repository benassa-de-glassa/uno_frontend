import React from 'react'
import { Button } from 'react-bootstrap'

import PlayerContext from '../../context/PlayerContext';

function Deal7Button() {
    return (
        <PlayerContext.Consumer>
            { (value) => 
            <div>
            { !value.state.initialCardsDealt &&
                <div>
                <Button 
                    className="deal" 
                    onClick = { value.dealInitialCards }
                >
                    Give me cards
                </Button>
                </div>
            }
            </div>
            }
        </PlayerContext.Consumer>
    )
}

export default Deal7Button
