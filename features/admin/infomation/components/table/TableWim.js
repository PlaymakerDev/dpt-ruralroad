import React from 'react'
import { Table, ConfigProvider, Button } from 'antd'
import { RightOutlined  } from '@ant-design/icons'


const TableWim = (props) => {
  const { setStepWim } = props

  const data = [
    {
      key: '1',
      date: '20 สิงหาคม 2567',
      sation: 'หมูกรอบ',
      weighcar: '16',
      weighover: '466',
    },
    {
      key: '2',
      date: '13 สิงหาคม 2567',
      sation: 'ข้าวผัด',
      weighcar: '19',
      weighover: '112',
    },  
  ]

  const columns = [
    {
      title: 'ลำดับ',
      dataIndex: 'key',
      align: 'center',
    },
    {
      title: 'วันที่',
      dataIndex: 'date',
      align: 'center',
    },
    {
      title: 'สถานี',
      dataIndex: 'sation',
      align: 'center',
    },
    {
      title: 'จำนวนรถเข้าชั่ง',
      dataIndex: 'weighcar',
      align: 'center',
    },
    {
      title: 'รถบรรทุกน้ำหนักเกิน',
      dataIndex: 'weighover',
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
        onClick={()=> setStepWim(2)}
        >
          </Button>
    }
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

export default React.memo(TableWim)
