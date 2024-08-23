import React, { useCallback } from "react";
import { Form, Field, useForm } from "@/components/form";
import { Button, Card, Col, Row, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const FormSearchStation = (props) => {
  const { } = props;

  const form = useForm({
    initialValues: {
      from_date: '',
      to_date: '',
      station: ''
    },
    rules: {},
  });

  const buildValue = useCallback((values, next) => {
    next(values);
  }, []);

  const handlerSubmit = useCallback((values) => {
    console.log(values);
  }, []);

  return (
    <Card>
      <Typography.Title level={5}>ค้นหา</Typography.Title>
      <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
        <Row gutter={[16, 16]} align={'middle'}>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={4}>
            <Field.DatePicker
              label='จากวันที่'
              name='from_date'
              placeholder='จากวันที่'
              hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={4}>
            <Field.DatePicker
              label='ถึงวันที่'
              name='to_date'
              placeholder='จากวันที่'
              hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={6} xxl={4}>
            <Field.Select
              label='สถานี'
              name='station'
              placeholder='สถานี'
              optKeys={['value', 'label']}
              options={[]}
              hideRequired
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={3} xxl={2}>
            <fieldset>
              <label>&nbsp;</label>
              <Button
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
                type='text'
                size='large'
                className='!w-full'
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

export default React.memo(FormSearchStation);
