import React from 'react'
import { Col, Row } from 'antd'
import { CardVehicleStat } from '../addon-content/card'
import { MainContentLeftBottom } from '../main-content'

const MainContentLeft = (props) => {
  const { } = props

  return (
    <Row gutter={[16, 16]} >
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <CardVehicleStat />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <MainContentLeftBottom />
      </Col>
    </Row>
  )
}

export default React.memo(MainContentLeft)
