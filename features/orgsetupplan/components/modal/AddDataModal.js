import React from 'react';
import { Col, Row } from 'antd';
import { Form, Field, useForm } from '@/components/form';

const AddDataModal = () => {
  const form = useForm({
    initialValues: {
      TestDefaultValue: 0,
      Route: '1124',
      October: 0,
      November: 0,
      December: 0,
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0
    },
    rules: {}
  });
  const MonthData = [
    { th: 'ตุลาคม', en: 'October' },
    { th: 'พฤศจิกายน', en: 'November' },
    { th: 'ธันวาคม', en: 'December' },
    { th: 'มกราคม', en: 'January' },
    { th: 'กุมภาพันธ์', en: 'February' },
    { th: 'มีนาคม', en: 'March' },
    { th: 'เมษายน', en: 'April' },
    { th: 'พฤษภาคม', en: 'May' },
    { th: 'มิถุนายน', en: 'June' },
    { th: 'กรกฎาคม', en: 'July' },
    { th: 'สิงหาคม', en: 'August' },
    { th: 'กันยายน', en: 'September' }
  ];
  

  const RouteData = [{
    value: '1124',
    label: 'Route A'
  }, {
    value: '1123',
    label: 'Route B'
  }];

  return (
    <Form form={form}>
      <Row gutter={[0, 0]} align={'middle'}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Field.Input
            label={'ปีงบประมาณ'}
            name='TestDefaultValue'
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Field.Select
            label={'ข้อมูลสายทาง'}
            name='Route'
            options={RouteData}
          />
        </Col>
      </Row>
      <Row gutter={[8, 8]} align={'middle'}>
        {MonthData.map((month, index) => (
          <Col xs={6} sm={4} md={4} lg={4} xl={4} xxl={4} key={index}>
            <Field.Input
              label={month.th}
              name={month.en}
              value={0}
            />
          </Col>
        ))}
      </Row>
    </Form>
  );
};

export default AddDataModal;
