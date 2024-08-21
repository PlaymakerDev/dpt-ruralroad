import React from "react";
import { Modal, Row, Col, Typography, Card, Flex } from "antd";
import { TruckOutlined, CheckCircleOutlined } from '@ant-design/icons'
import Cardboard from "@/components/icon/Cardboard";
import Weight from "@/components/icon/Weight";

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
        <div className="border rounded-lg p-5">
          <div className="flex flex-wrap items-center justify-evenly gap-3">
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
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
            <div className="border rounded-lg p-3 h-full">
              <div className="flex flex-col text-center gap-3">
                <Weight width='2.5rem' height='2.5rem' className='block m-auto' />
                <section className="flex flex-col text-center">
                  <Typography.Text>น้ำหนักที่ชั่งได้</Typography.Text>
                  <Typography.Text className="!text-xl" strong>35.5 ตัน</Typography.Text>
                </section>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
            <div className="border rounded-lg p-3 h-full">
              <div className="flex flex-col text-center gap-3">
                <Weight width='2.5rem' height='2.5rem' className='block m-auto' />
                <section className="flex flex-col text-center">
                  <Typography.Text className="!text-xs">น้ำหนักที่กฎหมายกำหนด</Typography.Text>
                  <Typography.Text className="!text-xl" strong>50.5 ตัน</Typography.Text>
                </section>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
            <div className="border rounded-lg p-3 h-full">
              <div className="flex flex-col text-center gap-3">
                <Weight width='2.5rem' height='2.5rem' className='block m-auto' />
                <section className="flex flex-col text-center">
                  <Typography.Text>น้ำหนักที่เกิน</Typography.Text>
                  <Typography.Text className="!text-xl !text-[#56E4EE]" strong>00 ตัน</Typography.Text>
                </section>
              </div>
            </div>
          </Col>
        </Row>
      </section>
      <section className="mt-3">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
            <div className="border rounded-lg p-3 h-full">
              <div className="flex flex-col text-center gap-3">
                <TruckOutlined className="!block !m-auto !text-3xl" />
                <section className="flex flex-col text-center">
                  <Typography.Text>ประเภท</Typography.Text>
                  <Typography.Text className="!text-xl" strong>20</Typography.Text>
                </section>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
            <div className="border rounded-lg p-3 h-full">
              <div className="flex flex-col text-center gap-3">
                <CheckCircleOutlined className="!block !m-auto !text-3xl" />
                <section className="flex flex-col text-center">
                  <Typography.Text>สถานะเข้าชั่ง</Typography.Text>
                  <Typography.Text className="!text-xl" strong>ไม่เกินพิกัด</Typography.Text>
                </section>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
            <div className="border rounded-lg p-3 h-full">
              <div className="flex flex-col text-center gap-3">
                <Cardboard width='2.5rem' height='2.5rem' className='block m-auto' />
                <section className="flex flex-col text-center">
                  <Typography.Text>สิ่งของที่บรรทุก</Typography.Text>
                  <Typography.Text className="!text-xl" strong>มันสำปะหลัง</Typography.Text>
                </section>
              </div>
            </div>
          </Col>
        </Row>
      </section>
    </div>
  );
};

const ModalWeightDetail = (props) => {
  const { open, setOpen } = props;

  return (
    <Modal
      title="รายละเอียดรถบรรทุก"
      open={open}
      destroyOnClose
      onCancel={() => setOpen({ open: false })}
      // width={700}
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

export default React.memo(ModalWeightDetail);
