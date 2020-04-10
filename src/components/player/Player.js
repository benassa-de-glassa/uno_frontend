import React, { Component } from 'react'

import { Navbar, NavItem } from "react-bootstrap"

import Hand from './Hand'
import UnoButton from './UnoButton'
import DealCardsButton from './DealCardsButton'
import ChooseColor from './ChooseColor'
import CantPlayButton from './CantPlayButton'

export class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: true,
    }
  }
  render() {
    return (
      <div className="container player">
        <Navbar className="px-2">
          <NavItem className="mr-2">
            <DealCardsButton />
          </NavItem>
          <NavItem>
            <CantPlayButton />
          </NavItem>
          <NavItem className="mr-auto">
            <ChooseColor />
          </NavItem>
          <NavItem>
            <UnoButton />
          </NavItem>
        </Navbar>
        <Hand />

      </div>
    )
  }
}

export default Player
