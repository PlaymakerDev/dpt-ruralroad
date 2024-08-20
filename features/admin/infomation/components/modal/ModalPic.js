import React from 'react'
import { Modal, Row, Col, Card, Typography } from 'antd'

const Content = (props) => {
  const { } = props
  return (
  <>
    <Row gutter={[30, 16]} align={'middle'}>

    </Row>
  </>  
  )
}

const ModalPic = (props) => {
  const { openPic, setOpenPic } = props

  return (
    <Modal  
      title={<span className="text-2xl font-bold">รายละเอียดรถบรรทุก</span>}      
      openPic={openPic}
      destroyOnClose
      onCancel={() => setOpenPic(false)}
      width={800}
      footer={false}
    >
      <main className='my-5'>
        <Content />
      </main>
    </Modal>
  )
}

export default React.memo(ModalPic)
