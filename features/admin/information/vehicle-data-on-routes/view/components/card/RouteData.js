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
  const { data } = props

  const properties = {
    className: 'rounded-xl px-5 py-3 my-3 bg-[#6C6C6C16]'
  }

  return (
    <Card className='!w-full !h-full'>
      <Flex align='center' justify='space-between' gap={'0.75rem'} wrap>
        <Typography.Title level={4} className='!m-0'>ข้อมูลสายทาง</Typography.Title>
        <div className='px-3 py-1 rounded-3xl bg-[#FFFFFF31] w-40 text-center'>
          <Typography.Text className='!text-md'>{dayjs().locale('th').format('DD MMMM BBBB')}</Typography.Text>
        </div>
      </Flex>
      <Row gutter={[30, 30]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <figcaption {...properties}>
            <div className='flex flex-wrap gap-3 items-center'>
              <TruckIcon width={23} height={16} customFill='#FFFFFF' />
              <section>
                <Typography.Title level={5} className='!m-0'>รหัสสายทาง</Typography.Title>
                <Typography.Text>{data?.road_code || '-'}</Typography.Text>
              </section>
            </div>
          </figcaption>
          <figcaption {...properties}>
            <div className='flex flex-wrap gap-3 items-center'>
              <TruckIcon width={23} height={16} customFill='#FFFFFF' />
              <section>
                <Typography.Title level={5} className='!m-0'>ชื่อสายทาง</Typography.Title>
                <Typography.Text>{data?.road_name || '-'}</Typography.Text>
              </section>
            </div>
          </figcaption>
          <figcaption {...properties}>
            <div className='flex flex-wrap gap-3 items-center'>
              <TruckIcon width={23} height={16} customFill='#FFFFFF' />
              <section>
                <Typography.Title level={5} className='!m-0'>จังหวัด</Typography.Title>
                <Typography.Text>{data?.province || '-'}</Typography.Text>
              </section>
            </div>
          </figcaption>
          {/* <figcaption {...properties}>
            <div className='flex flex-wrap gap-3 items-center'>
              <TruckIcon width={23} height={16} customFill='#FFFFFF' />
              <section>
                <Typography.Title level={5} className='!m-0'>เพลาที่เกิน</Typography.Title>
                <Typography.Text>2 เพลา</Typography.Text>
              </section>
            </div>
          </figcaption> */}
          {/* <figcaption {...properties}>
            <div className='flex flex-wrap gap-3 items-center'>
              <TruckIcon width={23} height={16} customFill='#FFFFFF' />
              <section>
                <Typography.Title level={5} className='!m-0'>สายทาง</Typography.Title>
                <Typography.Text>แยก ทล. 1065</Typography.Text>
                <Typography.Text>{data?.road_code || '-'}</Typography.Text>
              </section>
            </div>
          </figcaption> */}
          {/* <figcaption {...properties}>
            <div className='flex flex-wrap gap-3 items-center'>
              <TruckIcon width={23} height={16} customFill='#FFFFFF' />
              <section>
                <Typography.Title level={5} className='!m-0'>เริ่มต้น - สิ้นสุด (กม.)</Typography.Title>
                <Typography.Text>กม. 9+100  - กม. 9-700</Typography.Text>
                <Typography.Text>{data?.distance || '-'}</Typography.Text>
              </section>
            </div>
          </figcaption> */}
          <figcaption {...properties}>
            <div className='flex flex-wrap gap-3 items-center'>
              <TruckIcon width={23} height={16} customFill='#FFFFFF' />
              <section>
                <Typography.Title level={5} className='!m-0'>ระยะทาง</Typography.Title>
                <Typography.Text>{data?.distance || '-'}</Typography.Text>
              </section>
            </div>
          </figcaption>
        </Col>
      </Row>
    </Card>
  )
}

export default React.memo(RouteData)
