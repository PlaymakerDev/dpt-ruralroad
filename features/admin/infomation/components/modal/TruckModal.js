import React from 'react'
import { Modal, Row, Col, Card, Typography } from 'antd'
import { InfoCircleOutlined , TruckOutlined , CheckCircleOutlined , InboxOutlined} from '@ant-design/icons';

const Content = (props) => {
  const { } = props
  return (
  <>
    <Row gutter={[30, 16]} align={'middle'}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className='text-left'>
            <Typography.Text className='text-base'>
                สถานี นครศรีธรรมราช
            </Typography.Text>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className='text-right'>
            <Typography.Text className='text-base'>
                13 ธันวาคม 2567 16:31:53
            </Typography.Text>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <Card>
        <div className="flex justify-between items-center pl-20 pr-20">
          <div className="flex flex-col items-center">
            <Typography.Text className='text-lg'>
              ทะเบียนหัวลาก
            </Typography.Text>
            <Typography.Text className='text-lg'>
              65-3535
            </Typography.Text>
          </div>
          <div className="flex flex-col items-center">
            <Typography.Text className='text-lg'>
              จังหวัด
            </Typography.Text>
            <Typography.Text className='text-lg'>
              พระนครศรีอยุธยา
            </Typography.Text>
          </div>
        </div>
      </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Card>
                <div className="flex flex-col items-center">
                    <InfoCircleOutlined className='text-3xl'/>
                    <Typography.Text className='text-base p-2'>
                        น้ำหนักที่ชั่งได้
                    </Typography.Text>
                    <Typography.Text className='text-xl font-bold'>
                        35.5 ตัน
                    </Typography.Text>
                </div>
            </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Card>
                <div className="flex flex-col items-center">
                    <InfoCircleOutlined className='text-3xl'/>
                    <Typography.Text className='text-base p-2'>
                        น้ำหนักที่กฏหมายกำหนด
                    </Typography.Text>
                    <Typography.Text className='text-xl font-bold'>
                        50.5 ตัน
                    </Typography.Text>
                </div>            
            </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Card>
                 <div className="flex flex-col items-center">
                    <InfoCircleOutlined className='text-3xl'/>
                    <Typography.Text className='text-base p-2'>
                        น้ำหนักที่เกิน
                    </Typography.Text>
                    <Typography.Text className='text-xl font-bold text-red-600'>
                        10 ตัน
                    </Typography.Text>
                </div>
            </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Card>
                 <div className="flex flex-col items-center">
                    <TruckOutlined className='text-3xl'/>
                    <Typography.Text className='text-base p-2'>
                        ประเภท
                    </Typography.Text>
                    <Typography.Text className='text-xl font-bold'>
                        20
                    </Typography.Text>
                </div>
            </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Card>
                 <div className="flex flex-col items-center">
                    <CheckCircleOutlined className='text-3xl'/>
                    <Typography.Text className='text-base p-2'>
                        สถานะเข้าชั่ง
                    </Typography.Text>
                    <Typography.Text className='text-red-600 text-xl font-bold '>
                        เกินพิกัด
                    </Typography.Text>
                </div>
            </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Card>
                 <div className="flex flex-col items-center">
                    <InboxOutlined className='text-3xl'/>
                    <Typography.Text className='text-base p-2'>
                        สิ่งของที่บรรทุก
                    </Typography.Text>
                    <Typography.Text className='text-xl font-bold'>
                        ม้า
                    </Typography.Text>
                </div>
            </Card>
        </Col>
        
      </Row>
  </>  
  )
}

const TruckModal = (props) => {
  const { open, setOpen } = props

  return (
    <Modal  
      title={<span className="text-2xl font-bold">รายละเอียดรถบรรทุก</span>}      
      open={open}
      destroyOnClose
      onCancel={() => setOpen(false)}
      width={800}
      footer={false}
    >
      <main className='my-5'>
        <Content />
      </main>
    </Modal>
  )
}

export default React.memo(TruckModal)
