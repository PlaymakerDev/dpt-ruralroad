import React, { useRef } from 'react'
import { Row, Col, Button } from 'antd'
import { MapSection, DetailCardSection } from '../components/content'

const ViewScreen = (props) => {
  const { id } = props
  const refSubmit = useRef(null)

  return (
    <section>
      <section className='mb-3'>
        <Button
          type='primary'
          htmlType='button'
          onClick={() => refSubmit.current.click()}
        >
          อัปเดทข้อมูลสายทาง
        </Button>
      </section>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
          <MapSection
            id={id}
            refSubmit={refSubmit}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
          <DetailCardSection
            id={id}
          />
        </Col>
      </Row>
    </section>
  )
}

export default React.memo(ViewScreen)
