import React from 'react'
import { Modal, Row, Col, Card, Typography , Button} from 'antd'
import Image from "next/image";
import front from "@/public/images/car1.svg";
import back from "@/public/images/car2.svg";
import wei from "@/public/images/car3.svg";
import left from "@/public/images/car4.svg";
import right from "@/public/images/car5.svg";
import drive from "@/public/images/car6.svg";

const Content = (props) => {
  const { } = props
  return (
  <>
    <Row gutter={[30, 16]} align={'middle'}>
      <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Card>
            <Typography.Text>
              รถด้านหน้า
            </Typography.Text>
            <Image src={front} alt='front' className='mt-2 mb-2' />
            <span className='flex justify-between items-center'>
            <Button
                size='large'
                type='primary'
              >
                เลือกไฟล์
              </Button>
              <Button
                size='large'
                type='primary'
              >
                อัพโหลดภาพ
              </Button>
            </span>
          </Card>

      </Col>
      <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Card>
            <Typography.Text>
              รถด้านหลัง
            </Typography.Text>
            <Image src={back} alt='back' className='mt-2 mb-2' />
            <span className='flex justify-between items-center'>
            <Button
                size='large'
                type='primary'
              >
                เลือกไฟล์
              </Button> 
              <Button
                size='large'
                type='primary'
              >
                อัพโหลดภาพ
              </Button>
            </span>
          </Card>

      </Col>
      <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Card>
            <Typography.Text>
              สลิปน้ำหนัก
            </Typography.Text>
            <Image src={wei} alt='wei' className='mt-2 mb-2' />
            <span className='flex justify-between items-center'>
            <Button
                size='large'
                type='primary'
              >
                เลือกไฟล์
              </Button>
              <Button
                size='large'
                type='primary'
              >
                อัพโหลดภาพ
              </Button>
            </span>
          </Card>

      </Col>
      <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Card>
            <Typography.Text>
              รถด้านซ้าย
            </Typography.Text>
            <Image src={left} alt='left' className='mt-2 mb-2' />
            <span className='flex justify-between items-center'>
            <Button
                size='large'
                type='primary'
              >
                เลือกไฟล์
              </Button>
              <Button
                size='large'
                type='primary'
              >
                อัพโหลดภาพ
              </Button>
            </span>
          </Card>

      </Col>
      <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Card>
            <Typography.Text>
              รถด้านขวา
            </Typography.Text>
            <Image src={right} alt='right' className='mt-2 mb-2' />
            <span className='flex justify-between items-center'>
            <Button
                size='large'
                type='primary'
              >
                เลือกไฟล์
              </Button>
              <Button
                size='large'
                type='primary'
              >
                อัพโหลดภาพ
              </Button>
            </span>
          </Card>

      </Col>
      <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Card>
            <Typography.Text>
              ใบขับขี่
            </Typography.Text>
            <Image src={drive} alt='drive' className='mt-2 mb-2' />
            <span className='flex justify-between items-center'>
            <Button
                size='large'
                type='primary'
              >
                เลือกไฟล์
              </Button>
              <Button
                size='large'
                type='primary'
              >
                อัพโหลดภาพ
              </Button>
            </span>
          </Card>

      </Col>
    </Row>
  </>  
  )
}

const ModalPic = (props) => {
  const { openPic, setOpenPic } = props

  return (
    <Modal  
      title={<span className="text-2xl font-bold">รูปรถเข้าชั่ง</span>}      
      open={openPic}
      destroyOnClose
      onCancel={() => setOpenPic(false)}
      width={1500}
      footer={false}
    >
      <main className='my-5'>
        <Content />
      </main>
    </Modal>
  )
}

export default React.memo(ModalPic)
