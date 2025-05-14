import React, { useCallback, useContext} from "react";
import { Form, Field, useForm } from "@/components/form";
import { Button, Card, Col, Row, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getStationType, getStation } from "@/store/features/masterSlice";
import { DateContext } from "../tab-content/WIMWeighingUnit";

const FormSearchWIM = (props) => {
  const { initialValues, apiGetData, clearData, wim, dateRange } = props;
  const { setDateRange } = useContext(DateContext)
  const form = useForm({
    initialValues: {
      start_date: dayjs(dateRange[0]),
      end_date: dayjs(dateRange[1]),
      station_id: ''
    },
    rules: {},
  });

  const { handlerReset, handlerChange } = form

  const buildValue = useCallback((values, next) => {
    const body = {
      start_date: values.start_date ? dayjs(values.start_date).format('YYYY-MM-DD') : '',
      end_date: values.end_date ? dayjs(values.end_date).format('YYYY-MM-DD') : '',
      station_id: values.station_id,
    }
    next(body);
  }, []);

  const handlerSubmit = useCallback((values) => {
    setDateRange([values.start_date, values.end_date])
    apiGetData(`/api/v1/weight/wim_daily`, { ...values, page: 1, page_size: initialValues.page_size }, false, {})
  }, [initialValues, apiGetData, setDateRange]);

  const handlerClear = useCallback(() => {
    handlerChange({
      start_date: dayjs().startOf('month'),
      end_date: dayjs(),
      station_id: ''
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
          <Col xs={24} sm={24} md={24} lg={24} xl={6} xxl={4}>
            <Field.Select
              label='สถานี'
              name='station_id'
              placeholder='ทั้งหมด'
              optKeys={['station_id', 'station_name']}
              options={wim.all}
              allowClear
              // SEARCHABLE
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
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
  );
};

export default React.memo(FormSearchWIM);
