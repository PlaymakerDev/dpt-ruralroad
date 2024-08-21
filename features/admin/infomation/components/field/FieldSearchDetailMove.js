import React, { useCallback } from 'react'
import { Button, Card, Col, Row, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Image from "next/image";
import move1 from "@/public/images/move1.svg";
import move2 from "@/public/images/move2.svg";



const FieldSearchDetailMove = (props) => {
  const { } = props

  const buildValue = useCallback((values, next) => {
    next(values)
  }, [])

  const handlerSubmit = useCallback((values) => {
    console.log(values)
  }, [])

  return (
      <Row gutter={[30, 16]} align={'middle'} className='!mr-0.5 !ml-0.5 mb-4 pt-4 pb-4 border border-lightblue rounded-lg'>
              <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
                  <Typography.Text className='!text-xl !font-bold !text-left'>
                    ข้อมูลหน่วยจัดตั้งเคลื่อนที่
                  </Typography.Text>
              </Col>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                  <Typography.Text className='!text-base !text-left'>
                    กั้นการจราจร
                  </Typography.Text>
              </Col>
              <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                  <Typography.Text className='!text-base  !text-left'>
                    บุคคลผู้ร่วมบูรณาการ
                  </Typography.Text>
              </Col>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
            <Row gutter={[30, 16]} align={'middle'}>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} className='!flex !flex-col'>
                  <Typography.Text className='!text-base !font-bold !text-left'>
                    สกช.6 ขอนแก่น
                  </Typography.Text>
                  <Typography.Text className='!text-base !text-blue-300 !text-left'>
                    ขื่อหน่วยชั่งยานพาหนะ
                  </Typography.Text>
              </Col>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} className='!flex !flex-col'>
                  <Typography.Text className='!text-base !font-bold !text-left'>
                    รอ.4034
                  </Typography.Text>
                  <Typography.Text className='!text-base !text-blue-300 !text-left'>
                    รหัสสายทาง
                  </Typography.Text>
              </Col>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} className='!flex !flex-col'>
                  <Typography.Text className='!text-base !font-bold !text-left'>
                    11 สิงหาคม 2567
                  </Typography.Text>
                  <Typography.Text className='!text-base !text-blue-300 !text-left'>
                    วันที่จัดตั้ง
                  </Typography.Text>
              </Col>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} className='!flex !flex-col'>
                  <Typography.Text className='!text-base !font-bold !text-left'>
                    11:56:18 - 14:12:56
                  </Typography.Text>
                  <Typography.Text className='!text-base !text-blue-300 !text-left'>
                    เริ่มเวลา ถึง สิ้นสุด
                  </Typography.Text>
              </Col>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} className='!flex !flex-col'>
                  <Typography.Text className='!text-base !font-bold !text-left'>
                    โพนทอง-เมยวดี
                  </Typography.Text>
                  <Typography.Text className='!text-base !text-blue-300 !text-left'>
                    อำเภอ
                  </Typography.Text>
              </Col>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} className='!flex !flex-col'>
                  <Typography.Text className='!text-base !font-bold !text-left'>
                    ขอนแก่น
                  </Typography.Text>
                  <Typography.Text className='!text-base !text-blue-300 !text-left'>
                    จังหวัด
                  </Typography.Text>
              </Col>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} className='!flex !flex-col'>
                  <Typography.Text className='!text-base !font-bold !text-left'>
                    21 + 900
                  </Typography.Text>
                  <Typography.Text className='!text-base !text-blue-300 !text-left'>
                    เริ่ม กม. ที่
                  </Typography.Text>
              </Col>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} className='!flex !flex-col'>
                  <Typography.Text className='!text-base !font-bold !text-left'>
                    22 + 900
                  </Typography.Text>
                  <Typography.Text className='!text-base !text-blue-300 !text-left'>
                    ถึง กม. ที่
                  </Typography.Text>
              </Col>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} className='!flex !flex-col'>
                  <Typography.Text className='!text-base !font-bold !text-left'>
                    ทช.,ขนส่งจังหวัด
                  </Typography.Text>
                  <Typography.Text className='!text-base !text-blue-300 !text-left'>
                    การร่วมบูรณาการ
                  </Typography.Text>
              </Col>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} className='!flex !flex-col'>
                  <Typography.Text className='!text-base !font-bold !text-left'>
                    แยก ทล.2044(กม ที่ 33+100)-บ้านโคกสี
                  </Typography.Text>
                  <Typography.Text className='!text-base !text-blue-300 !text-left'>
                    ชื่อสายทาง
                  </Typography.Text>
              </Col>
            </Row>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
            <Row gutter={[30, 16]} align={'middle'}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <Image src={move1} className='!mb-4' />
                  <Button
                icon={<PlusOutlined />}
                size='large'
                type='primary'
                
              >
                อัพโหลดภาพ
              </Button>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                  <Image src={move2} className='!mb-4' />
                  <Button
                icon={<PlusOutlined />}
                size='large'
                type='primary'
              >
                อัพโหลดภาพ
              </Button>
              </Col>
              

            </Row>    
        </Col>
      </Row>
  )
}

export default React.memo(FieldSearchDetailMove)
