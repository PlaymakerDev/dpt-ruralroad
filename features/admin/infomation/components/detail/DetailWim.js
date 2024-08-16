import React from 'react'
import FieldSearchDetailWim from '../field/FieldSearchDetailWim'
import TableDetailWim from '../table/TableDetailWim'

const DetailWim = (props) => {
  const {setModalWim} = props

  return (
    <>
    <FieldSearchDetailWim />
    <TableDetailWim setModalWim={setModalWim}/>
    </>
  )
}

export default React.memo(DetailWim)
