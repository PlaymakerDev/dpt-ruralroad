import React from 'react'
import { Modal, Row, Col, Card } from 'antd'

const Content = (props) => {
  const { } = props
  return (
    <Row gutter={[30, 16]} align={'middle'}>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
    </Row>
  )
}

const WimModal = (props) => {
  const { open, setOpen } = props

  return (
    <Modal
      title="รายละเอียดรถบรรทุก"
      open={open}
      destroyOnClose
      onCancel={() => setOpen(false)}
      width={1000}
      footer={false}
    >
      <main className='my-5'>
        <Content />
      </main>
    </Modal>
  )
}

export default React.memo(WimModal)
