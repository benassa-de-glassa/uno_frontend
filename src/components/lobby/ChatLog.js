import React, { Component, Fragment } from 'react'

export class ChatLog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showServerLog: true,
    }
    this.props = props
  }
  render() {
    return (
      <div className="container m-0 p-0">
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
        <div>
          <textarea className="form-control pl-2 my-0" rows="2" placeholder="Type your message here... (not working yet)"></textarea>
        </div>
      </div>

    )
  }
}

export default ChatLog