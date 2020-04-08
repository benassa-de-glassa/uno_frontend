import React, { Component } from 'react'

import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types';

export class ChatLog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showServerLog: true,
      message: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onEnterKey = this.onEnterKey.bind(this)

  }

  handleChange(event) {
    this.setState({message: event.target.value});  
  }

  handleSubmit(event) {
    this.props.onSubmit(this.state.message)
    this.setState({message: ''})
  }

  onEnterKey(event) {
    if (event.key === 'Enter' && event.shiftKey === false ) {
      this.handleSubmit()
    }
  }


  render() {
    return (
      <div className="container m-0 p-0">
        <p className="m-0"><strong>Chat</strong></p>
        <div className="chatbox container p-0 my-0">
          { this.props.messages.map(msg => {
            if (this.state.showServerLog && (msg.sender === "server")) {
              return(
                <div className="container servermessage my-0" key={msg.id}>
                  <p className="m-1 p-0">{msg.time} {msg.text}</p>
                </div>
              )
            } else {
              return (
                <div className="container message my-0" key={msg.id}>
                  <p className="m-1 p-0"><strong>{msg.sender}</strong> [{msg.time}]</p>
                  <p className="m-0 p-0">{msg.text}</p>
                </div>
              )
            }
          })}
        </div>
        <div className="mx-0 mt-1 pb-2">
          <textarea 
            value={this.state.message}
            onChange={this.handleChange}
            onKeyUp={this.onEnterKey}
            className="form-control pl-2 my-0" 
            rows="2" 
            placeholder="Type your message here...">
          </textarea>
        </div>
        
        { 
          this.props.playerHasRegistered 
            ? <Button onClick={this.handleSubmit}> Send </Button> 
            : <Button disabled> Please enter your name first</Button>  
        }
      </div>

    )
  }
}
ChatLog.propTypes = {
  messages: PropTypes.array,
  onSubmit: PropTypes.func
};

export default ChatLog