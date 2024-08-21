import React from 'react'
import { FormSearchStationary } from '../form'
import { TableStationary } from '../table'

const Stationary = (props) => {
  const { } = props

  return (
    <div>
      <section>
        <FormSearchStationary />
      </section>
      <section className='mt-5'>
        <TableStationary />
      </section>
    </div>
  )
}

export default React.memo(Stationary)
