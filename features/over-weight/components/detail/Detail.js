import React from 'react'
import { FieldSearchDetail } from '../field'
import { TableDetail } from '../table'

const Detail = (props) => {
  const { setOpen } = props

  return (
    <>
      <FieldSearchDetail />
      <TableDetail setOpen={setOpen} />
    </>
  )
}

export default React.memo(Detail)
