import React from 'react'
import { FieldSearchDetail } from '../field'
import { TableDetail } from '../table'

const Detail = (props) => {
  const {setModalTruck} = props

  return (
    <>
      <FieldSearchDetail />
      <TableDetail setModalTruck={setModalTruck}/>
    </>
  )
}

export default React.memo(Detail)
