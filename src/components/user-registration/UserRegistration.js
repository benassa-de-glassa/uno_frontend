import React, { Component } from 'react'
import { Button, FormGroup, Form, FormControl, FormLabel } from 'react-bootstrap'

import PlayerContext from '../../context/PlayerContext';

import {API_URL} from '../../paths'


export class UserRegistration extends Component {
  constructor(props) {
    super(props);

    this.props = props;
    this.state = { 
      value: "",};
    
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

    this.props.playerLoggedIn();
    
    const response = await fetch(url, {method:'POST'})
    return await response.json()
  }

  render() {
    return (

<PlayerContext.Consumer> 
{ context =>
<div>
{ !this.props.loggedIn && 
  <Form onSubmit={ d => context.updateUser(this.handleSubmit(d, context))}>
    <FormGroup>
      <FormLabel>Name:</FormLabel>
        <FormControl 
          type="text" 
          placeholder="Enter your name"
          id="usr" 
          value={this.state.value} 
                onChange={this.handleChange} />
    </FormGroup>
    <Button type="submit">Submit</Button>
  </Form>
}
{ this.props.loggedIn &&
<div>
<p>
  Your Name: {context.state.player.name}  
</p>
<p>
  Your ID: {context.state.player.id}
</p>
</div>
}
</div>
}
</PlayerContext.Consumer> 
);
}
}

export default UserRegistration
