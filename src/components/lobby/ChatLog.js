import React, { Component } from 'react'

export class ChatLog extends Component {
    constructor(props){
        super(props)
        this.state = {
            started: true,
        }
        this.props = props
    }
    render() {
        return (
            <div className="container">
                { this.props.messages.map( msg => 
                    <p>{msg}</p>)
                }
            </div>
        )
    }
}

export default ChatLog
