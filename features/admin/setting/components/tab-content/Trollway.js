import React from 'react'
import { FormSearchTrollway } from '../form'
import { TableTrollway } from '../table'

const Trollway = (props) => {
  const { } = props

  return (
    <div>
      <FormSearchTrollway />
      <TableTrollway />
    </div>
  )
}

export default React.memo(Trollway)
