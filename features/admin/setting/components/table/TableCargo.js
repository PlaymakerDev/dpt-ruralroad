import React from 'react'
import { Table } from 'antd'

const TableCargo = (props) => {
  const { } = props

  const data = []

  const columns = []

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
      />
    </div>
  )
}

export default React.memo(TableCargo)
