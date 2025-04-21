import React from 'react'
import { Row, Col } from 'antd'
import { CardWeighingStation, CardCCTV } from '../addon-content/card'

const MainContentRight = (props) => {
  const { } = props

  return (
    <Row gutter={[16, 16]} className='!h-full !w-full'>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
          <CardWeighingStation />
        </Col>
        {/* <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
          <CardCCTV />
        </Col> */}
    </Row>
  )
}

export default React.memo(MainContentRight)
