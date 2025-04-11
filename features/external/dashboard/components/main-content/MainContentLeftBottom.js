import React from 'react'
import { Row, Col, Card } from 'antd'
import { CardOverWeightVehicle } from '../addon-content/card'
import { MainContentLeftBottomRight } from '../main-content'

const MainContentLeftBottom = (props) => {
  const { } = props

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={7} xl={7} xxl={7}>
        <CardOverWeightVehicle />
      </Col>
      <Col xs={24} sm={24} md={24} lg={17} xl={17} xxl={17}>
        <MainContentLeftBottomRight />
      </Col>
    </Row>
  )
}

export default React.memo(MainContentLeftBottom)
