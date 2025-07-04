import React, { useCallback, useRef } from "react";
import { Modal, Row, Col, message, Typography, Button } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Form, Field, useForm } from "@/components/form";
import usePostAPI from "@/utils/hooks/api/usePostAPI";
import usePutAPI from "@/utils/hooks/api/usePutAPI";
import dayjs from 'dayjs';
import 'dayjs/locale/th'
import { useSelector } from 'react-redux'

const Content = (props) => {
  const workplans = useSelector((state) => state.information.unit_establishment_plan.workplans)
  const { info, route, refSubmit, apiGetData, setOpen } = props;

  const reportYear = () => {
    const planDate = dayjs(`30/09/${dayjs().year()}`, 'DD/MM/YYYY');
    const currentDate = dayjs();
    if (currentDate.isAfter(planDate)) {
      return (dayjs().add(1, 'year'))
    } else {
      return (dayjs())
    }
  }

  const form = useForm({
    initialValues: {
      plan_year: info.info?.plan_year ? dayjs(info.info?.plan_year) : reportYear(),
      way_id: info.info?.way_code || '',
      october: info.info?.october || '0',
      november: info.info?.november || '0',
      december: info.info?.december || '0',
      january: info.info?.january || '0',
      february: info.info?.february || '0',
      march: info.info?.march || '0',
      april: info.info?.april || '0',
      may: info.info?.may || '0',
      june: info.info?.june || '0',
      july: info.info?.july || '0',
      august: info.info?.august || '0',
      september: info.info?.september || '0',
    },
    rules: {
      plan_year: {
        required: 'required'
      },
      way_id: {
        required: 'required'
      },
      october: {
        required: 'required'
      },
      november: {
        required: 'required'
      },
      december: {
        required: 'required'
      },
      january: {
        required: 'required'
      },
      february: {
        required: 'required'
      },
      march: {
        required: 'required'
      },
      april: {
        required: 'required'
      },
      may: {
        required: 'required'
      },
      june: {
        required: 'required'
      },
      july: {
        required: 'required'
      },
      august: {
        required: 'required'
      },
      september: {
        required: 'required'
      }
    },
  });

  const [funcPost, loadingPost, dataPost] = usePostAPI();
  const [funcPut, loadingPut, dataPut] = usePutAPI();

  const buildValue = useCallback((values, next) => {
    next(values);
  }, []);

  const handlerSubmit = useCallback(async(values) => {
    if (info?.is_updatable) {
      const body = {
        october: parseInt(values?.october),
        november: parseInt(values?.november),
        december: parseInt(values?.december),
        january: parseInt(values?.january),
        february: parseInt(values?.february),
        march: parseInt(values?.march),
        april: parseInt(values?.april),
        may: parseInt(values?.may),
        june: parseInt(values?.june),
        july: parseInt(values?.july),
        august: parseInt(values?.august),
        september: parseInt(values?.september)
      }
      const res = await funcPut(`/api/v1/info/workplan_way/${info?.info?.id}`, body, undefined, false);
      if (res?.success) {
          Modal.destroyAll()
          setOpen({ open: false })
          apiGetData(`/api/v1/info/workplan_way`, { ...workplans.search }, false, {})
          message.success(res?.message)
      }
    } else {
      const body = {
        october: parseInt(values?.october),
        november: parseInt(values?.november),
        december: parseInt(values?.december),
        january: parseInt(values?.january),
        february: parseInt(values?.february),
        march: parseInt(values?.march),
        april: parseInt(values?.april),
        may: parseInt(values?.may),
        june: parseInt(values?.june),
        july: parseInt(values?.july),
        august: parseInt(values?.august),
        september: parseInt(values?.september),
        way_id: values.way_id,
        year_type: "ce_year",
        plan_year: values.plan_year ? dayjs(values.plan_year).format('YYYY') : ''
      }
      const res = await funcPost("/api/v1/info/workplan_way", body, undefined, false);
      if (res?.success) {
          Modal.destroyAll()
          setOpen({ open: false })
          apiGetData(`/api/v1/info/workplan_way`, { ...workplans.search }, false, {})
          message.success(res?.message)
      }
    }
  }, [workplans, info, funcPost, funcPut, apiGetData, setOpen]);

  const confirmSubmit = useCallback((values, next) => {
    Modal.confirm({
      title: <Typography.Text className='font-IBMPlexSansThaiBold' strong>{info?.is_updatable ? 'ยืนยันการแก้ไขข้อมูลแผนการจัดตั้งหน่วย?' : 'ยืนยันการเพิ่มข้อมูลแผนการจัดตั้งหน่วย?'}</Typography.Text>,
      content: (
        <div className='flex flex-wrap flex-col items-start'>
          <Typography.Text className='font-IBMPlexSansThaiRegular'>{info?.is_updatable ? 'ท่านต้องการยืนยันการแก้ไขข้อมูลแผนการจัดตั้งหน่วยใช่หรือไม่?' : 'ท่านต้องการยืนยันการเพิ่มข้อมูลแผนการจัดตั้งหน่วยใช่หรือไม่?'}</Typography.Text>
        </div>
      ),
      icon: <ExclamationCircleFilled style={{ color: '#1CBD40' }} />,
      maskClosable: true,
      footer: (
        <div className='mt-5 text-right'>
          <Button type="link" onClick={() => Modal.destroyAll()}>
            <span className='underline font-IBMPlexSansThaiRegular' style={{ color: 'rgba(43, 43, 43, 0.8)' }}>ยกเลิก</span>
          </Button>
          <Button 
            type="text" 
            loading={info?.is_updatable ? loadingPut : loadingPost} 
            style={{ backgroundColor: 'rgba(28, 189, 64, 1)' }} 
            onClick={() => next(values)}
          >
            <span className='font-IBMPlexSansThaiRegular text-white'>ยืนยัน</span>
          </Button>
        </div>
      ),
    })
  }, [loadingPost, loadingPut, info])

  return (
    <Form form={form} handlerSubmit={[confirmSubmit, buildValue, handlerSubmit]}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>  
          <Field.DatePicker
            label='ปีงบประมาณ'
            name='plan_year'
            placeholder='ปีงบประมาณ'
            picker="year"
            format='BBBB'
            allowClear={false}
            disabled={info?.is_updatable}
            disabledDate={current => {
              return current.year() < reportYear().year();            
            }}
            style={{
              background: info?.is_updatable ? '#ececec' : '#fff'
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Field.Select
            label="ข้อมูลสายทาง"
            name="way_id"
            placeholder="ข้อมูลสายทาง"
            optKeys={['id', 'way_code']}
            options={route}
            disabled={info?.is_updatable}
            showSearch
            style={{
              background: info?.is_updatable ? '#ececec' : '#fff',
              borderRadius: 6
            }}
          />
        </Col>
        {/* รายการเดือน */}
        {[
          { label: "ตุลาคม", name: "october" },
          { label: "พฤศจิกายน", name: "november" },
          { label: "ธันวาคม", name: "december" },
          { label: "มกราคม", name: "january" },
          { label: "กุมภาพันธ์", name: "february" },
          { label: "มีนาคม", name: "march" },
          { label: "เมษายน", name: "april" },
          { label: "พฤษภาคม", name: "may" },
          { label: "มิถุนายน", name: "june" },
          { label: "กรกฎาคม", name: "july" },
          { label: "สิงหาคม", name: "august" },
          { label: "กันยายน", name: "september" },
        ].map(month => (
          <Col key={month.name} xs={24} sm={12} md={12} lg={4} xl={4} xxl={4}>
            <Field.Number
              label={month.label}
              name={month.name}
              placeholder={month.label}
              allowNegative={false}
              decimalScale={0}
            />
          </Col>
        ))}
        <Field.Input
          name="mockup"
          className='!hidden'
        />
      </Row>
      <button type='submit' ref={refSubmit} hidden />
    </Form>
  );
};

const ModalAddEstablishUnit = (props) => {
  const { open, info, setOpen, route, apiGetData } = props;
  const refSubmit = useRef()
  
  // Determine the modal title based on whether it's add or edit
  const modalTitle = info?.is_updatable ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล";

  return (
    <Modal
      title={modalTitle}
      open={open}
      destroyOnClose
      onOk={() => refSubmit.current.click()}
      onCancel={() => setOpen({ open: false })}
      width={700}
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
        <Content
          info={info}
          route={route}
          refSubmit={refSubmit}
          apiGetData={apiGetData}
          setOpen={setOpen}
        />
      </main>
    </Modal>
  );
};

export default React.memo(ModalAddEstablishUnit);
