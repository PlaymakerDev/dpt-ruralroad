import React from 'react'
import { Table } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'

const TableSummary = (props) => {
  const { setStep } = props

  const data = [
    {
      date: "01 พฤษภาคม 2567",
      mobile: "432",
      weight: "432",
      wim: "432",
      highway_region: "0",
      total: "1,296",
    },
    {
      date: "01 พฤษภาคม 2567",
      mobile: "432",
      weight: "432",
      wim: "432",
      highway_region: "0",
      total: "1,296",
    },
  ]

  const columns = [
    {
      title: "วันที่",
      key: "date",
      dataIndex: "date",
      width: 200,
    },
    {
      title: "ด่านชั่งเคลื่อนที่",
      key: "mobile",
      dataIndex: "mobile",
      align: 'center',
      width: 150,
    },
    {
      title: "สถานีชั่งน้ำหนัก",
      key: "weight",
      dataIndex: "weight",
      align: 'center',
      width: 150
    },
    {
      title: "รถบรรทุกน้ำหนักเกิน",
      key: "wim",
      dataIndex: "wim",
      align: 'center',
      width: 150
    },
    {
      title: "สบร.",
      key: "highway_region",
      dataIndex: "highway_region",
      align: 'center',
      width: 100
    },
    {
      title: "รวมทั้งหมด",
      key: "total",
      dataIndex: "total",
      width: 100
    },
    {
      title: "",
      key: 'report',
      dataIndex: "report",
      align: 'center',
      width: 50,
      render: () => {
        return (
          <FileTextOutlined  className='!cursor-pointer' />
          )
        }
      }
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

export default React.memo(TableSummary)
