import { Card, Col, Row } from 'antd'
import React from 'react'

const LiveTrackingSection = (props) => {
  const { } = props

  return (
    <Row gutter={[30, 30]}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>index</Card>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>index</Card>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>index</Card>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <Card>index</Card>
      </Col>
    </Row>
  )
}

export default React.memo(LiveTrackingSection)
