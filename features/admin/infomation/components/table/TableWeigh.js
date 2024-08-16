import React from 'react'
import { Table, ConfigProvider , Button } from 'antd'
import { RightOutlined  } from '@ant-design/icons'

const TableWeigh = (props) => {
  const { setStep } = props

  const data = [
      {
        key: "1",
        date: "15 สิงหาคม 2567",
        sation: "ปักกิ่ง",
        weighcar: "156",
        weighover: "666",
      },
      {
        key: "2",
        date: "17 สิงหาคม 2567",
        sation: "เกาหลีเหนือ",
        weighcar: "189",
        weighover: "72",
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
      title: "จำนวนรถเข้าชั่ง",
      dataIndex: "weighcar",
      align: 'center',
    },
    {
      title: "รถบรรทุกน้ำหนักเกิน",
      dataIndex: "weighover",
      align: 'center',
    },
    {
      title: '',
      key: 'operation',
      align: 'center',
      render: () => 
          <Button
        icon={<RightOutlined />}
        size='smail'
        htmlType='submit'
        type='primary'
        onClick={()=> setStep(2)}
        >
          </Button>
    },
  ]

  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: 'black'
        }
      }}
    >
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          total:10,
          position: ['bottomCenter']}}
        scroll={{ x: 1600 }}
      />
    </ConfigProvider>
  )
}

export default React.memo(TableWeigh)
