import React from 'react'
import { FieldSearchWeigh } from '../field'
import TableWeigh from '../table/TableWeigh'

const TabWeigh = (props) => {
  const { } = props

  return (
    <div>
      <FieldSearchWeigh />
      <TableWeigh />
    </div>
  )
}

export default React.memo(TabWeigh)
