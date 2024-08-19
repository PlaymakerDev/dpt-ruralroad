import React, { useCallback } from 'react'
import { Button, Card, Col, Row, Typography } from 'antd'
import { Form, Field, useForm } from '@/components/form'
import { SearchOutlined } from '@ant-design/icons'

const FormSearchCollaborate = (props) => {
  const { } = props

  const form = useForm({
    initialValues: {},
    rules: {}
  })

  const buildValue = useCallback((values, next) => {
    next(values)
  }, [])

  const handlerSubmit = useCallback((values) => {
    console.log(values)
  }, [])

  return (
    <Card>
      <Typography.Title level={5}>ค้นหา</Typography.Title>
      <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
        <Row gutter={[16, 16]} align={'middle'}>
          <Col xs={24} sm={24} md={12} lg={6} xl={4} xxl={4}>
            <Field.Input
              label='หน่วยงาน'
              name='department'
              placeholder='หน่วยงาน'
            // hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={4} xxl={4}>
            <Field.DatePicker
              label='วันที่'
              name='date'
              placeholder='วันที่'
            // hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={4} xxl={4}>
            <Field.Select
              label='รหัสสายทาง'
              name='trollway_code'
              placeholder='รหัสสายทาง'
              optKeys={['value', 'label']}
              options={[
                {
                  label: 'ทั้งหมด',
                  value: 'ALL'
                }
              ]}
            // hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={4} xxl={4}>
            <Field.Input
              label='ร่วมบูรณาการ'
              name='collaboration'
              placeholder='ร่วมบูรณาการ'
            // hideRequired
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} xl={4} xxl={2}>
            <Button
              type='primary'
              size='large'
              icon={<SearchOutlined />}
              // className='!w-full 2xl:!w-auto'
              className='!w-full'
            >
              ค้นหา
            </Button>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} xl={4} xxl={2}>
            <Button
              type='text'
              size='large'
              // className='!w-full 2xl:!w-auto'
              className='!w-full'
            >
              ล้างการค้นหา
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default React.memo(FormSearchCollaborate)
