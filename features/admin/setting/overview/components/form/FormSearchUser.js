import React, { useCallback } from "react";
import { Form, Field, useForm } from "@/components/form";
import { Button, Card, Col, Row, Typography } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const FormSearchUser = (props) => {
  const { initialValues, apiGetData, clearData } = props;
  const router = useRouter()

  const form = useForm({
    initialValues: {
      user: '',
    },
    rules: {},
  });

  const { handlerChange } = form

  const buildValue = useCallback((values, next) => {
    const body = {
      search: values.user || ''
    }
    next(body);
  }, []);

  const handlerSubmit = useCallback((values) => {
    apiGetData(`/api/v1/users`, { ...values, page: 1, page_size: initialValues.page_size }, false, {})
  }, [initialValues, apiGetData]);

  const handlerClear = useCallback(() => {
    handlerChange({
      user: ''
    })
    clearData()
  }, [handlerChange, clearData])

  return (
    <Card>
      <Typography.Title level={5}>ค้นหา</Typography.Title>
      <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
        <Row gutter={[16, 16]} align={'middle'}>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={4}>
            <Field.Input
              label='ชื่อผู้ใช้งาน'
              name='user'
              placeholder='ชื่อผู้ใช้งาน'
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
                // className='!w-full 2xl:!w-auto'
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
                // className='!w-full 2xl:!w-auto'
                className='!w-full'
                onClick={() => handlerClear()}
              >
                ล้างการค้นหา
              </Button>
            </fieldset>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={16} className='lg:!text-right'>
            <fieldset>
              <label className='block'>&nbsp;</label>
              <Button
                type='primary'
                size='large'
                icon={<PlusOutlined />}
                className='!w-full lg:!w-auto'
                onClick={() => router.push('/admin/setting/create')}
              >
                เพิ่มข้อมูล
              </Button>
            </fieldset>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default React.memo(FormSearchUser);
