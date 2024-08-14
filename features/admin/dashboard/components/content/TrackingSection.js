import React from 'react'
import { Row, Col } from 'antd'
import { CarWeightSection, LiveTrackingSection } from '../content'

const TrackingSection = (props) => {
  const { } = props

  return (
    <Row gutter={[30, 30]}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <CarWeightSection />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <LiveTrackingSection />
      </Col>
    </Row>
  )
}

export default React.memo(TrackingSection)
