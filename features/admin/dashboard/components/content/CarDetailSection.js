import React from 'react'
import { Card, Col, Row } from 'antd'
import { WeightInspectChart } from '../chart'
import { RouteCard } from '../card'

const CarDetailSection = (props) => {
  const { } = props

  return (
    <Row gutter={[30, 30]}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <RouteCard />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <WeightInspectChart />
      </Col>
    </Row>
  )
}

export default React.memo(CarDetailSection)
