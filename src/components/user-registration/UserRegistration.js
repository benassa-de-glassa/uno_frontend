import React, { Component, Fragment } from 'react'
import PlayerContext from '../../context/PlayerContext';

import {API_URL} from '../../paths'


export class UserRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
    
    const response = await fetch(url, {method:'POST'})
    return await response.json()
  }

  render() {
    return (
      <PlayerContext.Consumer> 
        {context =>
          <Fragment>
            <form onSubmit={e => context.updateUser(this.handleSubmit(e, context))}>
              <label>
              Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />        
              </label>
              <input type="submit" value="Submit" />
            </form>
            <p>
              Your Name: {context.state.player.name}
            </p>
          </Fragment>
        }
      </PlayerContext.Consumer> 

    );
  }
}
export default UserRegistration
