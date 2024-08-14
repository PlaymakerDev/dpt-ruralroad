import React from 'react'
import { Collapse } from 'antd'
import TableSummary from './TableSummary';
import ConfigProvider from 'antd';

const YearSummary = (props) => {
  const { } = props

  const items = [
    {
      key: '1',
      label: 'ประวัติสรุปผลรายปี',
      children: <TableSummary />,
    },
  ];

  return (
    <Collapse
      defaultActiveKey={['1']}
      className='bg-gradient border-lightblue'
      items={items}
    />
  )
}

export default React.memo(YearSummary)
