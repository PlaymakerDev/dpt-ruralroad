import React from 'react'
import { Table, ConfigProvider , Button } from 'antd'
import { TruckOutlined } from '@ant-design/icons'

const TableDetailWim = (props) => {
  const {setModalWim} = props

  const data = [
      {
        key: "1",
        date: "15 สิงหาคม 2567",
        li: "55-555",
        typecar: "ประเภท 2 3เพลา6",
        car: "-",
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
      title: "วันที่",
      dataIndex: "date",
      align: 'center',
    },
    {
      title: "ทะเบียน",
      dataIndex: "li",
      align: 'center',
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
        size='smail'
        htmlType='submit'
        type='primary'
        onClick={() => setModalWim(true)}
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

export default React.memo(TableDetailWim)
