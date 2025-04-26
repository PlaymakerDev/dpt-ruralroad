import React, { useCallback, useContext } from "react";
import { Form, Field, useForm } from "@/components/form";
import { Button, Card, Col, Row, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getStationType, getStation } from "@/store/features/masterSlice";
// import { DateContext } from "../tab-content/WIMWeighingUnit";

const FormSearchWIMDetail = (props) => {
  const { initialValues, apiGetData, stationId, clearData } = props

  const form = useForm({
    initialValues: {
      start_date: dayjs(),
      end_date: dayjs(),
    },
    rules: {}
  })

  const { handlerChange } = form

  const buildValue = useCallback((values, next) => {
    const body = {
      start_date: values.start_date ? dayjs(values.start_date).format('YYYY-MM-DD') : '',
      end_date: values.end_date ? dayjs(values.end_date).format('YYYY-MM-DD') : '',
      station: stationId || '',
    }
    next(body)
  }, [stationId])

  const handlerSubmit = useCallback((values) => {
    apiGetData(`/api/v1/weight/weight_wim_log`, { ...values, page: 1, page_size: initialValues.page_size }, false, {})
  }, [])

  const handlerClear = useCallback(() => {
    handlerChange({
      start_date: dayjs(),
      end_date: dayjs(),
    })
    clearData()
  }, [handlerChange, clearData])

  return (
    <Card>
      <Typography.Title level={5}>ค้นหา</Typography.Title>
      <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
        <Row gutter={[16, 16]} align={'middle'}>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={4}>
            <Field.DatePicker
              label='จากวันที่'
              name='start_date'
              placeholder='จากวันที่'
              format={'DD MMMM BBBB'}
              hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={4}>
            <Field.DatePicker
              label='ถึงวันที่'
              name='end_date'
              placeholder='ถึงวันที่'
              format={'DD MMMM BBBB'}
              hideRequired
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={3} xxl={2}>
            <fieldset>
              <label>&nbsp;</label>
              <Button
                htmlType="submit"
                type='primary'
                size='large'
                icon={<SearchOutlined />}
                className='!w-full'
              >
                ค้นหา
              </Button>
            </fieldset>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={3} xxl={2}>
            <fieldset>
              <label>&nbsp;</label>
              <Button
                htmlType="button"
                type='text'
                size='large'
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

export default React.memo(FormSearchWIMDetail)
