import React from 'react'
import { Table, ConfigProvider , Button } from 'antd'
import { TruckOutlined } from '@ant-design/icons'

const TableDetail = (props) => {
  const {setModalTruck} = props

  const data = [
      {
        key: "1",
        date: "15 สิงหาคม 2567",
        sation: "ปักกิ่ง",
        type: "16",
        cargo: "ยาดอง",
        li: "55-555",
        wei: "14.6",
        weiover: "00.00",
        weiyes: "25.00",
        staus: "ไม่เกินพิกัด",
      },
      {
        key: "2",
        date: "05 สิงหาคม 2567",
        sation: "ห้องขัง",
        type: "10",
        cargo: "ม้า",
        li: "23-334",
        wei: "30.00",
        weiover: "5.00",
        weiyes: "25.00",
        staus: "เกินพิกัด",
      },
      {
        key: "3",
        date: "20 สิงหาคม 2567",
        sation: "ปักกิ่ง",
        type: "6",
        cargo: "เป็ด",
        li: "09-583",
        wei: "24.00",
        weiover: "00.00",
        weiyes: "25.00",
        staus: "ไม่เกินพิกัด",
      },

  ]

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "key",
      align: 'center',
    },
    {
      title: "วันที่",
      dataIndex: "date",
      align: 'center',
    },
    {
      title: "สถานี",
      dataIndex: "sation",
      align: 'center',
    },
    {
      title: "ประเภท",
      dataIndex: "type",
      align: 'center',
    },
    {
      title: "สิ่งของที่บรรทุก",
      dataIndex: "cargo",
      align: 'center',
    },
    {
      title: "ทะเบียนหัวลาก",
      dataIndex: "li",
      align: 'center',
    },
    {
      title: "น้ำหนักที่ชั่ง(ตัน)",
      dataIndex: "wei",
      align: 'center',
    },
    {
      title: "น้ำหนักที่เกิน(ตัน)",
      dataIndex: "weiover",
      align: 'center',
    },
    {
      title: "น้ำหนักตามกฏหมาย(ตัน)",
      dataIndex: "weiyes",
      align: 'center',
    },
    {
      title: "สถานะเข้าชั่ง",
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
        size='smail'
        htmlType='submit'
        type='primary'
        onClick={() => setModalTruck(true)}
        >
          </Button>
    },
  ]

  return (
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          total:10,
          position: ['bottomCenter']}}
        scroll={{ x: 1600 }}
      />
  )
}

export default React.memo(TableDetail)
