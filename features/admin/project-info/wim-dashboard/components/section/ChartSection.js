import React from 'react'
import { Card, Col, Row } from 'antd'
import { CardVehicleClass, CardVehicleCount, CardVehicleAvgSpeed, CardLastSevenDays } from '../card'

const ChartSection = (props) => {
  const { data } = props

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <CardVehicleCount
          stationId={data?.id}
        />
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <CardVehicleAvgSpeed
          stationId={data?.id}
        />
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <CardLastSevenDays
          stationId={data?.id}
        />
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <CardVehicleClass
          stationId={data?.id}
        />
      </Col>
    </Row>
  )
}

export default React.memo(ChartSection)
