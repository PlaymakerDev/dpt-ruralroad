import React from 'react'

const PreviewScreen = (props) => {
  const { id } = props

  return (
    <div>{id}</div>
  )
}

export default React.memo(PreviewScreen)
