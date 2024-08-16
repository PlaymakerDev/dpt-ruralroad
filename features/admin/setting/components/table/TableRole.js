import React from "react";
import { Table, Pagination, ConfigProvider, Row, Col, Card } from "antd";

const TableRole = (props) => {
  const {} = props;

  return (
    <ConfigProvider>
      <Row gutter={[30, 16]} align={"middle"}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Card />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Card />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Card />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Card />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Card />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Card />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Card />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Card />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Card />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Card />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Card />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Card />
        </Col>
        <div>
          <Pagination
            align="center"
            style={{ margin: 20 }}
            defaultCurrent={1}
            total={50}
          />
        </div>
      </Row>
    </ConfigProvider>
  );
};
export default React.memo(TableRole);
