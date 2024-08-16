import React from 'react'
import { Card, Col, Row, Typography, Progress } from 'antd'

const RouteCard = (props) => {
  const { } = props

  return (
    <Card className='!w-full !h-full'>
      <Typography.Title level={4}>5 อันดับสายทางที่มีปริมาณรถมากที่สุด</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <figure className='border-solid border-2 border-lightblue rounded-lg p-2 cursor-pointer'>
            <section className='flex flex-wrap justify-between'>
              <Typography.Text className='!text-lg' strong underline>ปท.3006</Typography.Text>
              <Typography.Text className='!text-lg'>&gt;</Typography.Text>
            </section>
            <section>
              <Progress
                percent={50}
                size={{
                  height: '0.75rem'
                }}
                strokeColor={'#56E4EE'}
                percentPosition={{
                  align: 'end',
                  type: 'outer',
                }}
              />
            </section>
          </figure>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <figure className='border-solid border-2 border-lightblue rounded-lg p-2'>
            <Typography.Text className='!text-lg' strong underline>ปท.3006</Typography.Text>
            <Progress
              percent={50}
              size={{
                height: '0.75rem'
              }}
              strokeColor={'#56E4EE'}
              percentPosition={{
                align: 'end',
                type: 'outer',
              }}
            />
          </figure>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <figure className='border-solid border-2 border-lightblue rounded-lg p-2'>
            <Typography.Text className='!text-lg' strong underline>ปท.3006</Typography.Text>
            <Progress
              percent={50}
              size={{
                height: '0.75rem'
              }}
              strokeColor={'#56E4EE'}
              percentPosition={{
                align: 'end',
                type: 'outer',
              }}
            />
          </figure>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <figure className='border-solid border-2 border-lightblue rounded-lg p-2'>
            <Typography.Text className='!text-lg' strong underline>ปท.3006</Typography.Text>
            <Progress
              percent={50}
              size={{
                height: '0.75rem'
              }}
              strokeColor={'#56E4EE'}
              percentPosition={{
                align: 'end',
                type: 'outer',
              }}
            />
          </figure>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <figure className='border-solid border-2 border-lightblue rounded-lg p-2'>
            <Typography.Text className='!text-lg' strong underline>ปท.3006</Typography.Text>
            <Progress
              percent={50}
              size={{
                height: '0.75rem'
              }}
              strokeColor={'#56E4EE'}
              percentPosition={{
                align: 'end',
                type: 'outer',
              }}
            />
          </figure>
        </Col>
      </Row>
    </Card>
  )
}

export default React.memo(RouteCard)
