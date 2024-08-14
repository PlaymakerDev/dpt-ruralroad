import React from 'react'
import { Row, Col, Card } from 'antd'
import { CarEntrySection, CarDetailSection, CarLicenseSection } from '../content'

const ReportSection = (props) => {
  const { } = props

  return (
    <Row gutter={[30, 30]}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <CarEntrySection />
      </Col>
      <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
        <CarLicenseSection />
      </Col>
      <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
        <CarDetailSection />
      </Col>
    </Row>
  )
}

export default React.memo(ReportSection)
