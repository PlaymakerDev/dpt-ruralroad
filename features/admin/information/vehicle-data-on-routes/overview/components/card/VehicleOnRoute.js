import React from 'react'
import { Card, Col, Empty, Progress, Row, Typography } from 'antd'
import { useRouter } from 'next/router'
import stf from '@/utils/stringformat'

const VehicleOnRoute = (props) => {
  const { data } = props
  const router = useRouter()

  return (
    <Card className='!w-full !h-full'>
      <Typography.Title level={4}>สายทางที่มีปริมาณรถมากที่สุด</Typography.Title>
      <Row gutter={[16, 16]}>
        {!!data?.length ?
          data?.map((item, index) => {
            return (
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} key={index}>
                <figure
                  className='border-solid border-2 border-lightblue rounded-lg p-2 cursor-pointer'
                  onClick={() => router.push(`/admin/information/vehicle-data-on-routes/view/${item.road_code}`)}
                >
                  <section className='flex flex-wrap justify-between'>
                    <Typography.Text className='!text-lg' strong underline>{item.road_code || '-'}</Typography.Text>
                    <div className='flex items-center gap-3'>
                      <Typography.Text>{stf(item.total_vehicles).normal() || 0} คัน</Typography.Text>
                      <Typography.Text className='!text-lg'>&gt;</Typography.Text>
                    </div>
                  </section>
                  <section>
                    <Progress
                      percent={item.percentage}
                      size={{
                        height: '0.4rem'
                      }}
                      strokeColor={'#56E4EE'}
                      trailColor={'#294C4F'}
                      percentPosition={{
                        align: 'end',
                        type: 'outer',
                      }}
                      showInfo={false}
                    />
                  </section>
                </figure>
              </Col>
            )
          })
          :
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Empty
              description={<Typography.Text className='!text-white'>No Data</Typography.Text>}
            />
          </Col>
        }
      </Row>
    </Card>
  )
}

export default React.memo(VehicleOnRoute)
