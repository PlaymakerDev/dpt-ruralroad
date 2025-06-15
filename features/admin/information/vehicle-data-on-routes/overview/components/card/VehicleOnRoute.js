import React from 'react'
import { Card, Col, Empty, Progress, Row, Typography } from 'antd'
import { useRouter } from 'next/router'
import stf from '@/utils/stringformat'

const VehicleOnRoute = (props) => {
  const { data } = props
  const router = useRouter()

  return (
    <div className="card-container rounded-md p-2">
      <h1 className='text-[clamp(1px, 4vw, 15px)] font-bold'>สายทางที่มีปริมาณรถมากที่สุด</h1>
      <section className='mt-3 overflow-scroll overflow-x-hidden h-[23.5rem]'>
        <Row gutter={[8, 8]}>
          {!!data?.length ?
            data?.map((item, index) => {
              return (
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} key={index}>
                  <figure
                    className='border-solid border-2 border-lightblue rounded-lg px-4 py-1 cursor-pointer'
                    onClick={() => router.push(`/admin/gps/view/${item.road_code}`)}
                  >
                    <section className='flex flex-wrap justify-between'>
                      <p className='text-[clamp(1px, 4vw, 15px)] font-bold underline'>{item.road_code}</p>
                      <p className='text-[clamp(1px, 4vw, 15px)]'>{stf(item.count).normal() || 0} คัน &gt;</p>
                    </section>
                    <section>
                      <Progress
                        percent={item.count}
                        size={{
                          height: '0.4rem'
                        }}
                        strokeColor={'#56E4EE'}
                        percentPosition={{
                          align: 'end',
                          type: 'outer',
                        }}
                        showInfo={false}
                        trailColor={'#294C4F'}
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
      </section>
    </div>
  )
}

export default React.memo(VehicleOnRoute)
