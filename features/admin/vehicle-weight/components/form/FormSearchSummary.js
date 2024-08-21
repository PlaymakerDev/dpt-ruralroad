import React, { useCallback } from "react";
import { Form, Field, useForm } from "@/components/form";
import { Button, Card, Col, Row, Typography } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

const FormSearchSummary = (props) => {
  const { setOpen } = props;

  const form = useForm({
    initialValues: {
      date: '',
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
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={4}>
            <Field.DatePicker
              label='วันที่'
              name='date'
              placeholder='วันที่'
              hideRequired
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={2}>
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
          <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={2}>
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

export default React.memo(FormSearchSummary);
