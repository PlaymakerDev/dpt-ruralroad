import React, { useCallback } from "react";
import { Form, Field, useForm } from "@/components/form";
import { Button, Card, Col, Row, Typography } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

const FormSearchUser = (props) => {
  const { getUserList, clearData } = props;

  const form = useForm({
    initialValues: {
      username: '',
    },
    rules: {
      username: {
        required: 'required_ldap_username'
      }
    },
  });

  const { handlerChange, errors } = form

  const buildValue = useCallback((values, next) => {
    const body = {
      search: values.username
    }
    next(body);
  }, []);

  const handlerSubmit = useCallback((values) => {
    getUserList(values)
  }, [getUserList]);

  const handlerClear = useCallback(() => {
    handlerChange({
      username: ''
    })
    clearData()
  }, [handlerChange, clearData])

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
              hideRequired={!errors.username}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={4}>
            <fieldset>
              {!errors.username &&
                <label>&nbsp;</label>
              }
              <Button
                htmlType="submit"
                type='primary'
                size='large'
                icon={<SearchOutlined />}
                // className='!w-full 2xl:!w-auto'
                className='!w-full !bg-[#5671EE] hover:!bg-[#6c87ff] duration-200'
              >
                ค้นหา
              </Button>
            </fieldset>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={4}>
            <fieldset>
              {!errors.username &&
                <label>&nbsp;</label>
              }
              <Button
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
      {/* <Typography.Text className="!text-[#FF4A4A]">**กรุณาค้นหาด้วยชื่อ หรือ Username</Typography.Text> */}
    </>
  );
};

export default React.memo(FormSearchUser);
