import React from "react";
import { Modal, Row, Col, Typography, Card, Flex, Image } from "antd";
import { TruckOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { Weight, Speed, TruckWheel, Hashtag } from "@/components/icon";
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
          <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
            <section>
              <div className="border rounded-lg p-5 h-full lg:h-36">
                <div className="flex flex-wrap items-center justify-evenly gap-3 h-full">
                  <div className="flex flex-col flex-wrap items-center">
                    <Typography.Text>ทะเบียนหัวลาก</Typography.Text>
                    <Typography.Text className="!text-xl" strong>65-3535</Typography.Text>
                  </div>
                  <div className="flex flex-col flex-wrap items-center">
                    <Typography.Text>จังหวัดหัวลาก</Typography.Text>
                    <Typography.Text className="!text-xl" strong>พระนครศรีอยุธยา</Typography.Text>
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
                        <Typography.Text>0.0%</Typography.Text>
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
                <Col xs={24} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <div className="border rounded-lg p-3 h-full lg:h-36">
                    <div className="flex flex-col text-center gap-3 h-full">
                      <Hashtag width='2.5rem' height='2.5rem' className='block m-auto' />
                      <section className="flex flex-col text-center">
                        <Typography.Text>REF No.</Typography.Text>
                        <Typography.Text className="!text-xl" strong>04-459106</Typography.Text>
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
                      <Hashtag width='2.5rem' height='2.5rem' className='block m-auto' />
                      <section className="flex flex-col text-center">
                        <Typography.Text>SEQ No.</Typography.Text>
                        <Typography.Text className="!text-xl" strong>-</Typography.Text>
                      </section>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <div className="border rounded-lg p-3 h-full lg:h-36">
                    <div className="flex flex-col text-center gap-3 h-full">
                      <Hashtag width='2.5rem' height='2.5rem' className='block m-auto' />
                      <section className="flex flex-col text-center">
                        <Typography.Text>ESAL</Typography.Text>
                        <Typography.Text className="!text-xl" strong>//</Typography.Text>
                      </section>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <div className="border rounded-lg p-3 h-full lg:h-36">
                    <div className="flex flex-col text-center gap-3 h-full">
                      <Hashtag width='2.5rem' height='2.5rem' className='block m-auto' />
                      <section className="flex flex-col text-center">
                        <Typography.Text>Lane</Typography.Text>
                        <Typography.Text className="!text-xl" strong>--</Typography.Text>
                      </section>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <div className="border rounded-lg p-3 h-full lg:h-36">
                    <div className="flex flex-col text-center gap-3 h-full">
                      <Speed width='2.5rem' height='2.5rem' className='block m-auto' />
                      <section className="flex flex-col text-center">
                        <Typography.Text>ความเร็ว</Typography.Text>
                        <Typography.Text className="!text-xl" strong>--</Typography.Text>
                      </section>
                    </div>
                  </div>
                </Col>
              </Row>
            </section>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <div className="h-full lg:h-36 p-5">
                  <NextImage
                    src={BigTruck}
                    alt="big-truck"
                    className="!block !m-auto !h-full"
                  />
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <div className="border rounded-lg p-3 h-full lg:h-36">
                  <div className="flex flex-wrap items-center justify-evenly gap-3 h-full">
                    <div className="flex flex-col flex-wrap items-center text-center">
                      <Typography.Text>Front<br />Overhang</Typography.Text>
                      <Typography.Text className="!text-xl" strong>--</Typography.Text>
                    </div>
                    <div className="flex flex-col flex-wrap items-center text-center">
                      <Typography.Text>Rear<br />Overhang</Typography.Text>
                      <Typography.Text className="!text-xl" strong>--</Typography.Text>
                    </div>
                    <div className="flex flex-col flex-wrap items-center text-center">
                      <Typography.Text>Length</Typography.Text>
                      <Typography.Text className="!text-xl" strong>--</Typography.Text>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <div className="bg-black rounded-lg p-5 h-full lg:h-72">
                  <div className="h-full">
                    <NextImage
                      src={SampleTruckWheel}
                      alt="sample-truck-wheel"
                      className="!block !m-auto h-full lg:!h-48"
                    />
                    <div className="text-center">
                      <Typography.Text>รถพ่วง 6 เพลา 22 ยาง (KINGPIN 8) ขึ้นไป</Typography.Text>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
      <section className="mt-5">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <figure className='h-60 relative overflow-hidden rounded-lg'>
              <Image
                src={'https://i.scdn.co/image/ab67616d0000b273cc68eea0db7110e3b8cca14e'}
                alt='collaboration-image'
                width={'100%'}
                height={'100%'}
                className='object-cover object-center'
                fallback='data:image/png;base64,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'
              />
            </figure>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <figure className='h-60 relative overflow-hidden rounded-lg'>
              <Image
                src={'https://i.scdn.co/image/ab67616d0000b273d97e2c6ea1bfebc2b6090e2f'}
                alt='collaboration-image'
                width={'100%'}
                height={'100%'}
                className='object-cover object-center'
                fallback='data:image/png;base64,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'
              />
            </figure>
          </Col>
        </Row>
      </section>
    </div>
  );
};

const ModalWIMDetail = (props) => {
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

export default React.memo(ModalWIMDetail);
