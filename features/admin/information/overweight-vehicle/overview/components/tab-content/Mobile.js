import React from 'react'
import { FormSearchMobile } from '../form'
import { TableMobile } from '../table'

const Mobile = (props) => {
  const { } = props

  return (
    <div>
      <section>
        <FormSearchMobile />
      </section>
      <section className='mt-5'>
        <TableMobile />
      </section>
    </div>
  )
}

export default React.memo(Mobile)
