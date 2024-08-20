import React from "react";
import { FormSearchRole } from "../form";
import { TableRole } from "../table";
import { Col, Row } from "antd";

const Role = (props) => {
  const { setOpen } = props;

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <FormSearchRole />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <TableRole setOpen={setOpen} />
      </Col>
    </Row>
  );
};

export default React.memo(Role);
