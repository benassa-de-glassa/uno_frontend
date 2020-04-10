import React, { Component } from 'react'
import { Button, FormGroup, Form, FormControl, FormLabel } from 'react-bootstrap'

import PlayerContext from '../../context/PlayerContext';

import {API_URL} from '../../paths'


export class UserRegistration extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      value: "",
    };
    
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
    const responseJson = await response.json()

    if (responseJson.requestValid) {
      this.props.playerLoggedIn(responseJson.player)
      context.setPlayer(responseJson.player)
    } else {
      console.log(responseJson.message)
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
