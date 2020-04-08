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
    
    var url = new URL(API_URL)
    url.pathname += 'game/add_player'
    url.searchParams.append("player_name", this.state.value)

    this.setState({value: ""}) // clear input
    
    const response = await fetch(url, {method:'POST'})
    const responseJSON = await response.json()

    console.log(responseJSON)

    // The response is either
    // [true, player(JSON)] or [false, "reason" (str)]
    if (responseJSON[0]) {
      this.props.playerLoggedIn(responseJSON[1])
      context.setPlayer(responseJSON[1])
    } else {
      console.log(responseJSON[1])
    }
  }

  render() {
    return (

<PlayerContext.Consumer> 
{ context =>
<div>
  <Form onSubmit={ d => this.handleSubmit(d, context)}>
    <FormGroup>
      <FormLabel>Name:</FormLabel>
        <FormControl 
          type="text" 
          placeholder="Enter your name"
          id="usr" 
          value={this.state.value} 
          onChange={this.handleChange} 
        />
    </FormGroup>
    <Button type="submit">Submit</Button>
  </Form>
</div>
}
</PlayerContext.Consumer> 
);
}
}

export default UserRegistration
