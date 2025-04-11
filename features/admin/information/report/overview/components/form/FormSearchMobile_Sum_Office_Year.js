import React, { useCallback, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Button, Card, Col, Row, Typography } from "antd";
import { Form, Field, useForm } from "@/components/form";
import { SearchOutlined } from "@ant-design/icons";
import config from "@/config";

const FormSearchMobile_Sum_Office_Year = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {},
    rules: {},
  });

  const buildValue = useCallback((values, next) => {
    next(values);
  }, []);

  const handlerSubmit = useCallback(async (values) => {
    const { plan_year } = values;

    const requestUrl = `${config.hostBackend}/api/v1/reports/mobile_sum_office_year?year_type=be_year&plan_year=${plan_year}&file_type=pdf&option=cumulative`;
    setLoading(true);

    try {
      const response = await fetch(requestUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setFileUrl(requestUrl);
    } catch (error) {
      console.error("Fetch error:", error);
      setFileUrl(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Card>
        <Typography.Title level={5}>ค้นหา</Typography.Title>
        <Form form={form} handlerSubmit={[buildValue, handlerSubmit]}>
          <Row gutter={[16, 16]} align={"middle"}>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={4}>
              <Field.Input
                label="ระบุปี"
                name="plan_year"
                placeholder=""
                hideRequired
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={2}>
              <fieldset>
                <label>&nbsp;</label>
                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  icon={<SearchOutlined />}
                  className="!w-full"
                  loading={loading}
                >
                  ค้นหา
                </Button>
              </fieldset>
            </Col>
          </Row>
        </Form>
      </Card>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        {fileUrl ? (
          <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
        ) : (
          ""
        )}
      </Worker>
    </>
  );
};

export default React.memo(FormSearchMobile_Sum_Office_Year);
