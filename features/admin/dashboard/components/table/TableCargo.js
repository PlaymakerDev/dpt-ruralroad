import React from 'react'
import { Table } from 'antd'

const TableCargo = (props) => {
  const { } = props

  const data = [
    {
      car_license: '80-6822',
      province: 'กรุงเทพมหานคร',
      km: 4,
      type: 'รถพ่วง (ยาง 8 ล้อ)',
      overweight_record: 'มีประวัติน้ำหนักเกิน'
    },
    {
      car_license: '80-6822',
      province: 'กรุงเทพมหานคร',
      km: 4,
      type: 'รถพ่วง (ยาง 8 ล้อ)',
      overweight_record: 'ขาเบียด'
    },
  ]

  const columns = [
    {
      title: 'ทะเบียนรถ',
      key: 'car_license',
      dataIndex: 'car_license'
    },
    {
      title: 'จังหวัด',
      key: 'province',
      dataIndex: 'province'
    },
    {
      title: 'กม.',
      key: 'km',
      dataIndex: 'km'
    },
    {
      title: 'ประเภท',
      key: 'type',
      dataIndex: 'type'
    },
    {
      title: 'ประวัติน้ำหนักเกิน',
      key: 'overweight_record',
      dataIndex: 'overweight_record'
    },
  ]

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={{
        position: ['bottomCenter']
      }}
    />
  )
}

export default React.memo(TableCargo)
