import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ChatLog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showServerLog: true,
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
                  <p className="m-1 p-0">{msg.time} <strong>{msg.sender}</strong> </p>
                  <p className="m-1 p-0">{msg.text}</p>
                </div>
              )
            }
          })}
        </div>
        <div className="mx-0 mt-1 pb-2">
          <textarea className="form-control pl-2 my-0" rows="2" placeholder="Type your message here... (not working yet)"></textarea>
        </div>
      </div>

    )
  }
}
ChatLog.propTypes = {
  messages: PropTypes.array
};

export default ChatLog