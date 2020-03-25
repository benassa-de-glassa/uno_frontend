import React from 'react'

import { Button } from 'react-bootstrap'

import PlayerContext from '../../context/PlayerContext';

function ChooseColor() {
    return (
        <PlayerContext.Consumer>
            { (value) => 
            <div>
            { value.state.canChooseColor &&
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

export default ChooseColor
