import React from 'react'
import { Card, Col, Row, Typography } from 'antd'
import { TruckOutlined } from '@ant-design/icons'
import Image from 'next/image'
import BigTruck from '@/public/images/big-truck.svg'

const CarLicenseSection = (props) => {
  const { } = props

  const properties = {
    className: 'rounded-md px-5 py-3 my-1'
  }

  return (
    <Card>
      <Row gutter={[30, 30]}>
        <Col xs={24} sm={16} md={16} lg={16} xl={24} xxl={24}>
          <div className='text-center'>
            <Typography.Title level={5} className='!m-0' underline>ทะเบียน 70-0986</Typography.Title>
            <Typography.Text>รถน้ำหนักเกิน (เพลาเกิน)</Typography.Text><br />
            <Typography.Text>ปจ.0051  | ฉะเชิงเทรา</Typography.Text>
          </div>
          <figure>
            <Image
              src={BigTruck}
              alt='big-truck'
            />
          </figure>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8} xl={24} xxl={24}>
          <figcaption {...properties}>
            <div className='flex flex-wrap gap-3 items-start'>
              <TruckOutlined style={{ fontSize: '1.5rem' }} />
              <section>
                <Typography.Title level={5} className='!m-0'>ประเภทรถยนต์</Typography.Title>
                <Typography.Text>รถยนต์ 8 ล้อ</Typography.Text>
              </section>
            </div>
          </figcaption>
          <figcaption {...properties}>
            <div className='flex flex-wrap gap-3 items-start'>
              <TruckOutlined style={{ fontSize: '1.5rem' }} />
              <section>
                <Typography.Title level={5} className='!m-0'>น้ำหนักที่ชั่งได้</Typography.Title>
                <Typography.Text>105 ตัน</Typography.Text>
              </section>
            </div>
          </figcaption>
          <figcaption {...properties}>
            <div className='flex flex-wrap gap-3 items-start'>
              <TruckOutlined style={{ fontSize: '1.5rem' }} />
              <section>
                <Typography.Title level={5} className='!m-0'>น้ำหนักตามกฎหมาย</Typography.Title>
                <Typography.Text>105 ตัน</Typography.Text>
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
                <Typography.Title level={5} className='!m-0'>สถานะรถยนต์</Typography.Title>
                <Typography.Text>น้ำหนักเกิน</Typography.Text>
              </section>
            </div>
          </figcaption>
          <figcaption {...properties}>
            <div className='flex flex-wrap gap-3 items-start'>
              <TruckOutlined style={{ fontSize: '1.5rem' }} />
              <section>
                <Typography.Title level={5} className='!m-0'>น้ำหนักที่เกิน</Typography.Title>
                <Typography.Text>55 ตัน</Typography.Text>
              </section>
            </div>
          </figcaption>
        </Col>
      </Row>
    </Card>
  )
}

export default React.memo(CarLicenseSection)
