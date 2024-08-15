import React from 'react'
import { Row, Col, Button, Typography } from 'antd'
import { ReportSection, TrackingSection } from '../components/content'
import YearSummary from '../components/collapse/YearSummary'

const DashboardScreen = (props) => {
  const { } = props

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={24} xl={14} xxl={14}>
        <ReportSection />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={10} xxl={10}>
        <TrackingSection />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <YearSummary />
      </Col>
    </Row>
  )
}

export default React.memo(DashboardScreen)
