import React from "react";
import { Modal, Row, Col, Typography, Card, Flex, Image } from "antd";
import { TruckOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { Weight, Speed, TruckWheel, Hashtag, Cardboard } from "@/components/icon";
import BigTruck from '@/public/images/big-truck.svg'
import SampleTruckWheel from '@/public/images/sample-truck-wheel.svg'
import NextImage from "next/image";

const Content = (props) => {
  const { } = props;

  return (
    <div>
      <section>
        <Flex align="center" justify="space-between" gap={'0.3rem'} wrap>
          <Typography.Text>สถานี นครศรีธรรมราช</Typography.Text>
          <Typography.Text>13 ธันวาคม 2567 16:31:53</Typography.Text>
        </Flex>
      </section>
      <section className="mt-3">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <section>
              <div className="border rounded-lg p-5 h-full lg:h-36">
                <div className="flex flex-wrap items-center justify-evenly gap-3 h-full">
                  <div className="flex flex-col flex-wrap items-center">
                    <Typography.Text className="!text-xl">ทะเบียน</Typography.Text>
                    <Typography.Text className="!text-xl" strong>65-3535 พระนครศรีอยุธยา</Typography.Text>
                  </div>
                </div>
              </div>
            </section>
            <section className="mt-3">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <div className="border rounded-lg p-3 h-full lg:h-36">
                    <div className="flex flex-col text-center gap-3 h-full">
                      <Weight width='2.5rem' height='2.5rem' className='block m-auto' />
                      <section className="flex flex-col text-center">
                        <Typography.Text>น้ำหนักที่ชั่งได้</Typography.Text>
                        <Typography.Text className="!text-xl" strong>35.5 ตัน</Typography.Text>
                      </section>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <div className="border rounded-lg p-3 h-full lg:h-36">
                    <div className="flex flex-col text-center gap-3 h-full">
                      <Weight width='2.5rem' height='2.5rem' className='block m-auto' />
                      <section className="flex flex-col text-center">
                        <Typography.Text>น้ำหนักที่กฎหมายกำหนด</Typography.Text>
                        <Typography.Text className="!text-xl" strong>50.5 ตัน</Typography.Text>
                      </section>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <div className="border rounded-lg p-3 h-full lg:h-36">
                    <div className="flex flex-col text-center gap-3 h-full">
                      <Weight width='2.5rem' height='2.5rem' className='block m-auto' />
                      <section className="flex flex-col text-center">
                        <Typography.Text>น้ำหนักที่เกิน</Typography.Text>
                        <Typography.Text className="!text-xl !text-[#56E4EE]" strong>00 ตัน</Typography.Text>
                      </section>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <div className="border rounded-lg p-3 h-full lg:h-36">
                    <div className="flex flex-col text-center gap-3 h-full">
                      <TruckOutlined className="!block !m-auto !text-3xl" />
                      <section className="flex flex-col text-center">
                        <Typography.Text>ประเภท</Typography.Text>
                        <Typography.Text className="!text-xl" strong>20</Typography.Text>
                      </section>
                    </div>
                  </div>
                </Col>
              </Row>
            </section>
            <section className="mt-3">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <div className="border rounded-lg p-3 h-full lg:h-36">
                    <div className="flex flex-col text-center gap-3 h-full">
                      <CheckCircleOutlined className="!block !m-auto !text-3xl" />
                      <section className="flex flex-col text-center">
                        <Typography.Text>สถานะเข้าชั่ง</Typography.Text>
                        <Typography.Text className="!text-xl !text-[#56E4EE]" strong>น้ำหนักปกติ</Typography.Text>
                      </section>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <div className="border rounded-lg p-3 h-full lg:h-36">
                    <div className="flex flex-col text-center gap-3 h-full">
                      <Cardboard width='2.5rem' height='2.5rem' className='block m-auto' />
                      <section className="flex flex-col text-center">
                        <Typography.Text>สิ่งของที่บรรทุก</Typography.Text>
                        <Typography.Text className="!text-xl" strong>มันสำปะหลัง</Typography.Text>
                      </section>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <div className="border rounded-lg p-3 h-full lg:h-36">
                    <div className="flex flex-col text-center gap-3 h-full">
                      <TruckWheel width='2.5rem' height='2.5rem' className='block m-auto' />
                      <section className="flex flex-col text-center">
                        <Typography.Text>เพลงที่เกิน</Typography.Text>
                        <Typography.Text className="!text-xl !text-[#56E4EE]" strong>00</Typography.Text>
                      </section>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <div className="border rounded-lg p-3 h-full lg:h-36">
                    <div className="flex flex-col text-center gap-3 h-full">
                      <CheckCircleOutlined className="!block !m-auto !text-3xl" />
                      <section className="flex flex-col text-center">
                        <Typography.Text>สถานะเพลา</Typography.Text>
                        <Typography.Text className="!text-xl !text-[#56E4EE]" strong>ไม่เกินพิกัด</Typography.Text>
                      </section>
                    </div>
                  </div>
                </Col>
              </Row>
            </section>
          </Col>
        </Row>
      </section>
      <section className="mt-5">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <div className="bg-black rounded-lg p-5 h-72">
              <div className="h-full">
                <NextImage
                  src={SampleTruckWheel}
                  alt="sample-truck-wheel"
                  className="!block !m-auto !h-48"
                />
                <div className="text-center">
                  <Typography.Text>รถพ่วง 6 เพลา 22 ยาง (KINGPIN 8) ขึ้นไป</Typography.Text>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </section>
    </div>
  );
};

const ModalVehicleDetail = (props) => {
  const { open, setOpen } = props;

  return (
    <Modal
      title="รายละเอียดรถบรรทุก"
      open={open}
      destroyOnClose
      onCancel={() => setOpen({ open: false })}
      width={1000}
      okText='บันทึก'
      cancelText='ยกเลิก'
      // okButtonProps={{
      //   htmlType: 'submit',
      //   type: 'primary',
      //   size: 'large'
      // }}
      // cancelButtonProps={{
      //   htmlType: 'button',
      //   type: 'text',
      //   size: 'large'
      // }}
      footer={false}
    >
      <main className='my-5'>
        <Content />
      </main>
    </Modal>
  );
};

export default React.memo(ModalVehicleDetail);
