import React, { useCallback } from 'react'
import { Modal, Row, Col , Typography , Button} from 'antd'
import { Form, Field, useForm } from '@/components/form'


const Content = (props) => {
  const { } = props
  const form = useForm({
    initialValues: {
      report_name: ''
    },
    rules: {}
  })

  const buildValue = useCallback((values, next) => {
    next(values)
  }, [])

  const handlerSubmit = useCallback((values) => {
    console.log(values)
  }, [])
  return (
  <>
    <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
      <Row gutter={[30, 16]} align={'middle'}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Field.Select
            label='ข้อมูลสายทาง'
            name='sation'
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Field.Input 
            label='เริ่ม กม. ที่'
            name='kms'
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Field.Input 
            label='ถึง กม. ที่'
            name='kme'
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Field.Select 
            label='ร่วมบูรณาการ'
            name='wtf'
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Field.DatePicker 
            label='วันที่จัดตั้ง'
            name='date'
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Field.Select 
            label='เวลาเริ่ม'
            name='times'
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Field.Select 
            label='เวลาสิ้นสุด'
            name='timee'
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className='!text-end !border-t !border-t-gray-500 !pt-4'>
          <Button
            size='large'
            className=' !w-auto'
            htmlType='submit'
            type='primary'
            >
            ยืนยัน
          </Button>
          <Typography.Text
            className='p-2'
          >
            ยกเลิก
          </Typography.Text>
        </Col>
      </Row>
    </Form>
  </>  
  )
}

const ModalPic = (props) => {
  const { openAdd, setOpenAdd } = props

  return (
    <Modal  
      title={<span className="text-2xl font-bold">เพิ่มข้อมูลจัดตั้งหน่วยเคลื่อนที่</span>}      
      open={openAdd}
      destroyOnClose
      onCancel={() => setOpenAdd(false)}
      width={800}
      footer={false}
    >
      <main className='my-5'>
        <Content />
      </main>
    </Modal>
  )
}

export default React.memo(ModalPic)
