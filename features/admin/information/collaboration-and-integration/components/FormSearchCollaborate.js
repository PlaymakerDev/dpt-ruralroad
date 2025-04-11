import React, { useCallback, useMemo } from 'react'
import { Button, Card, Col, Row, Typography } from 'antd'
import { Form, Field, useForm } from '@/components/form'
import { SearchOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const FormSearchCollaborate = (props) => {
  const { initialValues, apiGetData, clearData, department, collaborateList, allWay } = props

  const form = useForm({
    initialValues: {
      department_id: '',
      start_date: dayjs().startOf('month'),
      end_date: dayjs(),
      way_id: '',
      collaboration: '',
    },
    rules: {}
  })

  const { handlerChange } = form

  const buildValue = useCallback((values, next) => {
    const body = {
      ...(values.department_id && { department_id: Number(values.department_id) }),
      ...(values.way_id && { way_id: values.way_id }),
      ...(values.collaboration && { collaboration: values.collaboration }),

      start_date: values.start_date ? dayjs(values.start_date).format('YYYY-MM-DD') : '',
      end_date: values.end_date ? dayjs(values.end_date).format('YYYY-MM-DD') : '',
    }
    next(body)
  }, [])

  const handlerSubmit = useCallback((values) => {
    apiGetData('/api/v1/info/collaboration', {
      ...values,
      page: 1,
      page_size: initialValues.page_size,
      order: 'ASC'
    }, false, {})
  }, [initialValues, apiGetData])

  const handlerClear = useCallback(() => {
    handlerChange({
      department_id: '',
      start_date: dayjs().startOf('month'),
      end_date: dayjs(),
      way_id: '',
      collaboration: '',
    })
    clearData()
  }, [handlerChange, clearData])

  const updateData = department?.all?.data?.map(item => ({
    ...item,
    id: String(item.id)
  }));

  return (
    <Card>
      <Typography.Title level={5}>ค้นหา</Typography.Title>
      <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
        <Row gutter={[16, 16]} align={'middle'}>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={4}>
            <Field.Select
              label='หน่วยงาน'
              name='department_id'
              placeholder='หน่วยงาน'
              optKeys={['id', 'name2']}
              options={updateData}
              allowClear
              // SEARCHABLE
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={4}>
            <Field.DatePicker
              label='เริ่มต้น'
              name='start_date'
              placeholder='วันที่'
              format={'DD MMMM BBBB'}
              hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={4}>
            <Field.DatePicker
              label='สิ้นสุด'
              name='end_date'
              placeholder='วันที่'
              format={'DD MMMM BBBB'}
              hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={4}>
            <Field.Select
              label='รหัสสายทาง'
              name='way_id'
              placeholder='รหัสสายทาง'
              optKeys={['id', 'way_code']}
              options={allWay.all}
              allowClear
              // SEARCHABLE
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={4}>
            <Field.Select
              label='ร่วมบูรณาการ'
              name='collaboration'
              placeholder='ร่วมบูรณาการ'
              optKeys={['colname', 'colname']}
              options={collaborateList.data}
              allowClear
              // SEARCHABLE
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              hideRequired
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={2}>
            <fieldset>
              <label>&nbsp;</label>
              <Button
                htmlType='submit'
                type='primary'
                size='large'
                icon={<SearchOutlined />}
                // className='!w-full 2xl:!w-auto'
                className='!w-full'
              >
                ค้นหา
              </Button>
            </fieldset>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={2}>
            <fieldset>
              <label>&nbsp;</label>
              <Button
                htmlType='button'
                type='text'
                size='large'
                // className='!w-full 2xl:!w-auto'
                className='!w-full'
                onClick={() => handlerClear()}
              >
                ล้างการค้นหา
              </Button>
            </fieldset>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default React.memo(FormSearchCollaborate)
