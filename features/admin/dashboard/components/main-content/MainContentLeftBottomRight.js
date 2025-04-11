import React from 'react'
import { Col, Row } from 'antd'
import { CardRoute, CardMobile } from '../addon-content/card'

const MainContentLeftBottomRight = (props) => {
  const { } = props

  return (
    <Row gutter={[8,8]} className='!h-full  '>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
        <CardRoute />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <CardMobile />
      </Col>
    </Row>
  )
}

export default React.memo(MainContentLeftBottomRight)
