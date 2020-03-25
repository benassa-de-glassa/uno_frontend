import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

import PlayerContext from '../../context/PlayerContext';

import {API_URL} from '../../paths'


export class UserRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      value: "",
      loggedIn: true };
    
    this.hideComponent= this.hideComponent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  hideComponent() {}

  handleChange(event) {    
    this.setState({value: event.target.value});  
  }
  async handleSubmit(event, context) {
    event.preventDefault()
    // if the id is undefined a new user is registered with the server, else just the name is updated
    var url = new URL(API_URL)
    url.pathname += 'game/add_player'
    
    if(context.state.player.id === undefined) {
      var params = { player_name: this.state.value }
      // create the correct request based on the type parameter
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key])
      )
    }

    this.setState( {show: false} );
    
    const response = await fetch(url, {method:'POST'})
    return await response.json()
  }

  render() {
    return (
      <PlayerContext.Consumer> 
        {context =>
<div>
{ this.state.loggedIn && 
  <form onSubmit={e => context.updateUser(this.handleSubmit(e, context))}>
    <div className="form-group">
      <label htmlFor="usr">Name:</label>
      <input type="text" className="form-control" id="usr" value={this.state.value} 
                onChange={this.handleChange} />
      <div className="input-group-btn">
        <button type="submit" className="btn btn-default">Submit</button>
      </div>
    </div>
  </form>
  }
  <p>
    Your Name: {context.state.player.name}  
  </p>
  <p>
    Your ID: {context.state.player.id}
  </p>
</div>
        }
      </PlayerContext.Consumer> 

    );
  }
}
export default UserRegistration
