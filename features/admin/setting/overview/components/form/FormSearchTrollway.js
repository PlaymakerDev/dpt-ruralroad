import React, { useCallback } from "react";
import { Form, Field, useForm } from "@/components/form";
import { Button, Card, Col, Row, Typography } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

const FormSearchTrollway = (props) => {
  const { setOpen, handlerSearch, masterProvince } = props;

  console.log('masterProvince ',masterProvince)

  const form = useForm({
    initialValues: {
      way_id: '',
    },
    rules: {},
  });

  const buildValue = useCallback((values, next) => {
    next(values);
  }, []);

  const handlerSubmit = useCallback((values) => {
    handlerSearch(values)
  }, [handlerSearch]);

  const { setValues } = form

  return (
    <Card>
      <Typography.Title level={5}>ค้นหา</Typography.Title>
      <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
        <Row gutter={[16, 16]} align={'middle'}>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={4}>
            <Field.Input
              label='รหัสสายทาง'
              name='way_id'
              placeholder='รหัสสายทาง'
              hideRequired
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={4}>
            {/* <Field.Input
              label='จังหวัด'
              name='province'
              placeholder=''
              hideRequired
            /> */}
            <Field.Select
              label="จังหวัด"
              name="province"
              placeholder="จังหวัด"
              optKeys={['name_th', 'name_th']}
              options={masterProvince || []}
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={4} xxl={2}>
            <fieldset>
              <label>&nbsp;</label>
              <Button
                type='primary'
                size='large'
                htmlType="submit"
                icon={<SearchOutlined />}
                // className='!w-full 2xl:!w-auto'
                className='!w-full'
              >
                ค้นหา
              </Button>
            </fieldset>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={4} xxl={2}>
            <fieldset>
              <label>&nbsp;</label>
              <Button
                type='text'
                size='large'
                onClick={() => {
                  setValues({
                    way_id: null,
                    province: null,
                  })
                  handlerSubmit({
                    way_id: null,
                    province: null
                  })
                }}
                // className='!w-full 2xl:!w-auto'
                className='!w-full'
              >
                ล้างการค้นหา
              </Button>
            </fieldset>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={4} xxl={12} className='lg:!text-right'>
            <fieldset>
              <label className='block'>&nbsp;</label>
              <Button
                type='primary'
                size='large'
                icon={<PlusOutlined />}
                className='!w-full xl:!w-auto'
                onClick={() => setOpen({ open: true, type: 'create', data: {} })}
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

export default React.memo(FormSearchTrollway);
