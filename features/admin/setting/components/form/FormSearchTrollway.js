import React, { useCallback } from "react";
import { Form, Field, useForm } from "@/components/form";
import { Button, Col, Row, Typography } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

const FormSearchTrollway = (props) => {
  const {} = props;

  const form = useForm({
    initialValues: {
      report_name: "",
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
      <Typography>ค้นหา</Typography>
      <Row gutter={[30, 16]} align={"middle"}>
        <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={4}>
          <Field.Input label="ชื่อรายงาน" name="report_name" />
        </Col>
        <Col xs={24} sm={24} md={6} lg={4} xl={4} xxl={2}>
          <Button
            icon={<SearchOutlined />}
            size="large"
            className="!w-full lg:!w-auto"
            htmlType="submit"
            type="primary"
          >
            ค้นหา
          </Button>
        </Col>
        <Col xs={24} sm={24} md={6} lg={4} xl={4} xxl={2}>
          <Typography.Text
            className="!cursor-pointer !block !text-center md:!text-start !text-white"
            type="success"
          >
            ล้างข้อมูล
          </Typography.Text>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={10}
          xl={10}
          xxl={16}
          className="lg:text-end"
        >
          <Button
            icon={<PlusOutlined />}
            size="large"
            className="!w-full lg:!w-auto"
            type="primary"
          >
            เพิ่มข้อมูล
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default React.memo(FormSearchTrollway);
