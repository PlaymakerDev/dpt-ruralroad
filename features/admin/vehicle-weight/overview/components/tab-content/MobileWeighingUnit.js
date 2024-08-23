import React, { useMemo, useState } from 'react'
import { FormSearchMobile } from '../form'
import { TableMobile } from '../table'
import { FormMobileDetail, TableMobileDetail } from '../detail'
import { Button, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { ModalImagePreview, ModalVehicleDetail, ModalAddMobileVehicleWeight, ModalAddMobileDepartment } from '../modal'

const INIT_MODAL = { open: false }

const MobileWeighingUnit = (props) => {
  const { } = props
  // SET STEP
  const [step, setStep] = useState(1)
  // SET OPEN MODAL
  const [openMobile, setOpenMobile] = useState(INIT_MODAL)
  const [openPreview, setOpenPreview] = useState(INIT_MODAL)
  const [openAddVehicle, setOpenAddVehicle] = useState(INIT_MODAL)
  const [openVehicle, setOpenVehicle] = useState(INIT_MODAL)

  const getDetail = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <>
            <section>
              <FormSearchMobile
                setOpen={setOpenMobile}
              />
            </section>
            <section className='mt-5'>
              <TableMobile setStep={setStep} />
            </section>
            <ModalAddMobileDepartment
              open={openMobile.open}
              setOpen={setOpenMobile}
            />
          </>
        )
      case 2:
        return (
          <>
            <section>
              <FormMobileDetail />
            </section>
            <section className='mt-5'>
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <Typography.Title level={5} className='!m-0'>ข้อมูลรถเข้าชั่ง</Typography.Title>
                <Button
                  type='primary'
                  size='large'
                  icon={<PlusOutlined />}
                  className='!w-full lg:!w-auto'
                  onClick={() => setOpenAddVehicle({ open: true })}
                >
                  เพิ่มข้อมูลรถที่เข้าชั่ง
                </Button>
              </div>
              <div className='mt-3'>
                <TableMobileDetail
                  setOpenPreview={setOpenPreview}
                  setOpenVehicle={setOpenVehicle}
                />
              </div>
            </section>
            <ModalImagePreview
              open={openPreview.open}
              setOpen={setOpenPreview}
            />
            <ModalAddMobileVehicleWeight
              open={openAddVehicle.open}
              setOpen={setOpenAddVehicle}
            />
            <ModalVehicleDetail
              open={openVehicle.open}
              setOpen={setOpenVehicle}
            />
          </>
        )
      default:
        return null
    }
  }, [step, openAddVehicle, openPreview, openVehicle, openMobile])

  return (
    <div>
      {getDetail}
    </div>
  )
}

export default React.memo(MobileWeighingUnit)
