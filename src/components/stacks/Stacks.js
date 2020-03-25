import React, { Component } from 'react'
import Deck from './Deck'
import Pile from './Pile'

export class Stacks extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-1">
        {/* aufnahmestapel */}
        <Deck playerID={this.props.playerID}/>
        </div>
        <div className="col-sm-11">
        {/* ablagestapel */}
        <Pile />
        </div> 
      </div>
    )
  }
}

export default Stacks
