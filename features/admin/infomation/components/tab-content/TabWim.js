import React from 'react'
import { FieldSearchWim } from '../field'
import TableWim from '../table/TableWim'

const TabWim = (props) => {
  const { } = props

  return (
    <div>
      <FieldSearchWim />
      <TableWim />
    </div>
  )
}

export default React.memo(TabWim)
