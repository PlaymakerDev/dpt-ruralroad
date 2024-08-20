import React, { useCallback, useState } from 'react'
import { Card, Breadcrumb } from 'antd'
import { TabWeigh as Weight, TabWim as WIM, TabMove as Move, TabSum as Sum } from '../components/tab-content'
import { TruckModal as ModalCargo, WimModal as ModalWIM } from '../components/modal'

const INIT_MODAL = false

const OverWeightScreen = (props) => {
  const { } = props
  // STATE
  const [tabKey, setTabKey] = useState('weight')
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

  ];

  const content = {
    weight: <Weight setOpen={setOpenCargo} />,
    wim: <WIM setOpen={setOpenWIM}/>,
    move: <Move />,
  }

  return (
    <>
    <Breadcrumb className='text-white p-4 m-2' separator={<span style={{ color: 'grey' }}> / </span>}>
      <Breadcrumb.Item className='text-white'>ข้อมูล</Breadcrumb.Item>
      <Breadcrumb.Item className='text-white'>รถน้ำหนักเกินหน่วยชั่ง</Breadcrumb.Item>
    </Breadcrumb>
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

export default React.memo(OverWeightScreen)
