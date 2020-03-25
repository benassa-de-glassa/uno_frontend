import React from 'react'

import { Button } from 'react-bootstrap'

function UnoButton() {
    return (
        <Button 
          className="uno" 
          onClick={()=>alert('UNO')}
        >
            UNO!
        </Button>
    )
}

export default UnoButton
