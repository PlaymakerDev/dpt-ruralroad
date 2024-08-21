import React from 'react'
import FieldSearchDetailMove from '../field/FieldSearchDetailMove'
import TableDetailMove from '../table/TableDetailMove'

const DetailMove = (props) => {
  const { setOpen , setOpenPic , setOpenAdd} = props
  
  return (
    <div>
      <FieldSearchDetailMove />
      <TableDetailMove
        setOpen={setOpen}
        setOpenPic={setOpenPic}
        setOpenAdd={setOpenAdd}
      />
    </div>
  )
}

export default React.memo(DetailMove)
