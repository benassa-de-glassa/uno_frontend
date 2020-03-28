import React, { Component } from 'react'

export class ChatLog extends Component {
    constructor(props){
        super(props)
        this.state = {
            started: true,
        }
    }
    render() {
        return (
            <div className="container">
                <p>Here comes the chatlog</p>
            </div>
        )
    }
}

export default ChatLog
