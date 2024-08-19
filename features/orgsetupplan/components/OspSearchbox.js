import React, { useState, useCallback } from 'react';
import { Typography, Row, Col, Button, Modal } from 'antd';
import '../style/opssearch.module.css'; // Import the CSS file
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Field, useForm } from '@/components/form'
import AddDataModal from './modal/AddDataModal';


const OspSearchbox = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const currentYear = new Date().getFullYear();
  const yearsOption = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
  ];
  const team = Array.from({ length: 10 }, (_, i) => i + 1);

  const form = useForm({
    initialValues: {
      financial_year: '',
      agency: '',
    },
    rules: {},
  });

  const buildValue = useCallback((values, next) => {
    next(values);
  }, []);

  const handlerSubmit = useCallback((values) => {
    console.log(values);
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  console.log(yearsOption);
  return (
    <section className='w-full bg-gradient border border-lightblue rounded-lg mt-4 p-2 pt-8 px-8'>
      <Typography.Title level={4}>
        ค้นหา
      </Typography.Title>
      <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
        <Row gutter={[30, 16]} align={'middle'}>
          <Col xs={24} sm={24} md={8} lg={6} xl={6} xxl={6}>
            <Field.Select
              label='ปีงบประมาณ'
              name='financial_year'
              // options={yearsOption}
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={6} xl={6} xxl={6}>
            <Field.Select
              label='หน่วยงาน'
              name='agency'
            />
          </Col>
          <Col xs={24} sm={24} md={4} lg={4} xl={2} xxl={2}>
            <Button
              icon={<SearchOutlined />}
              size='large'
              className='!w-full lg:!w-auto'
              htmlType='submit'
              type='primary'
            >
              ค้นหา
            </Button>
          </Col>
          <Col xs={24} sm={24} md={4} lg={4} xl={2} xxl={2}>
            <Typography.Text
              className='!cursor-pointer !block !text-center md:!text-start'
              type='success'
            >
              ล้างข้อมูล
            </Typography.Text>
          </Col>
          <Col xs={24} sm={24} md={24} lg={4} xl={8} xxl={8} className='lg:text-end'>
            <Button
              icon={<PlusOutlined />}
              size='large'
              className='!w-full lg:!w-auto'
              type='primary'
              onClick={showModal}
            >
              เพิ่มข้อมูล
            </Button>
          </Col>
        </Row>
      </Form>

      <Modal
        title="เพิ่มข้อมูล"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <AddDataModal/>
      </Modal>
    </section>
  );
};

export default OspSearchbox;
