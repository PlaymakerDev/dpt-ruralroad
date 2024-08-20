import React from 'react'
import { Table, Button } from 'antd'
import { TruckOutlined } from '@ant-design/icons'
import Image from 'next/image'
import BigTruck from '@/public/images/big-truck.svg'


const TableDetailWim = (props) => {
  const { setOpen } = props

  const data = [
    {
      key: "1",
      date: "15 สิงหาคม 2567",
      time: "32:42:32",
      li: "ทะเบียน : 55-555",
      province: "จังหวัด : ราชบุรี",
      typecar: "ประเภท 2 3เพลา6",
      car: BigTruck,
      wei: "14,000 ตัน",
      pow: "6เพลา",
      staus: "ปกติ"
    },
  ]

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "key",
      align: 'center',
    },
    {
      title: "วันที่ / เวลา",
      dataIndex: "date",
      align: 'center',
      render: (text, record) => (
        <div>
          {record.date}<br />
          {record.time}
        </div>
      ),
    },
    {
      title: "ทะเบียน",
      dataIndex: "li",
      align: 'center',
      render: (text, record) => (
        <div>
          {record.li}<br />
          {record.province}
        </div>
      )
    },
    {
      title: "ประเภทรถ",
      dataIndex: "typecar",
      align: 'center',
    },
    {
      title: "ลักษณะรถ",
      dataIndex: "car",
      align: 'center',
      render: (text) => (
        <Image src={text} alt="" /> 
      ),
    },
    {
      title: "น้ำหนักที่ชั่ง",
      dataIndex: "wei",
      align: 'center',
    },
    {
      title: "เพลา",
      dataIndex: "pow",
      align: 'center',
    },
    {
      title: "สถานะ",
      dataIndex: "staus",
      align: 'center',
    },
    {
      title: '',
      key: 'operation',
      align: 'center',
      render: () =>
        <Button
          icon={<TruckOutlined />}
          size='small'
          htmlType='submit'
          type='text'
          onClick={() => setOpen(true)}
        >
        </Button>
    },
  ]

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={{
        // total: 10,
        position: ['bottomCenter']
      }}
    scroll={{ x: 1600 }}
    />
  )
}

export default React.memo(TableDetailWim)
