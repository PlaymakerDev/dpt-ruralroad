import React from 'react'
import { Card, Col, Row, Typography } from 'antd'
import Image from 'next/image'
import GreenTruck from '@/public/images/green-truck.svg'
import YellowTruck from '@/public/images/yellow-truck.svg'
import RedTruck from '@/public/images/red-truck.svg'

const VehicleData = (props) => {
  const { } = props

  const gridProperties = {
    className: '!w-full sm:!w-full md:!w-2/6 lg:!w-2/6 xl:!w-2/6 !text-center !border-none'
  }

  return (
    <Card
      title='ข้อมูลรถในสายทาง'
    >
      <Card.Grid hoverable={false} {...gridProperties}>
        <Typography.Title level={5}>รถวิ่งตามปกติ</Typography.Title>
        <Image
          src={GreenTruck}
          alt='truck-inspect'
          className='block m-auto'
        />
        <section>
          <div className='flex flex-col'>
            <Typography.Text className='!font-IBMPlexSansThaiLight'>จำนวนรถเข้าชั่ง</Typography.Text>
            <div className='mt-2'>
              <Typography.Text className='!text-2xl' strong>5,000</Typography.Text>
              <Typography.Text> คัน</Typography.Text>
            </div>
          </div>
        </section>
      </Card.Grid>
      <Card.Grid hoverable={false} {...gridProperties}>
        <Typography.Title level={5}>รถที่จอดอยู่กับที่</Typography.Title>
        <Image
          src={YellowTruck}
          alt='truck-inspect'
          className='block m-auto'
        />
        <section>
          <div className='flex flex-col'>
            <Typography.Text className='!font-IBMPlexSansThaiLight'>จำนวนรถเข้าชั่ง</Typography.Text>
            <div className='mt-2'>
              <Typography.Text className='!text-2xl' strong>5,000</Typography.Text>
              <Typography.Text> คัน</Typography.Text>
            </div>
          </div>
        </section>
      </Card.Grid>
      <Card.Grid hoverable={false} {...gridProperties}>
        <Typography.Title level={5}>รถที่มีประวัติน้ำหนักเกิน</Typography.Title>
        <Image
          src={RedTruck}
          alt='truck-inspect'
          className='block m-auto'
        />
        <section>
          <div className='flex flex-col'>
            <Typography.Text className='!font-IBMPlexSansThaiLight'>จำนวนรถเข้าชั่ง</Typography.Text>
            <div className='mt-2'>
              <Typography.Text className='!text-2xl' strong>5,000</Typography.Text>
              <Typography.Text> คัน</Typography.Text>
            </div>
          </div>
        </section>
      </Card.Grid>
    </Card>
  )
}

export default React.memo(VehicleData)
