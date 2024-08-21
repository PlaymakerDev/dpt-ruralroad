import React, { useMemo, useState } from 'react'
import { FormSearchStation } from '../form'
import { TableStation } from '../table'
import { TableWeightDetail } from '../detail'
import { ModalWeightDetail } from '../modal'

const INIT_MODAL = { open: false }

const StationWeighingUnit = (props) => {
  const { } = props
  const [step, setStep] = useState(1)
  const [open, setOpen] = useState(INIT_MODAL)

  const getDetail = useMemo(() => {
    switch (step) {
      case 1:
        return <TableStation setStep={setStep} />
      case 2:
        return <TableWeightDetail setOpen={setOpen} />
      default:
        return null;
    }
  }, [step])

  return (
    <div>
      <section>
        <FormSearchStation />
      </section>
      <section className='mt-5'>
        {getDetail}
      </section>
      <ModalWeightDetail
        open={open.open}
        setOpen={setOpen}
      />
    </div>
  )
}

export default React.memo(StationWeighingUnit)
