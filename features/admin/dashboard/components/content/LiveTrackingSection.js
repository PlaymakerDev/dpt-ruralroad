import React from 'react'
import { Card, Col, Row, Image } from 'antd'


const LiveTrackingSection = (props) => {
  const { } = props

  return (
    <Row gutter={[30, 30]}>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
        <Card className='bg-gradient border-lightblue !w-full !h-full'>
          <Image
            src='https://th.mouser.com/blog/Portals/11/Vehicle%20Detection%20AI_Theme%20Image_min.jpg'
            alt='traffic-tracking'
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
        <Card className='bg-gradient border-lightblue !w-full !h-full'>
          <Image
            src='https://th.mouser.com/blog/Portals/11/Vehicle%20Detection%20AI_Theme%20Image_min.jpg'
            alt='traffic-tracking'
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
        <Card className='bg-gradient border-lightblue !w-full !h-full'>
          <Image
            src='https://th.mouser.com/blog/Portals/11/Vehicle%20Detection%20AI_Theme%20Image_min.jpg'
            alt='traffic-tracking'
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
        <Card className='bg-gradient border-lightblue !w-full !h-full'>
          <Image
            src='https://th.mouser.com/blog/Portals/11/Vehicle%20Detection%20AI_Theme%20Image_min.jpg'
            alt='traffic-tracking'
          />
        </Card>
      </Col>
    </Row>
  )
}

export default React.memo(LiveTrackingSection)
