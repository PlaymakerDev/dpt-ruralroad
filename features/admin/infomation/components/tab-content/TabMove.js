import React from 'react'
import { FieldSearchMove } from '../field'
import { TableMove } from '../table'

const TabWeigh = (props) => {
  const { } = props

  return (
    <div>
      <FieldSearchMove />
      <TableMove />
    </div>
  )
}

export default React.memo(TabWeigh)
