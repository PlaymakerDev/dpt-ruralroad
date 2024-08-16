import React, { useCallback, useState } from 'react'
import { Card , Modal } from 'antd'
import { TabWeigh, TabWim, TabMove, TabSum } from '../components/tab-content'
import { TruckModal, WimModal } from '../components/modal'

const InfomationScreen = (props) => {
  const { } = props

  const [tabKey, setTabKey] = useState('weigh')

  const [ModalTruck, setModalTruck] = useState(false);

  const [ModalWim, setModalWim] = useState(false);

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
    weigh: <TabWeigh setModalTruck={setModalTruck}/>,
    wim: <TabWim />,
    move: <TabMove />,
    sum: <TabSum />
  }

  return (
    <>
    <Card
      tabList={tabList}
      onTabChange={(e) => onTabUpdate(e)}
      >
      {content[tabKey]}
    </Card>
      <TruckModal open={ModalTruck} setOpen={setModalTruck} />
      <WimModal openWim={ModalWim} setOpenWim={setModalWim} />
      </>
  )
}

export default React.memo(InfomationScreen)
