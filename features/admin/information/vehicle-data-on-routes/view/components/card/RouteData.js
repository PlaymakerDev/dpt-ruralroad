import React from 'react'
import { Card, Col, Flex, Row, Typography } from 'antd'
import { TruckOutlined } from '@ant-design/icons'

const RouteData = (props) => {
  const { } = props

  const properties = {
    className: 'rounded-xl px-5 py-3 my-3 bg-[#6C6C6C16]'
  }

  return (
    <Card className='!w-full !h-full'>
      <Flex align='center' justify='space-between' gap={'0.75rem'} wrap>
        <Typography.Title level={4} className='!m-0'>ข้อมูลสายทาง</Typography.Title>
        <div className='px-3 py-1 rounded-3xl bg-[#FFFFFF31] w-36 text-center'>
          <Typography.Text className='!text-md'>11 สิงหาคม 2565</Typography.Text>
        </div>
      </Flex>
      <Row gutter={[30, 30]}>
        <Col xs={24} sm={24} md={8} lg={24} xl={24} xxl={24}>
          <figcaption {...properties}>
            <div className='flex flex-wrap gap-3 items-start'>
              <TruckOutlined style={{ fontSize: '1.5rem' }} />
              <section>
                <Typography.Title level={5} className='!m-0'>รหัสสายทาง</Typography.Title>
                <Typography.Text>อย.4016</Typography.Text>
              </section>
            </div>
          </figcaption>
          <figcaption {...properties}>
            <div className='flex flex-wrap gap-3 items-start'>
              <TruckOutlined style={{ fontSize: '1.5rem' }} />
              <section>
                <Typography.Title level={5} className='!m-0'>ชื่อสายทาง</Typography.Title>
                <Typography.Text>แยก ทล.3263 (กม.ที่ 10+525) - บ้านป้อม</Typography.Text>
              </section>
            </div>
          </figcaption>
          <figcaption {...properties}>
            <div className='flex flex-wrap gap-3 items-start'>
              <TruckOutlined style={{ fontSize: '1.5rem' }} />
              <section>
                <Typography.Title level={5} className='!m-0'>จังหวัด</Typography.Title>
                <Typography.Text>พระนครศรีอยุธยา</Typography.Text>
              </section>
            </div>
          </figcaption>
          <figcaption {...properties}>
            <div className='flex flex-wrap gap-3 items-start'>
              <TruckOutlined style={{ fontSize: '1.5rem' }} />
              <section>
                <Typography.Title level={5} className='!m-0'>เพลาที่เกิน</Typography.Title>
                <Typography.Text>2 เพลา</Typography.Text>
              </section>
            </div>
          </figcaption>
          <figcaption {...properties}>
            <div className='flex flex-wrap gap-3 items-start'>
              <TruckOutlined style={{ fontSize: '1.5rem' }} />
              <section>
                <Typography.Title level={5} className='!m-0'>สายทาง</Typography.Title>
                <Typography.Text>แยก ทล. 1065</Typography.Text>
              </section>
            </div>
          </figcaption>
          <figcaption {...properties}>
            <div className='flex flex-wrap gap-3 items-start'>
              <TruckOutlined style={{ fontSize: '1.5rem' }} />
              <section>
                <Typography.Title level={5} className='!m-0'>เริ่มต้น - สิ้นสุด (กม.)</Typography.Title>
                <Typography.Text>กม. 9+100  - กม. 9-700</Typography.Text>
              </section>
            </div>
          </figcaption>
        </Col>
      </Row>
    </Card>
  )
}

export default React.memo(RouteData)
