import React from 'react'
import { FormSearchCargo } from '../form'
import { TableCargo } from '../table'

const Cargo = (props) => {
  const { } = props

  return (
    <div>
      <FormSearchCargo />
      <TableCargo />
    </div>
  )
}

export default React.memo(Cargo)
