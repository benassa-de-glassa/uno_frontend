import React, { Component, Fragment } from 'react'

export class OtherPlayers extends Component {
  constructor(props){
    super(props)
    this.state = {
      started: true,
    }
  }

  componentDidUpdate(){
  }

  render() {
    let list
    list = this.props.playerList.map(player=> { 
      return(
        <div 
          className="sidebar-player-list" 
          key={player.id} 
          style={(player.id === this.props.turn) 
            ? {'backgroundColor': 'green'}
            : {}}
        >
          {player.name}
        </div>
      )
    })
    return (
      <Fragment>
        Who's playing? <br/>
        {list}
      </Fragment>
    )
  }
}

export default OtherPlayers
