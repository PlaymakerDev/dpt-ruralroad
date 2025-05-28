import React from 'react'
import { Modal } from 'antd'
import TableDailyWeigh from '../table/TableDailyWeigh'

const ModaldailyWeighed = (props) => {
  const { open, data, setOpen, accessType } = props

  console.log("===",data)

  const renderTitle = () => {
    switch (data?.key) {
      case 'sum_station':
        return 'สรุปข้อมูลสถานีตรวจสอบน้ำหนัก'
      case 'sum_wim':
        return 'สรุปข้อมูล Vehicle Inspection Station (VIS)'
      case 'sum_spot':
        return 'สรุปข้อมูลหน่วยตรวจสอบน้ำหนักเคลื่อนที่'
      default:
        return ''
    }
  }

  return (
    <Modal
      title={renderTitle()}
      open={open}
      destroyOnClose
      onCancel={() => { setOpen({ open: false, key: null, info: {} }) }}
      footer={false}
      width={800}
      centered
    >
      <main className='my-5'>
        <TableDailyWeigh
          data={data.info}
          type={data?.key}
          accessType={accessType}
        />
      </main>
    </Modal>
  )
}

export default React.memo(ModaldailyWeighed)
