import React from 'react'
import FieldSearchDetailMove from '../field/FieldSearchDetailMove'
import TableDetailMove from '../table/TableDetailMove'

const DetailMove = (props) => {

  return (
    <div>
      <FieldSearchDetailMove />
      <TableDetailMove
      />
    </div>
  )
}

export default React.memo(DetailMove)
