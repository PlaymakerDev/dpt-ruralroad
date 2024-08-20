import React from 'react'
import FieldSearchDetailMove from '../field/FieldSearchDetailMove'
import TableDetailMove from '../table/TableDetailMove'

const DetailMove = (props) => {
  const { setOpen } = props
  
  return (
    <div>
      <FieldSearchDetailMove />
      <TableDetailMove
        setOpen={setOpen}
      />
    </div>
  )
}

export default React.memo(DetailMove)
