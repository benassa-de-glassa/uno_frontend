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
  
  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    var objDiv = document.getElementById("chatbox");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    return (
      <div className="container m-0 p-0">
        <p className="m-0"><strong>Chat</strong></p>
        <div id="chatbox" className="chatbox container p-0 my-0">
          { this.props.messages.map(msg => {
            if (this.state.showServerLog && (msg.sender === "server")) {
              return(
                <div className="container servermessage my-0" key={msg.time}>
                  <div className="server-message-text my-0 mb-1 p-0"><span className="mr-auto">{msg.text}</span><span className="message-time">[{msg.time}]</span></div>
                </div>
              )
            } else {
              return (
                <div className="container message my-0" key={msg.id}>
                  <p className="my-0 mb-1 p-0"><span><strong>{msg.sender}</strong></span><span className="message-time">[{msg.time}]</span></p>
                  <p className="message-text m-0 p-0">{msg.text}</p>
                </div>
              )
            }
          })}
          <div style={{float:"left", clear: "both"}} 
               ref={(el) => { this.messagesEnd = el; }}>
          </div>
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