import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';

export class OtherPlayers extends Component {

  componentDidUpdate(){
  }

  render() { 
    let list = this.props.playerList.map( player => { 
      let cardsIndicator,
        backgroundColor;
      if (player.finished) {
        cardsIndicator = player.rank
        backgroundColor = "lightskyblue"
      } else if (player.saidUno) {
        cardsIndicator = "[UNO]"
        backgroundColor = "lightsalmon"
      } else {
        cardsIndicator = "[" + player.numberOfCards + "]"
      }

      let style = {"backgroundColor": backgroundColor, "border": "1px solid lightgrey"}

      if (player.id === this.props.turn) {
        style = {"backgroundColor" : "lightgreen", "border": "1px solid green"}
      }
      return(
        <div 
          className="sidebar-player-list" 
          key={player.id} 
          style={style}
        >
          <p className="player-element">
            <span>
              <big>{player.king ? "\u265A " : "\u265F "}</big> 
              {player.name} 
              <strong> {cardsIndicator}</strong>
            </span>
            {(this.props.king && !player.king) 
            ? <span className="waste" onClick={() => this.props.kickPlayer(player.id)}>{"\u{1F5D1}"}</span>
            : ""}
          </p>
        </div>
      )
    })
    return (
      <Fragment>
        <strong>Lobby</strong> <br/>
        {list}
      </Fragment>
    )
  }
}

OtherPlayers.propTypes = {
  playerList: PropTypes.array,
  turn: PropTypes.number
};


export default OtherPlayers
