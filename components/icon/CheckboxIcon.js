import React from 'react'

const CheckboxIcon = (props) => {

  const { size = 10 , active = 0 ,checkboxID = null , onClick } = props

  const handleClick = () => {
      onClick(checkboxID); 
  };

  if (active == 1) {
    return (
      <svg fill="#000000" width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  style={{ cursor: 'pointer' }} onClick={handleClick}>
        <rect x={2} y={2} width={20} height={20} rx={2} style={{ fill: '#1777ff' }} stroke='#1777ff' strokeWidth="1" /> 
        <path d="M11,15.5a1,1,0,0,1-.71-.29l-3-3a1,1,0,1,1,1.42-1.42L11,13.09l4.29-4.3a1,1,0,0,1,1.42,1.42l-5,5A1,1,0,0,1,11,15.5Z" style={{ fill: '#ffffff' }} />
      </svg>
    )
  }
  else
    return (
      <svg fill="#000000" width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  style={{ cursor: 'pointer' }} onClick={handleClick} >
        <rect x={2} y={2} width={20} height={20} rx={2} style={{ fill: '#ffffff' }} stroke='grey' strokeWidth="1" />
        <path d="M11,15.5a1,1,0,0,1-.71-.29l-3-3a1,1,0,1,1,1.42-1.42L11,13.09l4.29-4.3a1,1,0,0,1,1.42,1.42l-5,5A1,1,0,0,1,11,15.5Z" style={{ fill: '#ffffff' }} />
      </svg>

    )
}



export default React.memo(CheckboxIcon)