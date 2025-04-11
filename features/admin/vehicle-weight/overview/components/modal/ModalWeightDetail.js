import React, { useEffect, useMemo, useState } from "react";
import { Modal, Row, Col, Typography, Flex, Image } from "antd";
import NextImage from "next/image";
import { TruckOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { Cardboard, Weight, TruckIcon } from "@/components/icon";
import { VEHICLE_PROPERTIES, WEIGHT_STATUS } from "@/utils/constant";
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import useGetAPI from "@/utils/hooks/api/useGetAPI";
import { getAllProvince } from "@/store/features/masterSlice";
import WheelHorizontal from "@/public/images/truck-img/wheel-type/WheelHorizontal";
const _ = require('lodash');

dayjs.extend(customParseFormat);

const Content = (props) => {
  const { info } = props;

  const [fallbacks, setFallbacks] = useState({
    image1: false,
    image2: false,
  });

  const handleError = (imageName) => {
    setFallbacks((prev) => ({ ...prev, [imageName]: true }));
  };

  const handleShow = (imageName) => {
    setFallbacks((prev) => ({ ...prev, [imageName]: false }));
  };
  // const [apiGetProvince, loadingProvince, masterProvince] = useGetAPI('overlay', {
  //   funcDispatch: getAllProvince, reducerName: 'master', reducerKey: 'province'
  // })

  // useEffect(() => {
  //   apiGetProvince('/api/v1/masters/provinces_all', {}, false, {})
  // }, [])

  // const result = _.find(masterProvince.all, { pid: Number(info?.log?.lp_head_province_id)});

  const truckType = info?.log?.vehicle_class_id
  const displayType = info?.log?.display_type
  const wheelData = {
    left: {
      wheel1: info?.log?.axle_left_1 || 0,
      wheel2: info?.log?.axle_left_2 || 0,
      wheel3: info?.log?.axle_left_3 || 0,
      wheel4: info?.log?.axle_left_4 || 0,
      wheel5: info?.log?.axle_left_5 || 0,
      wheel6: info?.log?.axle_left_6 || 0,
      wheel7: info?.log?.axle_left_7 || 0,
    },
    right: {
      wheel1: info?.log?.axle_right_1 || 0,
      wheel2: info?.log?.axle_right_2 || 0,
      wheel3: info?.log?.axle_right_3 || 0,
      wheel4: info?.log?.axle_right_4 || 0,
      wheel5: info?.log?.axle_right_5 || 0,
      wheel6: info?.log?.axle_right_6 || 0,
      wheel7: info?.log?.axle_right_7 || 0,
    }
  }

  return (
    <div>
      <section>
        <Flex align="center" justify="space-between" gap={'0.3rem'} wrap>
          <Typography.Text>สถานี {info?.log?.station?.station_name || '-'}</Typography.Text>
          <Typography.Text>{dayjs(info?.log?.station?.last_update).locale('th').format('DD MMMM BBBB HH:mm:ss') || '-'}</Typography.Text>
        </Flex>
      </section>
      <section className="mt-3">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
            <section>
              <div className="border rounded-lg p-5 h-full lg:h-36">
                <div className="flex flex-wrap items-center justify-evenly gap-3 h-full">
                  <div className="flex flex-col flex-wrap items-center">
                    <Typography.Text className="!text-lg">ทะเบียนหัวลาก</Typography.Text>
                    <Typography.Text className="!text-xl" strong>{info?.log?.lp_head_no || '-'}</Typography.Text>
                  </div>
                  <div className="flex flex-col flex-wrap items-center">
                    <Typography.Text className="!text-lg">จังหวัดหัวลาก</Typography.Text>
                    <Typography.Text className="!text-xl" strong>{info?.log?.lp_head_province?.name || '-'}</Typography.Text>
                  </div>
                </div>
              </div>
            </section>
            <section className="mt-3">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                  <div className="border rounded-lg p-3 h-full lg:h-36">
                    <div className="flex flex-col justify-center text-center gap-3 h-full">
                      <section className="flex items-center justify-center">
                        <Weight width='2.5rem' height='2.5rem' />
                      </section>
                      <section className="flex flex-col text-center">
                        <Typography.Text>น้ำหนักที่ชั่งได้</Typography.Text>
                        <Typography.Text className="!text-xl" strong>{info?.log?.gross_weight || '-'} ตัน</Typography.Text>
                      </section>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                  <div className="border rounded-lg p-3 h-full lg:h-36">
                    <div className="flex flex-col justify-center text-center gap-3 h-full">
                      <section className="flex items-center justify-center">
                        <Weight width='2.5rem' height='2.5rem' />
                      </section>
                      <section className="flex flex-col text-center">
                        <Typography.Text className="!text-base lg:!text-xs">น้ำหนักที่กฎหมายกำหนด</Typography.Text>
                        <Typography.Text className="!text-xl" strong>{info?.log?.legal_weight || '-'} ตัน</Typography.Text>
                      </section>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                  <div className="border rounded-lg p-3 h-full lg:h-36">
                    <div className="flex flex-col justify-center text-center gap-3 h-full">
                      <section className="flex items-center justify-center">
                        <Weight width='2.5rem' height='2.5rem' />
                      </section>
                      <section className="flex flex-col text-center">
                        <Typography.Text>น้ำหนักที่เกิน</Typography.Text>
                        <Typography.Text className={`!text-xl ${Number(info?.log?.gross_weight) < Number(info?.log?.legal_weight) ? '!text-[#56E4EE]' : '!text-[#DC3912]'}`} strong>{info?.log?.grossweight_over || '0'} ตัน</Typography.Text>
                      </section>
                    </div>
                  </div>
                </Col>
              </Row>
            </section>
            <section className="mt-3">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                  <div className="border rounded-lg p-3 h-full lg:h-36">
                    <div className="flex flex-col justify-center text-center gap-3 h-full">
                      <section className="flex items-center justify-center">
                        {/* <TruckOutlined className="!text-3xl" /> */}
                        <TruckIcon width={37} height={30} customFill='#FFFFFF' />
                      </section>
                      <section className="flex flex-col text-center">
                        <Typography.Text>ประเภท</Typography.Text>
                        <Typography.Text className="!text-xl" strong>{info?.log?.vehicle_class_id || '-'}</Typography.Text>
                      </section>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                  <div className="border rounded-lg p-3 h-full lg:h-36">
                    <div className="flex flex-col justify-center text-center gap-3 h-full">
                      <section className="flex items-center justify-center">
                        <CheckCircleOutlined className="!text-3xl !text-white" />
                      </section>
                      <section className="flex flex-col text-center">
                        <Typography.Text>สถานะเข้าชั่ง</Typography.Text>
                        <Typography.Text className={`!text-xl ${info?.log?.is_over_weight === 'N' ? '!text-[#56E4EE]' : '!text-[#DC3912]'}`} strong>{WEIGHT_STATUS[info?.log?.is_over_weight] || '-'}</Typography.Text>
                      </section>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                  <div className="border rounded-lg p-3 h-full lg:h-36">
                    <div className="flex flex-col justify-center text-center gap-3 h-full">
                      <section className="flex items-center justify-center">
                        <Cardboard width='2.5rem' height='2.5rem' />
                      </section>
                      <section className="flex flex-col text-center">
                        <Typography.Text>สิ่งของที่บรรทุก</Typography.Text>
                        <Typography.Text className="!text-xl" strong>{info?.log?.material_name || '-'}</Typography.Text>
                      </section>
                    </div>
                  </div>
                </Col>
              </Row>
            </section>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={24} xl={24} xxl={24}>
                <div className="border rounded-lg p-3 h-full lg:h-[13.75rem]">
                  <Typography.Title level={5}>รูปทะเบียนรถ</Typography.Title>
                  <figure className='h-60 lg:h-40 relative overflow-hidden rounded-lg'>
                    <Image
                      // src={'https://i.scdn.co/image/ab67616d0000b273cc68eea0db7110e3b8cca14e'}
                      src={info?.log?.image_01_name}
                      alt='collaboration-image'
                      width={'100%'}
                      height={'100%'}
                      className='object-contain object-center'
                      onError={() => { handleError('image1') }}
                      preview={!fallbacks.image1}
                      fallback={`${process.env.NEXT_PUBLIC_HOST_FRONT}/images/fallback.png`}
                    />
                  </figure>
                  
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={24} xl={24} xxl={24}>
                <div className="border rounded-lg p-3 h-full lg:h-[13.75rem] overflow-hidden">
                  <Typography.Title level={5}>รูปรถบรรทุก</Typography.Title>
                  <figure className='h-60 lg:h-40 relative overflow-hidden rounded-lg'>
                    <Image
                      // src={'https://i.scdn.co/image/ab67616d0000b273d97e2c6ea1bfebc2b6090e2f'}
                      src={info?.log?.image_02_name}
                      alt='collaboration-image'
                      width={'100%'}
                      height={'100%'}
                      className='object-contain object-center'
                      onError={() => { handleError('image2') }}
                      preview={!fallbacks.image2}
                      fallback={`${process.env.NEXT_PUBLIC_HOST_FRONT}/images/fallback.png`}
                    />
                  </figure>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
      <section className="mt-3">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <div className="p-5 h-full">
              <figcaption className="flex flex-col flex-wrap gap-5 h-full">
                <NextImage
                  src={VEHICLE_PROPERTIES[info?.log?.vehicle_class_id]?.vehicle?.image}
                  alt='vehicle'
                  width={VEHICLE_PROPERTIES[info?.log?.vehicle_class_id]?.vehicle?.width}
                  height={VEHICLE_PROPERTIES[info?.log?.vehicle_class_id]?.vehicle?.height}
                  className='block m-auto w-fit'
                />
                <div className="text-center">
                  <Typography.Text>{VEHICLE_PROPERTIES[info?.log?.vehicle_class_id]?.properties?.vehicle_description}</Typography.Text>
                </div>
              </figcaption>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <div className="bg-black rounded-lg p-5 h-full">
              <div className="h-full flex justify-center items-center">
                <WheelHorizontal
                  displayType={displayType}
                  type={truckType}
                  leftwheel1={wheelData?.left?.wheel1}
                  leftwheel2={wheelData?.left?.wheel2}
                  leftwheel3={wheelData?.left?.wheel3}
                  leftwheel4={wheelData?.left?.wheel4}
                  leftwheel5={wheelData?.left?.wheel5}
                  leftwheel6={wheelData?.left?.wheel6}
                  leftwheel7={wheelData?.left?.wheel7}
                  rightwheel1={wheelData?.right?.wheel1}
                  rightwheel2={wheelData?.right?.wheel2}
                  rightwheel3={wheelData?.right?.wheel3}
                  rightwheel4={wheelData?.right?.wheel4}
                  rightwheel5={wheelData?.right?.wheel5}
                  rightwheel6={wheelData?.right?.wheel6}
                  rightwheel7={wheelData?.right?.wheel7}
                />
              </div>
              {displayType == 0 ? <div className="text-center -mt-8">
                <Typography.Text>{info?.log?.gross_weight || '-'} ตัน</Typography.Text>
              </div> : ''}
            </div>
          </Col>
        </Row>
      </section>
    </div>
  );
};

const ModalWeightDetail = (props) => {
  const { open, info, setOpen } = props;

  return (
    <Modal
      title="รายละเอียดรถบรรทุก"
      open={open}
      destroyOnClose
      onCancel={() => setOpen({ open: false, info: {} })}
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
        <Content
          info={info}
        />
      </main>
    </Modal>
  );
};

export default React.memo(ModalWeightDetail);
