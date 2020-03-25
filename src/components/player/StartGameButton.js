import React from 'react'

import PlayerContext from '../../context/PlayerContext';

import {API_URL} from '../../paths'

async function handleClick() {
    var url = new URL(API_URL);
    url.pathname += "game/start_game" 

    const response = await fetch(url, {method:'POST'})
    
    return await response.json()
}

function StartGameButton() {
    return (
        <PlayerContext.Consumer>
            { (value) => 
                <div>
                <button 
                    className="deal" 
                    onClick = { function () {
                        handleClick()
                            .then( d => {
                                value.updateTopCard();
                            })
                            .catch( err => console.log(err) )
                    }
                    }
                >
                    Start Game
                </button>
                </div>
            }
        </PlayerContext.Consumer>
    )
}

export default StartGameButton
