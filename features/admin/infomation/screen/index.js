import React, { useCallback, useState } from 'react'
import { Card } from 'antd'
import { TabWeigh as Weight, TabWim as WIM, TabMove as Move, TabSum as Sum } from '../components/tab-content'
import { TruckModal as ModalCargo, WimModal as ModalWIM } from '../components/modal'

const INIT_MODAL = false

const InfomationScreen = (props) => {
  const { } = props
  // STATE
  const [tabKey, setTabKey] = useState('weigh')
  const [openCargo, setOpenCargo] = useState(INIT_MODAL);
  const [openWIM, setOpenWIM] = useState(INIT_MODAL);

  const onTabUpdate = useCallback((targetTab) => {
    setTabKey(targetTab)
  }, [])

  const tabList = [
    {
      key: 'weight',
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
    weight: <Weight setOpen={setOpenCargo} />,
    wim: <WIM setOpen={setOpenWIM}/>,
    move: <Move />,
    sum: <Sum />
  }

  return (
    <>
      <Card
        tabList={tabList}
        onTabChange={(e) => onTabUpdate(e)}
      >
        {content[tabKey]}
      </Card>
      <ModalCargo
        open={openCargo}
        setOpen={setOpenCargo}
      />
      <ModalWIM
        open={openWIM}
        setOpen={setOpenWIM}
      />
    </>
  )
}

export default React.memo(InfomationScreen)
