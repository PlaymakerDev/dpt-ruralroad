import React, { useCallback } from 'react'
import { Field, Form, useForm } from '@/components/form'
import { Row, Col, Button } from 'antd'

const FormCreateUser = (props) => {
  const { } = props

  const form = useForm({
    username: '',
    prefix: '',
    first_name: '',
    last_name: '',
    department: '',
    permission: '',
    position: '',
    role: ''
  })

  const buildValue = useCallback((values, next) => {
    next(values)
  }, [])

  const handlerSubmit = useCallback((values) => {
    console.log(values)
  }, [])

  return (
    <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
      <section>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Field.Input
              label='Username'
              name='username'
              placeholder='Username'
            />
          </Col>
        </Row>
      </section>
      <section className='mt-3'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Field.Input
              label='คำนำหน้า'
              name='prefix'
              placeholder='คำนำหน้า'
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Field.Input
              label='ชื่อ'
              name='first_name'
              placeholder='ชื่อ'
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Field.Input
              label='นามสกุล'
              name='last_name'
              placeholder='นามสกุล'
            />
          </Col>
          <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
            <Field.Select
              label='หน่วยงาน'
              name='department'
              placeholder='หน่วยงาน'
              optKeys={['value', 'label']}
              options={[]}
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Field.Select
              label='สิทธิ์การเข้าใช้งาน'
              name='permisison'
              placeholder='สิทธิ์การเข้าใช้งาน'
              optKeys={['value', 'label']}
              options={[]}
            />
          </Col>
          <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
            <Field.Select
              label='ตำแหน่ง'
              name='position'
              placeholder='ตำแหน่ง'
              optKeys={['value', 'label']}
              options={[]}
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Field.Select
              label='หน้าที่'
              name='role'
              placeholder='หน้าที่'
              optKeys={['value', 'label']}
              options={[]}
            />
          </Col>
        </Row>
      </section>
      <section className='mt-5 block sm:flex sm:justify-end sm:items-center sm:gap-3'>
        <Button
          type='primary'
          htmlType='submit'
          size='large'
          className='!w-full lg:!w-auto'
        >
          บันทึก
        </Button>
        <Button
          type='text'
          htmlType='submit'
          size='large'
          className='!w-full lg:!w-auto'
        >
          ยกเลิก
        </Button>
      </section>
    </Form>
  )
}

export default React.memo(FormCreateUser)
