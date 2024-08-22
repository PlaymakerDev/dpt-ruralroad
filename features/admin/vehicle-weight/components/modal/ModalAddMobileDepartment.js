import React, { useCallback } from "react";
import { Modal, Row, Col } from "antd";
import { Form, Field, useForm } from "@/components/form";

const Content = (props) => {
  const { } = props;

  const form = useForm({
    initialValues: {
      route: '',
      from_km: '',
      to_km: '',
      collaboration: '',
      create_date: '',
      start_time: '',
      end_time: ''
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
    <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Field.Select
            label="ข้อมูลสายทาง"
            name="route"
            placeholder="ข้อมูลสายทาง"
            optKeys={['value', 'label']}
            options={[]}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
          <Field.Input
            label="เริ่ม กม. ที่"
            name="from_km"
            placeholder="เริ่ม กม. ที่"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
          <Field.Input
            label="ถึง กม. ที่"
            name="to_km"
            placeholder="ถึง กม. ที่"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
          <Field.Select
            label="ร่วมบูรณาการ"
            name="collaboration"
            placeholder="ร่วมบูรณาการ"
            optKeys={['value', 'label']}
            options={[]}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
          <Field.DatePicker
            label="วันที่จัดตั้ง"
            name="create_date"
            placeholder="วันที่จัดตั้ง"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
          <Field.DatePicker
            label="เวลาเริ่ม"
            name="start_time"
            placeholder="เวลาเริ่ม"
            type
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
          <Field.DatePicker
            label="เวลาสิ้นสุด"
            name="end_time"
            placeholder="เวลาสิ้นสุด"
          />
        </Col>
      </Row>
    </Form>
  );
};

const ModalAddMobileDepartment = (props) => {
  const { open, setOpen } = props;

  return (
    <Modal
      title="เพิ่มข้อมูลจัดตั้งหน่วยเคลื่อนที่"
      open={open}
      destroyOnClose
      onCancel={() => setOpen({ open: false })}
      width={700}
      okText='บันทึก'
      cancelText='ยกเลิก'
      okButtonProps={{
        htmlType: 'submit',
        type: 'primary',
        size: 'large'
      }}
      cancelButtonProps={{
        htmlType: 'button',
        type: 'text',
        size: 'large'
      }}
    >
      <main className='my-5'>
        <Content />
      </main>
    </Modal>
  );
};

export default React.memo(ModalAddMobileDepartment);
