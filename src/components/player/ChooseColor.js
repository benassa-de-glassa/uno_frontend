import React from 'react'

import { Button, ButtonGroup } from 'react-bootstrap'

import PlayerContext from '../../context/PlayerContext';

function ChooseColor() {
  return (
    <PlayerContext.Consumer>
      { (value) => 
        <div>
          {  value.state.canChooseColor &&
                <div style={{float:"left"}}>
                  <label className="mr-2">Select color </label>
                  <ButtonGroup>
                    <Button style={{backgroundColor: "red"}} onClick={ () => value.chooseColor("red")}>Red</Button>
                    <Button style={{backgroundColor: "green"}} onClick={ () => value.chooseColor("green")}>Green</Button>
                    <Button style={{backgroundColor: "blue"}} onClick={ () =>value.chooseColor("blue")}>Blue</Button>
                    <Button style={{backgroundColor: "yellow", color: "black"}} onClick={ () => value.chooseColor("yellow")}>Yellow</Button>
                    <Button style={{backgroundColor: "orange"}} onClick={ () => alert("nice try, Lara") }>Abricot</Button>
                  </ButtonGroup>
                </div>
          }
        </div>
      }
    </PlayerContext.Consumer>
  )
}

export default ChooseColor
