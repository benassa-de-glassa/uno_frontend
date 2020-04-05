import React, { Component } from 'react'

export class Notifications extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      this.props.notifications.map( notification => <p>{notification}</p> )
    )
  }
}

export default Notifications
