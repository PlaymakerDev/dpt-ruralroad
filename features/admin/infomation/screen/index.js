import React, { useCallback, useState } from 'react'
import { Card } from 'antd'
import { TabWeigh, TabWim, TabMove, TabSum } from '../components/tab-content'

const InfomationScreen = (props) => {
  const { } = props
  const [tabKey, setTabKey] = useState('weigh')

  const onTabUpdate = useCallback((targetTab) => {
    setTabKey(targetTab)
  }, [])

  const tabList = [
    {
      key: 'weigh',
      tab: 'ข้อมูลรถเข้าชั่งสถานี',
    },
    {
      key: 'wim',
      tab: 'ข้อมูลรถเข้าชั่ง WIM',
    },
    {
      key: 'move',
      tab: 'ข้อมูลหน่วยชั่งเคลื่อนที่',
    },
    {
      key: 'sum',
      tab: 'สรุปข้อมูลเข้าชั่ง',
    },
  ];

  

  const content = {
    weigh: <TabWeigh />,
    wim: <TabWim />,
    move: <TabMove />,
    sum: <TabSum />
  }

  return (
    <Card
      className='!bg-pink-500'
      tabList={tabList}
      onTabChange={(e) => onTabUpdate(e)}
    >
      {content[tabKey]}
    </Card>
  )
}

export default React.memo(InfomationScreen)
