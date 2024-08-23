import React, { useCallback } from "react";
import { Modal, Row, Col } from "antd";
import { Form, Field, useForm } from "@/components/form";

const Content = (props) => {
  const { } = props;

  const form = useForm({
    initialValues: {
      yearly_budget: '',
      route: '',
      october: '0',
      november: '0',
      december: '0',
      january: '0',
      february: '0',
      march: '0',
      april: '0',
      may: '0',
      june: '0',
      july: '0',
      august: '0',
      september: '0',
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
          <Field.Input
            label="ปีงบประมาณ"
            name="yearly_budgest"
            placeholder="ปีงบประมาณ"
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Field.Select
            label="ข้อมูลสายทาง"
            name="route"
            placeholder="ข้อมูลสายทาง"
            optKeys={['value', 'label']}
            options={[]}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={4}>
          <Field.Input
            label="ตุลาคม"
            name="october"
            placeholder="ตุลาคม"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={4}>
          <Field.Input
            label="พฤศจิกายน"
            name="november"
            placeholder="พฤศจิกายน"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={4}>
          <Field.Input
            label="ธันวาคม"
            name="december"
            placeholder="ธันวาคม"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={4}>
          <Field.Input
            label="มกราคม"
            name="january"
            placeholder="มกราคม"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={4}>
          <Field.Input
            label="กุมภาพันธ์"
            name="february"
            placeholder="กุมภาพันธ์"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={4}>
          <Field.Input
            label="มีนาคม"
            name="march"
            placeholder="มีนาคม"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={4}>
          <Field.Input
            label="เมษายน"
            name="april"
            placeholder="เมษายน"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={4}>
          <Field.Input
            label="พฤษภาคม"
            name="may"
            placeholder="พฤษภาคม"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={4}>
          <Field.Input
            label="มิถุนายน"
            name="june"
            placeholder="มิถุนายน"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={4}>
          <Field.Input
            label="กรกฎาคม"
            name="july"
            placeholder="กรกฎาคม"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={4}>
          <Field.Input
            label="สิงหาคม"
            name="august"
            placeholder="สิงหาคม"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={4}>
          <Field.Input
            label="กันยายน"
            name="september"
            placeholder="กันยายน"
          />
        </Col>
      
      </Row>
    </Form>
  );
};

const ModalAddEstablishUnit = (props) => {
  const { open, setOpen } = props;

  return (
    <Modal
      title="เพิ่มข้อมูล"
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

export default React.memo(ModalAddEstablishUnit);
