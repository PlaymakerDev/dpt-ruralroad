import React, { useCallback } from "react";

import { Modal, Row, Col } from "antd";
import { Form, Field, useForm } from "@/components/form";

const Content = (props) => {
  const {} = props;

  const form = useForm({
    initialValues: {
      report_role: "",
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
      <Row gutter={[30, 16]} align={"middle"}>
        <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={4}>
          <Field.Input label="ตำแหน่งงาน" name="report_role" />
        </Col>
      </Row>
    </Form>
  );
};

const ModalRole = (props) => {
  const { open, setOpen } = props;

  return (
    <Modal
      title="เพิ่มข้อมูล"
      open={open}
      destroyOnClose
      onCancel={() => setOpen(false)}
      width={1400}
      footer={false}
    >
      <main className="my-5">
        <Content />
      </main>
    </Modal>
  );
};

export default React.memo(ModalRole);
