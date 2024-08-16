import React from 'react'
import { Table, ConfigProvider } from 'antd'

const TableSum = (props) => {
  const { } = props

  const data = [
    {
      date: '15 สิงหาคม 2567',
      movesation: '656',
      weighsation: '555',
      weighwim: '1,666',
      sbr: '123',
      sum: '123,456',
    },
    
    {
      date: '17 สิงหาคม 2567',
      movesation: '65',
      weighsation: '485',
      weighwim: '12,666',
      sbr: '13',
      sum: '53,456',
    },
    
    {
      date: '19 สิงหาคม 2567',
      movesation: '99',
      weighsation: '999',
      weighwim: '9,999',
      sbr: '999',
      sum: '999,999',
    },  
  ]

  const columns = [
    {
      title: 'วันที่',
      dataIndex: 'date',
      align: 'center',
    },
    {
      title: 'ด่านชั่งเคลื่อนที่',
      dataIndex: 'movesation',
      align: 'center',
    },
    {
      title: 'สถานีชั่งน้ำหนัก',
      dataIndex: 'weighsation',
      align: 'center',
    },
    {
      title: 'Weight In Motion',
      dataIndex: 'weighwim',
      align: 'center',
    },
    {
      title: 'สบร.',
      dataIndex: 'sbr',
      align: 'center',
    },
    {
      title: 'รวมทั้งหมด',
      dataIndex: 'sum',
      align: 'center',
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

export default React.memo(TableSum)
