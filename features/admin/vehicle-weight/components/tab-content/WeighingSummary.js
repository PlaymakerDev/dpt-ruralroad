import React from 'react'
import { FormSearchSummary } from '../form'
import { TableSummary } from '../table'

const WeighingSummary = (props) => {
  const { } = props

  return (
    <div>
      <section>
        <FormSearchSummary />
      </section>
      <section className='mt-5'>
        <TableSummary />
      </section>
    </div>
  )
}

export default React.memo(WeighingSummary)
