import React, { useCallback } from "react";
import { Modal, Row, Col } from "antd";
import { Form, Field, useForm } from "@/components/form";

const Content = (props) => {
  const { } = props;

  const form = useForm({
    initialValues: {
      start_date : '',
      start_time : '',
      type_car : '',
      type_cargo : '',
      license_plate_head : '',
      province_head : '',
      license_plate_trailer : '',
      province_trailer : '',
      axie_1 : '',
      axie_2 : '',
      axie_3 : '',
      axie_4 : '',
      axie_5 : '',
      axie_6 : '',
      axie_7 : '',
      axie_8 : '',

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
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
          <Field.DatePicker
            label="วันที่เข้าชั่ง"
            name="start_date"
            placeholder="วันที่เข้าชั่ง"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
          <Field.DatePicker
            label="เวลาเข้าชั่ง"
            name="start_time"
            placeholder="เวลาเข้าชั่ง"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
          <Field.Select
            label="ประเภทรถ"
            name="type_car"
            placeholder="ประเภทรถ"
            optKeys={['value', 'label']}
            options={[]}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
          <Field.Select
            label="บรรทุก"
            name="type_cargo"
            placeholder="บรรทุก"
            optKeys={['value', 'label']}
            options={[]}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
          <Field.Input
            label="ทะเบียนรถ (หัวลาก)"
            name="license_plate_head"
            placeholder="ทะเบียนรถ (หัวลาก)"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
          <Field.Select
            label="จังหวัด (หัวลาก)"
            name="province_head"
            placeholder="จังหวัด (หัวลาก)"
            optKeys={['value', 'label']}
            options={[]}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
          <Field.Input
            label="ทะเบียนรถ (หางลาก)"
            name="license_plate_trailer"
            placeholder="ทะเบียนรถ (หางลาก)"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
          <Field.Select
            label="จังหวัด (หางลาก)"
            name="province_trailer"
            placeholder="จังหวัด (หางลาก)"
            optKeys={['value', 'label']}
            options={[]}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={3} xl={3} xxl={3}>
          <Field.Input
            label="เพลาที่ 1"
            name="axie_1"
            placeholder="น้ำหนัก (ตัน)"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={3} xl={3} xxl={3}>
          <Field.Input
            label="เพลาที่ 2"
            name="axie_2"
            placeholder="น้ำหนัก (ตัน)"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={3} xl={3} xxl={3}>
          <Field.Input
            label="เพลาที่ 3"
            name="axie_3"
            placeholder="น้ำหนัก (ตัน)"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={3} xl={3} xxl={3}>
          <Field.Input
            label="เพลาที่ 4"
            name="axie_4"
            placeholder="น้ำหนัก (ตัน)"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={3} xl={3} xxl={3}>
          <Field.Input
            label="เพลาที่ 5"
            name="axie_5"
            placeholder="น้ำหนัก (ตัน)"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={3} xl={3} xxl={3}>
          <Field.Input
            label="เพลาที่ 6"
            name="axie_6"
            placeholder="น้ำหนัก (ตัน)"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={3} xl={3} xxl={3}>
          <Field.Input
            label="เพลาที่ 7"
            name="axie_7"
            placeholder="น้ำหนัก (ตัน)"
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={3} xl={3} xxl={3}>
          <Field.Input
            label="เพลาที่ 8"
            name="axie_8"
            placeholder="น้ำหนัก (ตัน)"
          />
        </Col>
      </Row>
    </Form>
  );
};

const ModalAddMobileVehicleWeight = (props) => {
  const { open, setOpen } = props;

  return (
    <Modal
      title="เพิ่มข้อมูล รถที่เข้าชั่ง"
      open={open}
      destroyOnClose
      onCancel={() => setOpen({ open: false })}
      width={1000}
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

export default React.memo(ModalAddMobileVehicleWeight);
