import React, { Component, Fragment } from 'react'

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
            ? {'backgroundColor': 'green'}
            : {}}
        >
          <p>{player.name} <strong>[{(player.saidUno) ? "UNO" : player.numberOfCards}]</strong></p>
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

export default OtherPlayers
