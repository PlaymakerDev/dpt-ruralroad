import React, { useCallback } from "react";
import { Modal, Row, Col } from "antd";
import { Form, Field, useForm } from "@/components/form";

const Content = (props) => {
  const { } = props;

  const form = useForm({
    initialValues: {
      username: '',
      prefix: '',
      first_name: '',
      last_name: '',
      department: '',
      permission: '',
      position: '',
      role: ''
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
      <section>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Field.Input
              label='Username'
              name='username'
              placeholder='Username'
            />
          </Col>
        </Row>
      </section>
      <section className="mt-3">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Field.Input
              label='คำนำหน้า'
              name='prefix'
              placeholder='คำนำหน้า'
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Field.Input
              label='ชื่อ'
              name='first_name'
              placeholder='ชื่อ'
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Field.Input
              label='นามสกุล'
              name='last_name'
              placeholder='นามสกุล'
            />
          </Col>
          <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
            <Field.Select
              label='หน่วยงาน'
              name='department'
              placeholder='หน่วยงาน'
              optKeys={['value', 'label']}
              options={[]}
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Field.Select
              label='สิทธิ์การเข้าใช้งาน'
              name='permisison'
              placeholder='สิทธิ์การเข้าใช้งาน'
              optKeys={['value', 'label']}
              options={[]}
            />
          </Col>
          <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
            <Field.Select
              label='ตำแหน่ง'
              name='position'
              placeholder='ตำแหน่ง'
              optKeys={['value', 'label']}
              options={[]}
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <Field.Select
              label='หน้าที่'
              name='role'
              placeholder='หน้าที่'
              optKeys={['value', 'label']}
              options={[]}
            />
          </Col>
        </Row>
      </section>
    </Form>
  );
};

const ModalUser = (props) => {
  const { open, setOpen } = props;

  return (
    <Modal
      title="เพิ่มข้อมูลผู้ใช้งาน"
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

export default React.memo(ModalUser);
