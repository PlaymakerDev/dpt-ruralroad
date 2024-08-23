import React, { useState } from 'react'
import { FormSearchEstablishUnit } from '../components/form'
import { TableEstablishUnit } from '../components/table'
import { ModalAddEstablishUnit } from '../components/modal'

const INIT_MODAL = { open: false }

const UnitEstablishmentPlanScreen = (props) => {
  const { } = props
  const [open, setOpen] = useState(INIT_MODAL)

  return (
    <div>
      <section>
        <FormSearchEstablishUnit
          setOpen={setOpen}
        />
      </section>
      <section className='mt-5'>
        <TableEstablishUnit
          setOpen={setOpen}
        />
      </section>
      <ModalAddEstablishUnit
        open={open.open}
        setOpen={setOpen}
      />
    </div>
  )
}

export default React.memo(UnitEstablishmentPlanScreen)
