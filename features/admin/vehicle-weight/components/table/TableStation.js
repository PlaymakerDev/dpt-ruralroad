import React from 'react'
import { Table, Button } from 'antd'
import { RightOutlined } from '@ant-design/icons'

const TableStation = (props) => {
  const { setStep } = props

  const data = [
    {
      no: "1",
      date: "15 สิงหาคม 2567",
      station: "ปักกิ่ง",
      amount: "156",
      overweight_vehicle: "666",
    },
    {
      no: "2",
      date: "17 สิงหาคม 2567",
      station: "เกาหลีเหนือ",
      amount: "189",
      overweight_vehicle: "72",
    },
  ]

  const columns = [
    {
      title: "ลำดับ",
      key: "no",
      dataIndex: "no",
      align: 'center',
      width: 100,
    },
    {
      title: "วันที่",
      key: "date",
      dataIndex: "date",
      width: 200,
    },
    {
      title: "สถานี",
      key: "station",
      dataIndex: "station",
      width: 200,
    },
    {
      title: "จำนวนรถเข้าชั่ง",
      key: "amount",
      dataIndex: "amount",
      align: 'center',
      width: 200
    },
    {
      title: "รถบรรทุกน้ำหนักเกิน",
      key: "overweight_vehicle",
      dataIndex: "overweight_vehicle",
      align: 'center',
      width: 200
    },
    {
      title: '',
      key: 'action',
      dataIndex: 'action',
      align: 'center',
      width: 100,
      render: () => {
        return (
          <RightOutlined className='!cursor-pointer' onClick={() => setStep(2)} />
        )
      }

    },
  ]

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={{
        position: ['bottomCenter']
      }}
      scroll={{ x: 1600 }}
    />
  )
}

export default React.memo(TableStation)
