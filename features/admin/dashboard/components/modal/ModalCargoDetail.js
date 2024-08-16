import React from 'react'
import { Modal, Row, Col } from 'antd'
import { TableCargo } from '../table'

const Content = (props) => {
  const { } = props
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.7925591393205!2d100.77853867586487!3d13.731005397773034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d66308ce98ffd%3A0xcb43a76f038c38ca!2z4LiE4LiT4Liw4LmA4LiX4LiE4LmC4LiZ4LmC4Lil4Lii4Li14Liq4Liy4Lij4Liq4LiZ4LmA4LiX4LioIOC4quC4luC4suC4muC4seC4meC5gOC4l-C4hOC5guC4meC5guC4peC4ouC4teC4nuC4o-C4sOC4iOC4reC4oeC5gOC4geC4peC5ieC4suC5gOC4iOC5ieC4suC4hOC4uOC4k-C4l-C4q-C4suC4o-C4peC4suC4lOC4geC4o-C4sOC4muC4seC4hyAoSVRLTUlUTCk!5e0!3m2!1sth!2sth!4v1723785863387!5m2!1sth!2sth"
          width="100%"
          height="450"
          frameborder="0"
          style={{ border: 0 }}
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
          loading="lazy"
        />
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <TableCargo />
      </Col>
    </Row>
  )
}

const ModalCargoDetail = (props) => {
  const { open, setOpen } = props

  return (
    <Modal
      title="ข้อมูลรถบรรทุก สายทาง นพ.3015"
      open={open}
      destroyOnClose
      onCancel={() => setOpen(false)}
      width={1400}
      footer={false}
    >
      <main className='my-5'>
        <Content />
      </main>
    </Modal>
  )
}

export default React.memo(ModalCargoDetail)
