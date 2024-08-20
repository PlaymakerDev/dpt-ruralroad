import React from 'react'
import { Card, Col, Progress, Row, Typography } from 'antd'
import { useRouter } from 'next/router'

const VehicleOnRoute = (props) => {
  const { } = props
  const router = useRouter()

  return (
    <Card className='!w-full !h-full'>
      <Typography.Title level={4}>สายทางที่มีปริมาณรถมากที่สุด</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <figure
            className='border-solid border-2 border-lightblue rounded-lg p-2 cursor-pointer'
            onClick={() => router.push('/admin/information/vehicle-data-on-routes/view/1')}
          >
            <section className='flex flex-wrap justify-between'>
              <Typography.Text className='!text-lg' strong underline>ปท.3006</Typography.Text>
              <Typography.Text className='!text-lg'>&gt;</Typography.Text>
            </section>
            <section>
              <Progress
                percent={50}
                size={{
                  height: '0.4rem'
                }}
                strokeColor={'#56E4EE'}
                percentPosition={{
                  align: 'end',
                  type: 'outer',
                }}
                format={(percent) => `${percent} คัน`}
              />
            </section>
          </figure>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <figure
            className='border-solid border-2 border-lightblue rounded-lg p-2 cursor-pointer'
            onClick={() => router.push('/admin/information/vehicle-data-on-routes/view/1')}
          >
            <section className='flex flex-wrap justify-between'>
              <Typography.Text className='!text-lg' strong underline>ปท.3006</Typography.Text>
              <Typography.Text className='!text-lg'>&gt;</Typography.Text>
            </section>
            <section>
              <Progress
                percent={50}
                size={{
                  height: '0.4rem'
                }}
                strokeColor={'#56E4EE'}
                percentPosition={{
                  align: 'end',
                  type: 'outer',
                }}
                format={(percent) => `${percent} คัน`}
              />
            </section>
          </figure>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <figure
            className='border-solid border-2 border-lightblue rounded-lg p-2 cursor-pointer'
            onClick={() => router.push('/admin/information/vehicle-data-on-routes/view/1')}
          >
            <section className='flex flex-wrap justify-between'>
              <Typography.Text className='!text-lg' strong underline>ปท.3006</Typography.Text>
              <Typography.Text className='!text-lg'>&gt;</Typography.Text>
            </section>
            <section>
              <Progress
                percent={50}
                size={{
                  height: '0.4rem'
                }}
                strokeColor={'#56E4EE'}
                percentPosition={{
                  align: 'end',
                  type: 'outer',
                }}
                format={(percent) => `${percent} คัน`}
              />
            </section>
          </figure>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <figure
            className='border-solid border-2 border-lightblue rounded-lg p-2 cursor-pointer'
            onClick={() => router.push('/admin/information/vehicle-data-on-routes/view/1')}
          >
            <section className='flex flex-wrap justify-between'>
              <Typography.Text className='!text-lg' strong underline>ปท.3006</Typography.Text>
              <Typography.Text className='!text-lg'>&gt;</Typography.Text>
            </section>
            <section>
              <Progress
                percent={50}
                size={{
                  height: '0.4rem'
                }}
                strokeColor={'#56E4EE'}
                percentPosition={{
                  align: 'end',
                  type: 'outer',
                }}
                format={(percent) => `${percent} คัน`}
              />
            </section>
          </figure>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <figure
            className='border-solid border-2 border-lightblue rounded-lg p-2 cursor-pointer'
            onClick={() => router.push('/admin/information/vehicle-data-on-routes/view/1')}
          >
            <section className='flex flex-wrap justify-between'>
              <Typography.Text className='!text-lg' strong underline>ปท.3006</Typography.Text>
              <Typography.Text className='!text-lg'>&gt;</Typography.Text>
            </section>
            <section>
              <Progress
                percent={50}
                size={{
                  height: '0.4rem'
                }}
                strokeColor={'#56E4EE'}
                percentPosition={{
                  align: 'end',
                  type: 'outer',
                }}
                format={(percent) => `${percent} คัน`}
              />
            </section>
          </figure>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <figure
            className='border-solid border-2 border-lightblue rounded-lg p-2 cursor-pointer'
            onClick={() => router.push('/admin/information/vehicle-data-on-routes/view/1')}
          >
            <section className='flex flex-wrap justify-between'>
              <Typography.Text className='!text-lg' strong underline>ปท.3006</Typography.Text>
              <Typography.Text className='!text-lg'>&gt;</Typography.Text>
            </section>
            <section>
              <Progress
                percent={50}
                size={{
                  height: '0.4rem'
                }}
                strokeColor={'#56E4EE'}
                percentPosition={{
                  align: 'end',
                  type: 'outer',
                }}
                format={(percent) => `${percent} คัน`}
              />
            </section>
          </figure>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <figure
            className='border-solid border-2 border-lightblue rounded-lg p-2 cursor-pointer'
            onClick={() => router.push('/admin/information/vehicle-data-on-routes/view/1')}
          >
            <section className='flex flex-wrap justify-between'>
              <Typography.Text className='!text-lg' strong underline>ปท.3006</Typography.Text>
              <Typography.Text className='!text-lg'>&gt;</Typography.Text>
            </section>
            <section>
              <Progress
                percent={50}
                size={{
                  height: '0.4rem'
                }}
                strokeColor={'#56E4EE'}
                percentPosition={{
                  align: 'end',
                  type: 'outer',
                }}
                format={(percent) => `${percent} คัน`}
              />
            </section>
          </figure>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <figure
            className='border-solid border-2 border-lightblue rounded-lg p-2 cursor-pointer'
            onClick={() => router.push('/admin/information/vehicle-data-on-routes/view/1')}
          >
            <section className='flex flex-wrap justify-between'>
              <Typography.Text className='!text-lg' strong underline>ปท.3006</Typography.Text>
              <Typography.Text className='!text-lg'>&gt;</Typography.Text>
            </section>
            <section>
              <Progress
                percent={50}
                size={{
                  height: '0.4rem'
                }}
                strokeColor={'#56E4EE'}
                percentPosition={{
                  align: 'end',
                  type: 'outer',
                }}
                format={(percent) => `${percent} คัน`}
              />
            </section>
          </figure>
        </Col>
      </Row>
    </Card>
  )
}

export default React.memo(VehicleOnRoute)
