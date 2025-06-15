import React from 'react'
import { Card, Col, Flex, Row, Typography } from 'antd'
// import { TruckOutlined } from '@ant-design/icons'
import { TruckIcon } from '@/components/icon'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(buddhistEra)
dayjs.extend(customParseFormat);

const RouteData = (props) => {
  const { data, loading } = props

  const properties = {
    className: 'rounded-xl px-5 py-3 my-3 bg-[#6C6C6C16]'
  }

  return (
    <div className='card-container rounded-md gap-1 p-2'>
      <Flex align='center' justify='space-between' gap={'0.75rem'} wrap>
        <h1 className='text-[clamp(1px, 4vw, 15px)] font-bold'>ข้อมูลสายทาง</h1>
        <div className='px-3 py-1 rounded-3xl bg-[#FFFFFF31] w-40 text-center'>
          <p className='text-md'>{dayjs().locale('th').format('DD MMMM BBBB')}</p>
        </div>
      </Flex>
      <Row gutter={[30, 30]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <figcaption {...properties}>
            <div className='flex flex-wrap gap-3 items-center'>
              <TruckIcon width={23} height={16} customFill='#FFFFFF' />
              <section>
                <h1 className='text-[clamp(1px, 4vw, 15px)] font-bold'>รหัสสายทาง</h1>
                <p>{data?.road_code || '-'}</p>
              </section>
            </div>
          </figcaption>
          <figcaption {...properties}>
            <div className='flex flex-wrap gap-3 items-center'>
              <TruckIcon width={23} height={16} customFill='#FFFFFF' />
              <section>
                <h1 className='text-[clamp(1px, 4vw, 15px)] font-bold'>ชื่อสายทาง</h1>
                <p>{data?.road_name || '-'}</p>
              </section>
            </div>
          </figcaption>
          <figcaption {...properties}>
            <div className='flex flex-wrap gap-3 items-center'>
              <TruckIcon width={23} height={16} customFill='#FFFFFF' />
              <section>
                <h1 className='text-[clamp(1px, 4vw, 15px)] font-bold'>จังหวัด</h1>
                <p>{data?.province || '-'}</p>
              </section>
            </div>
          </figcaption>
          <figcaption {...properties}>
            <div className='flex flex-wrap gap-3 items-center'>
              <TruckIcon width={23} height={16} customFill='#FFFFFF' />
              <section>
                <h1 className='text-[clamp(1px, 4vw, 15px)] font-bold'>ระยะทาง</h1>
                <p>{data?.distance || '-'}</p>
              </section>
            </div>
          </figcaption>
        </Col>
      </Row>
    </div>
  )
}

export default React.memo(RouteData)
