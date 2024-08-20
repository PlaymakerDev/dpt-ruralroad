import React, { useCallback } from "react";
import { Form, Field, useForm } from "@/components/form";
import { Button, Card, Col, Row, Typography } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

const FormSearchUser = (props) => {
  const { } = props;

  const form = useForm({
    initialValues: {
      username: '',
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
    <>
      <Typography.Title level={5}>ค้นหาผู้ใช้งาน</Typography.Title>
      <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
        <Row gutter={[16, 16]} align={'middle'}>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={10}>
            <Field.Input
              label='ชื่อผู้ใช้งาน'
              name='username'
              placeholder='ชื่อผู้ใช้งาน'
              hideRequired
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={4}>
            <fieldset>
              <label>&nbsp;</label>
              <Button
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
          <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={4}>
            <fieldset>
              <label>&nbsp;</label>
              <Button
                type='text'
                size='large'
                // className='!w-full 2xl:!w-auto'
                className='!w-full'
              >
                ล้างการค้นหา
              </Button>
            </fieldset>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default React.memo(FormSearchUser);
