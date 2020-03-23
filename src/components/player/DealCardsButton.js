import React, { createContext, Fragment} from 'react'

import PlayerContext from '../../context/PlayerContext';

import {API_URL} from '../../paths'

async function handleClick(player_id) {
    var url = new URL(API_URL);
    url.pathname += "game/deal_cards" 
    url.searchParams.append("player_id", player_id)
    url.searchParams.append("n_cards", 7)

    const response = await fetch(url, {method:'POST'})
    
    return await response.json()
}

function Deal7Button() {
    return (
        <PlayerContext.Consumer>
            { (value) => 
                <Fragment>
                <button 
                    className="deal" 
                    onClick = { function () {
                        var resp = handleClick(value.state.player.id)
                            .then( d => {
                                var currcards = value.state.cards
                                currcards.push(...d)
                                value.updateCards(currcards)
                              }, err => {
                                console.log(err);
                              });
                    }
                    }
                >
                    deal 7
                </button>
                </Fragment>
            }
        </PlayerContext.Consumer>
    )
}

export default Deal7Button
