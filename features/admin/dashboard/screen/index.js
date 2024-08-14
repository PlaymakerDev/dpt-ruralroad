import React from 'react'
import { Row, Col } from 'antd'
import { ReportSection, TrackingSection } from '../components/content'

const DashboardScreen = (props) => {
  const { } = props

  return (
    <main>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={14}>
          <ReportSection />
        </Col>
        <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
          <TrackingSection />
        </Col>
      </Row>
    </main>
  )
}

export default React.memo(DashboardScreen)
