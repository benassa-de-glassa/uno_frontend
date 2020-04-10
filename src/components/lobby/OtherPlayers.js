import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';

export class OtherPlayers extends Component {
  //constructor(props){
  //  super(props)
  //}
  
  componentDidUpdate(){
  }

  render() {
    let list = this.props.playerList.map( player => { 
      return(
        <div 
          className="sidebar-player-list" 
          key={player.id} 
          style={(player.id === this.props.turn) 
            ? {'backgroundColor': 'lightgreen', 'border': '1px solid green'}
            : {}}
        >
          <p className="player-element">
            <span><big>{player.king ? "\u265A" : "\u265F"}</big> {player.name} <strong>[{(player.saidUno) ? "UNO" : player.numberOfCards}]</strong></span>
            {this.props.king ? <span className="waste" onClick={() => this.props.kickPlayer(player.id)}>{"\u{1F5D1}"}</span> : ""}
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
