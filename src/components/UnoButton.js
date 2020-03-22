import React from 'react'

function UnoButton() {
    return (
        <button 
          className="uno" 
          onClick={()=>alert('UNO')}
        >
            UNO!
        </button>
    )
}

export default UnoButton
