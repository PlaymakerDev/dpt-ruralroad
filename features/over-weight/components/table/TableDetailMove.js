import React from 'react'
import { Table, Button } from 'antd'
import { RightOutlined } from '@ant-design/icons'

const TableDetailMove = (props) => {
  const { } = props

  const data = [
    {
      key: '1',
      date: '20 สิงหาคม 2567',
      timestart: '13:30',
      timeend: '15.50',
      duty: 'ตลิ่งชัน',
      code: 'กกน.123',
      wtf: 'กช.',
      manyin: '1',
      over: '1',
    },
    {
      key: '2',
      date: '25 สิงหาคม 2567',
      timestart: '16:30',
      timeend: '18.50',
      duty: 'น่านไง',
      code: 'วดฟ.789',
      wtf: '-',
      manyin: '10',
      over: '5',
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
      title: 'เวลาจัดตั้ง',
      dataIndex: 'timestart',
      align: 'center',
    },
    {
      title: 'เวลาสิ้นสุด',
      dataIndex: 'timeend',
      align: 'center',
    },
    {
      title: 'หน่วยที่จัดตั้ง',
      dataIndex: 'duty',
      align: 'center',
    },
    {
      title: 'รหัสสายทาง',
      dataIndex: 'code',
      align: 'center',
    },
    {
      title: 'บูรณาการ',
      dataIndex: 'wtf',
      align: 'center',
    },
    {
      title: 'จำนวนรถเข้าชั่ง',
      dataIndex: 'manyin',
      align: 'center',
    },
    {
      title: 'น้ำหนักเกิน',
      dataIndex: 'over',
      align: 'center',
    },
    {
      title: '',
      key: 'operation',
      align: 'center',
      render: () =>
        <Button
          icon={<RightOutlined />}
          size='small'
          htmlType='submit'
          type='text'
        />
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

export default React.memo(TableDetailMove)
