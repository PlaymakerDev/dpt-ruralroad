import React from 'react'
import { Row, Col } from 'antd'
import { MapSection, DetailCardSection } from '../components/content'

const OverviewScreen = (props) => {
  const { } = props

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
        <MapSection />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
        <DetailCardSection />
      </Col>
    </Row>
  )
}

export default React.memo(OverviewScreen)
