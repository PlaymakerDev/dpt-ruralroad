import React, { useCallback } from 'react'
import { Form, Field, useForm } from '@/components/form'
import { Button, Col, Row, Typography } from 'antd'
import { SearchOutlined , PlusOutlined } from '@ant-design/icons'

const FieldSearchMove = (props) => {
  const { setOpenAdd } = props

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
<Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
      <Row gutter={[30, 16]} align={'middle'} className='!mr-0.5 !ml-0.5 mb-4 pt-4 pb-4 border border-lightblue rounded-lg'>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Typography.Text className='!text-xl !font-bold !text-left'>
              ค้นหา
            </Typography.Text>
      </Col>  
      <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={6}>
            <Field.DatePicker
              label='จากวันที่'
              name='date'
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={6}>
            <Field.DatePicker
              label='จากวันที่'
              name='date'
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={6}>
            <Field.Select
              label='สถานี'
              name='sation'
            />
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={2}>
            <Button
              icon={<SearchOutlined />}
              size='large'
              className='!w-full'
              htmlType='submit'
              type='primary'
            >
              ค้นหา
            </Button>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={2}>
            <Typography.Text
              className='!cursor-pointer !block !text-center md:!text-start'
            >
              ล้างการค้นหา
            </Typography.Text>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={2} className='!text-end'>
            <Button
              icon={<PlusOutlined />}
              size='large'
              className='!w-full '
              type='primary'
              onClick={() => setOpenAdd(true)}

            >
              เพิ่มข้อมูล
            </Button>
          </Col>
        </Row>
      </Form> 

  )
}

export default React.memo(FieldSearchMove)
