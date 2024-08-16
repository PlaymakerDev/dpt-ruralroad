import React from 'react'
import { FieldSearchSum } from '../field'
import TableSum from '../table/TableWeigh'

const TabWeigh = (props) => {
  const { } = props

  return (
    <div>
      <FieldSearchSum />
      <TableSum />
    </div>
  )
}

export default React.memo(TabWeigh)
