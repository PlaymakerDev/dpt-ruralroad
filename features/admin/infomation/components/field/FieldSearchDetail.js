import React, { useCallback } from 'react'
import { Form, Field, useForm } from '@/components/form'
import { Button, Col, Row, Typography } from 'antd'
import { SearchOutlined  } from '@ant-design/icons'

const FieldSearchDetail = (props) => {
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
    <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
      <Row gutter={[30, 16]} align={'middle'}>
        <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
          <Field.DatePicker
            label='วันที่'
            name='date'
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
          <Field.DatePicker
            label='วันที่'
            name='date'
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
          <Field.Select
            label='สถานี'
            name='sation'
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
          <Button
            icon={<SearchOutlined />}
            size='large'
            className=' !w-auto'
            htmlType='submit'
            type='primary'
            >
            ค้นหา
          </Button>
          <Typography.Text
            className='p-2'
          >
            ล้างข้อมูล
          </Typography.Text>
        </Col>
      </Row>
    </Form>
  )
}

export default React.memo(FieldSearchDetail)
