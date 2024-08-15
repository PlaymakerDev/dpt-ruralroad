import React from 'react'
import { Table, ConfigProvider } from 'antd'

const TableTrollway = (props) => {
  const { } = props

  const data = [
    {
      column_1: 'This is my voice',
      column_2: 'first day in Africa',
      column_3: 'I am black',
    }
  ]

  const columns = [
    {
      title: 'Column 1',
      key: 'column_1',
      dataIndex: 'column_1'
    },
    {
      title: 'Column 2',
      key: 'column_2',
      dataIndex: 'column_2'
    },
    {
      title: 'Column 3',
      key: 'column_3',
      dataIndex: 'column_3'
    },
  ]

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: '#194250'
          }
        },
        token: {
          colorText: 'black'
        }
      }}
    >
      <Table
        dataSource={data}
        columns={columns}
        scroll={{ x: 1600 }}
      />
    </ConfigProvider>
  )
}

export default React.memo(TableTrollway)
