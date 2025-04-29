import React from 'react'
import { Modal } from 'antd'
import TableDailyWeigh from '../table/TableDailyWeigh'

const ModaldailyWeighed = (props) => {
  const { open, data, setOpen, authType } = props

  const renderTitle = () => {
    switch (data?.key) {
      case 'sum_station':
        return 'สรุปข้อมูลรถเข้าชั่งสถานี'
      case 'sum_wim':
        return 'สรุปข้อมูลรถเข้า Weight In Motion'
      case 'sum_spot':
        return 'สรุปข้อมูลรถเข้าหน่วยชั่งเคลื่อนที่'
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
          authType={authType}
        />
      </main>
    </Modal>
  )
}

export default React.memo(ModaldailyWeighed)
