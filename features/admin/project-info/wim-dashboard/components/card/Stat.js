import React from 'react'
import GreenTruck from '@/public/images/green-truck.svg'
import YellowTruck from '@/public/images/yellow-truck.svg'
import RedTruck from '@/public/images/red-truck.svg'
import Image from 'next/image'
import { Card, Col, Row, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Stat = (props) => {
  const { data, stationId } = props
  const router = useRouter()

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
        <Card>
          <div className='flex gap-5 flex-wrap'>
            <Image
              src={GreenTruck}
              alt='truck-inspect'
              width={60}
              height={60}
            // className='block m-auto'
            />
            <div className='flex flex-col flex-grow justify-between flex-wrap'>
              <div className='flex flex-col'>
                <Typography.Title level={5} className='!m-0'>รถเข้าชั่งวันนี้</Typography.Title>
                <div className='flex items-end justify-between'>
                  <Typography.Text><span className='text-green-500 text-2xl font-bold'>{data?.over || '-'}</span> คัน</Typography.Text>
                  <Typography.Text
                    className='text-blue-500 cursor-pointer'
                    underline
                    onClick={() => router.push({
                      pathname: `/admin/project-info/wim-detail/${stationId}`,
                      query: {
                        prev_name: data.name
                      }
                    })}
                  >
                    รายละเอียด
                  </Typography.Text>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
        <Card>
          <div className='flex gap-5 flex-wrap'>
            <Image
              src={RedTruck}
              alt='truck-inspect'
              width={60}
              height={60}
            // className='block m-auto'
            />
            <div className='flex flex-col flex-grow justify-between flex-wrap'>
              <Typography.Title level={5} className='!m-0'>รถน้ำหนักเกิน</Typography.Title>
              <Typography.Text><span className='text-red-500 text-2xl font-bold'>{data?.over || '-'}</span> คัน</Typography.Text>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  )
}

export default React.memo(Stat)
