import React from "react";
import { Modal, Row, Col, Card, Typography } from "antd";
import {
  InfoCircleOutlined,
  TruckOutlined,
  CheckCircleOutlined,
  InboxOutlined,
  FieldNumberOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import BigTruck from "@/public/images/big-truck.svg";
import Optimus from "@/public/images/optimus.svg"
import Optimusli from "@/public/images/optimusli.svg"

const Content = (props) => {
  const {} = props;
  return (
    <Row gutter={[30, 16]} align={"middle"}>
      <Col
        xs={24}
        sm={24}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        className="text-left"
      >
        <Typography.Text className="text-base">
          สถานี นครศรีธรรมราช
        </Typography.Text>
      </Col>
      <Col
        xs={24}
        sm={24}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        className="text-right"
      >
        <Typography.Text className="text-base">
          13 ธันวาคม 2567 16:31:53
        </Typography.Text>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
        <Row gutter={[30, 16]} align={"middle"}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Card>
              <div className="flex justify-between items-center pl-20 pr-20">
                <div className="flex flex-col items-center">
                  <Typography.Text className="text-lg">
                    ทะเบียนหัวลาก
                  </Typography.Text>
                  <Typography.Text className="text-lg">65-3535</Typography.Text>
                </div>
                <div className="flex flex-col items-center">
                  <Typography.Text className="text-lg">จังหวัด</Typography.Text>
                  <Typography.Text className="text-lg">
                    พระนครศรีอยุธยา
                  </Typography.Text>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
            <Card>
              <div className="flex flex-col items-center">
                <InfoCircleOutlined className="text-3xl" />
                <Typography.Text className="text-base p-2">
                  น้ำหนักที่ชั่งได้
                </Typography.Text>
                <Typography.Text className="text-xl font-bold">
                  35.5 ตัน
                </Typography.Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
            <Card>
              <div className="flex flex-col items-center">
                <InfoCircleOutlined className="text-3xl" />
                <Typography.Text className="text-base p-2">
                  กฏหมายกำหนด
                </Typography.Text>
                <Typography.Text className="text-xl font-bold">
                  50.5 ตัน
                </Typography.Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
            <Card>
              <div className="flex flex-col items-center">
                <InfoCircleOutlined className="text-3xl" />
                <Typography.Text className="text-base p-2">
                  น้ำหนักที่เกิน
                </Typography.Text>
                <Typography.Text className="text-xl font-bold text-red-600">
                  10 ตัน
                </Typography.Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
            <Card>
              <div className="flex flex-col items-center">
                <TruckOutlined className="text-3xl" />
                <Typography.Text className="text-base p-2">
                  ประเภท
                </Typography.Text>
                <Typography.Text className="text-xl font-bold">
                  20
                </Typography.Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
            <Card>
              <div className="flex flex-col items-center">
                <CheckCircleOutlined className="text-3xl" />
                <Typography.Text className="text-base p-2">
                  สถานะเข้าชั่ง
                </Typography.Text>
                <Typography.Text className="text-xl font-bold">
                  น้ำหนักปกติ
                </Typography.Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
            <Card>
              <div className="flex flex-col items-center">
                <InboxOutlined className="text-3xl" />
                <Typography.Text className="text-base p-2">
                  เพลาที่เกิน
                </Typography.Text>
                <Typography.Text className="text-xl font-bold">
                  00
                </Typography.Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
            <Card>
              <div className="flex flex-col items-center">
                <CheckCircleOutlined className="text-3xl" />
                <Typography.Text className="text-base p-2">
                  สถานะเพลา
                </Typography.Text>
                <Typography.Text className="text-xl font-bold">
                  ไม่เกินพิกัด
                </Typography.Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
            <Card>
              <div className="flex flex-col items-center">
                <FieldNumberOutlined className="text-3xl" />
                <Typography.Text className="text-base p-2">
                  REF No.
                </Typography.Text>
                <Typography.Text className="text-xl font-bold">
                  04-459106
                </Typography.Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
            <Card>
              <div className="flex flex-col items-center">
                <FieldNumberOutlined className="text-3xl" />
                <Typography.Text className="text-base p-2">
                  SEQ No.
                </Typography.Text>
                <Typography.Text className="text-xl font-bold">
                  -
                </Typography.Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
            <Card>
              <div className="flex flex-col items-center">
                <InboxOutlined className="text-3xl" />
                <Typography.Text className="text-base p-2">
                  ESAL
                </Typography.Text>
                <Typography.Text className="text-xl font-bold">
                  //
                </Typography.Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
            <Card>
              <div className="flex flex-col items-center">
                <FieldNumberOutlined className="text-3xl" />
                <Typography.Text className="text-base p-2">
                  Lane
                </Typography.Text>
                <Typography.Text className="text-xl font-bold">
                  --
                </Typography.Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
            <Card>
              <div className="flex flex-col items-center">
                <DashboardOutlined className="text-3xl" />
                <Typography.Text className="text-base p-2">
                  ความเร็ว
                </Typography.Text>
                <Typography.Text className="text-xl font-bold">
                  --
                </Typography.Text>
              </div>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
        <Row gutter={[30, 16]} align={"middle"}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Image src={BigTruck} alt="" />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
            xxl={24}
            className="flex justify-center"
          >
            <Card className="w-full max-w-4xl">
              <div className="flex justify-center space-x-4">
                {/* Section 1 */}
                <div className="flex flex-col items-center">
                  <Typography.Text className="text-xl p-2">
                    Front Overhang
                  </Typography.Text>
                  <Typography.Text className="text-xl font-bold">
                    --
                  </Typography.Text>
                </div>

                {/* Section 2 */}
                <div className="flex flex-col items-center">
                  <Typography.Text className="text-xl p-2">
                    Rear Overhang
                  </Typography.Text>
                  <Typography.Text className="text-xl font-bold">
                    --
                  </Typography.Text>
                </div>

                {/* Section 3 */}
                <div className="flex flex-col items-center">
                  <Typography.Text className="text-xl p-2">
                    Length
                  </Typography.Text>
                  <Typography.Text className="text-xl font-bold">
                    --
                  </Typography.Text>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Card></Card>
          </Col>
        </Row>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Image src={Optimus} alt="Optimus" className="!w-full !h-full"/>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Image src={Optimusli} alt="Optimusli" className="!w-full !h-full" />
      </Col>
    </Row>
  );
};

const WimModal = (props) => {
  const { open, setOpen } = props;

  return (
    <Modal
      title="รายละเอียดรถบรรทุก"
      open={open}
      destroyOnClose
      onCancel={() => setOpen(false)}
      width={1600}
      footer={false}
    >
      <main className="my-5">
        <Content />
      </main>
    </Modal>
  );
};

export default React.memo(WimModal);
