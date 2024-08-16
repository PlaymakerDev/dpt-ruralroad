import React from 'react'
import FieldSearchDetailWim from '../field/FieldSearchDetailWim'
import TableDetailWim from '../table/TableDetailWim'

const DetailWim = (props) => {
  const { setOpen } = props

  return (
    <div>
      <FieldSearchDetailWim />
      <TableDetailWim
        setOpen={setOpen}
      />
    </div>
  )
}

export default React.memo(DetailWim)
