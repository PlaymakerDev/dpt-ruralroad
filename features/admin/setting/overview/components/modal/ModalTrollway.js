import React, { useCallback } from "react";
import { Modal, Row, Col } from "antd";
import { Form, Field, useForm } from "@/components/form";

const Content = (props) => {
  const { } = props;

  const form = useForm({
    initialValues: {
      trollway_code: '',
      trollway_name: '',
      province: '',
      district: '',
      sub_district: '',
      department: '',
      distance: '',
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
        <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
          <Field.Input
            label="รหัสสายทาง"
            name="trollway_code"
            placeholder="รหัสสายทาง"
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={16} xl={16} xxl={16}>
          <Field.Input
            label="ชื่อสายทาง"
            name="trollway_name"
            placeholder="ชื่อสายทาง"
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
          <Field.Select
            label="จังหวัด"
            name="province"
            placeholder="จังหวัด"
            optKeys={['value', 'label']}
            options={[]}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
          <Field.Select
            label="ตำบล"
            name="province"
            placeholder="ตำบล"
            optKeys={['value', 'label']}
            options={[]}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
          <Field.Select
            label="อำเภอ"
            name="province"
            placeholder="อำเภอ"
            optKeys={['value', 'label']}
            options={[]}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={16} xl={16} xxl={16}>
          <Field.Select
            label="หน่วยงาน"
            name="department"
            placeholder="หน่วยงาน"
            optKeys={['value', 'label']}
            options={[]}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
          <Field.Input
            label="ระยะทาง"
            name="distance"
            placeholder="ระยะทาง"
          />
        </Col>
      </Row>
    </Form>
  );
};

const ModalTrollway = (props) => {
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

export default React.memo(ModalTrollway);
