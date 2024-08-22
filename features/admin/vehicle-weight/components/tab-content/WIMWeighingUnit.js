import React, { useMemo, useState } from 'react'
import { FormSearchWIM } from '../form'
import { TableWIM } from '../table'
import { TableWIMDetail } from '../detail'
import { ModalWIMDetail } from '../modal'

const INIT_MODAL = { open: false }

const WIMWeighingUnit = (props) => {
  const { } = props
  const [step, setStep] = useState(1)
  const [open, setOpen] = useState(INIT_MODAL)

  const getDetail = useMemo(() => {
    switch (step) {
      case 1:
        return <TableWIM setStep={setStep} />
      case 2:
        return <TableWIMDetail setOpen={setOpen} />
      default:
        return null;
    }
  }, [step])

  return (
    <div>
      <section>
        <FormSearchWIM />
      </section>
      <section className='mt-5'>
        {getDetail}
      </section>
      <ModalWIMDetail
        open={open.open}
        setOpen={setOpen}
      />
    </div>
  )
}

export default React.memo(WIMWeighingUnit)
