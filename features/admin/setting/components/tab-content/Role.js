import React from 'react'
import { FormSearchRole } from '../form'
import { TableRole } from '../table'

const Role = (props) => {
  const { } = props

  return (
    <div>
      <FormSearchRole />
      <TableRole />
    </div>
  )
}

export default React.memo(Role)
