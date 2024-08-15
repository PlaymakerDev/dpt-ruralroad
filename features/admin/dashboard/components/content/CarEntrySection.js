import React from 'react'
import { Card, Row, Col, Typography } from 'antd'
import Image from 'next/image'
import TruckOverall from '@/public/images/truck-overall.svg'
import TruckInspect from '@/public/images/truck-inspect.svg'
import TruckWIM from '@/public/images/truck-wim.svg'
import TruckWeight from '@/public/images/truck-weight.svg'

const CarEntrySection = (props) => {
  const { } = props

  const gridProperties = {
    className: '!w-full sm:!w-1/2 xl:!w-1/4 !text-center !border-none'
  }

  return (
    <Card className='bg-gradient border-lightblue !w-full !h-full'>
      <Card.Grid hoverable={false} {...gridProperties}>
        <Typography.Title level={5}>รวมรถเข้าชั่งทั้งหมด</Typography.Title>
        <Image
          src={TruckOverall}
          alt='truck-overall'
          className='block m-auto'
        />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Typography.Text className='!text-sm'>จำนวนรถเข้าชั่ง</Typography.Text><br />
            <Typography.Text className='!text-2xl !font-IBMPlexSansThaiBold'>517</Typography.Text><br />
            <Typography.Text className='!text-sm !font-IBMPlexSansThaiBold'>คัน</Typography.Text>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Typography.Text className='!text-sm'>บรรจุเกิน</Typography.Text><br />
            <Typography.Text className='!text-2xl !font-IBMPlexSansThaiBold !text-[#E81A1A]'>517</Typography.Text><br />
            <Typography.Text className='!text-sm !font-IBMPlexSansThaiBold !text-[#E81A1A]'>คัน</Typography.Text>
          </Col>
        </Row>
      </Card.Grid>
      <Card.Grid hoverable={false} {...gridProperties}>
        <Typography.Title level={5}>หน่วยตรวจสอบเคลื่อนที่</Typography.Title>
        <Image
          src={TruckInspect}
          alt='truck-inspect'
          className='block m-auto'
        />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Typography.Text className='!text-sm'>จำนวนรถเข้าชั่ง</Typography.Text><br />
            <Typography.Text className='!text-2xl !font-IBMPlexSansThaiBold'>517</Typography.Text><br />
            <Typography.Text className='!text-sm !font-IBMPlexSansThaiBold'>คัน</Typography.Text>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Typography.Text className='!text-sm'>บรรจุเกิน</Typography.Text><br />
            <Typography.Text className='!text-2xl !font-IBMPlexSansThaiBold !text-[#E81A1A]'>517</Typography.Text><br />
            <Typography.Text className='!text-sm !font-IBMPlexSansThaiBold !text-[#E81A1A]'>คัน</Typography.Text>
          </Col>
        </Row>
      </Card.Grid>
      <Card.Grid hoverable={false} {...gridProperties}>
        <Typography.Title level={5}>Weight In Motion (WIM)</Typography.Title>
        <Image
          src={TruckWIM}
          alt='truck-wim'
          className='block m-auto'
        />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Typography.Text className='!text-sm'>จำนวนรถเข้าชั่ง</Typography.Text><br />
            <Typography.Text className='!text-2xl !font-IBMPlexSansThaiBold'>517</Typography.Text><br />
            <Typography.Text className='!text-sm !font-IBMPlexSansThaiBold'>คัน</Typography.Text>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Typography.Text className='!text-sm'>บรรจุเกิน</Typography.Text><br />
            <Typography.Text className='!text-2xl !font-IBMPlexSansThaiBold !text-[#E81A1A]'>517</Typography.Text><br />
            <Typography.Text className='!text-sm !font-IBMPlexSansThaiBold !text-[#E81A1A]'>คัน</Typography.Text>
          </Col>
        </Row>
      </Card.Grid>
      <Card.Grid hoverable={false} {...gridProperties}>
        <Typography.Title level={5}>สถานีตรวจสอบน้ำหนัก</Typography.Title>
        <Image
          src={TruckWeight}
          alt='truck-weight'
          className='block m-auto'
        />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Typography.Text className='!text-sm'>จำนวนรถเข้าชั่ง</Typography.Text><br />
            <Typography.Text className='!text-2xl !font-IBMPlexSansThaiBold'>517</Typography.Text><br />
            <Typography.Text className='!text-sm !font-IBMPlexSansThaiBold'>คัน</Typography.Text>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Typography.Text>บรรจุเกิน</Typography.Text><br />
            <Typography.Text className='!text-2xl !font-IBMPlexSansThaiBold !text-[#E81A1A]'>517</Typography.Text><br />
            <Typography.Text className='!text-sm !font-IBMPlexSansThaiBold !text-[#E81A1A]'>คัน</Typography.Text>
          </Col>
        </Row>
      </Card.Grid>
    </Card>
  )
}

export default React.memo(CarEntrySection)
