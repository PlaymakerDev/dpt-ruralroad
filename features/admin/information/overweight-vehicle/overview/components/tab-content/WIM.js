import React from 'react'
import { FormSearchWIM } from '../form'
import { TableWIM } from '../table'

const WIM = (props) => {
  const { } = props

  return (
    <div>
      <section>
        <FormSearchWIM />
      </section>
      <section className='mt-5'>
        <TableWIM />
      </section>
    </div>
  )
}

export default React.memo(WIM)
