import React, { useCallback, useContext } from "react";
import { Form, Field, useForm } from "@/components/form";
import { Button, Card, Col, Row, Typography } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useRouter } from 'next/router';
import { FormSearchNew } from "../../screen";

const FormSearchSummary = (props) => {
  const { initialValues, apiGetData, clearData } = props;
  const { setFormSearch } = useContext(FormSearchNew);
  const { query } = useRouter();
  const router = useRouter();
  
  const form = useForm({
    initialValues: {
      start_date: query.start_date ? dayjs(query.start_date, 'YYYY-MM-DD') : dayjs().startOf('month'),
      end_date: query.end_date ? dayjs(query.end_date, 'YYYY-MM-DD') : dayjs(),
    },
    rules: {},
  });

  const { handlerReset, handlerChange } = form

  const buildValue = useCallback((values, next) => {
    const body = {
      start_date: values.start_date ? dayjs(values.start_date).format('YYYY-MM-DD') : '',
      end_date: values.end_date ? dayjs(values.end_date).format('YYYY-MM-DD') : '',
    }
    next(body);
  }, []);

  const handlerSubmit = useCallback((values) => {
    setFormSearch({
      type: 'summary' ,...values
    });

    apiGetData(`/api/v1/weight/sum_daily`, {
      ...values,
      page: 1,
      page_size: initialValues.page_size,
      ordering: 'ASC'
    }, false, {})
  }, [initialValues, apiGetData, setFormSearch]);

  const handlerClear = useCallback(() => {
    handlerChange({
      start_date: dayjs().startOf('month'),
      end_date: dayjs(),
    })
    clearData()
    router.replace({});
  }, [handlerChange, clearData])

  return (
    <Card>
      <Typography.Title level={5}>ค้นหา</Typography.Title>
      <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
        <Row gutter={[16, 16]} align={'middle'}>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={4}>
            <Field.DatePicker
              label='จากวันที่'
              name='start_date'
              placeholder='จากวันที่'
              format={'DD MMMM BBBB'}
              hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={4}>
            <Field.DatePicker
              label='ถึงวันที่'
              name='end_date'
              placeholder='ถึงวันที่'
              format={'DD MMMM BBBB'}
              hideRequired
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={2}>
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
          <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={2}>
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

export default React.memo(FormSearchSummary);
