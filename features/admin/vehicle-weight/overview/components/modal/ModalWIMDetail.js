import React, { useEffect, useMemo, useState } from "react";
import { Modal, Row, Col, Typography, Flex, Image, Card } from "antd";
import { TruckOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { Weight, Speed, TruckWheel, Hashtag, TruckIcon } from "@/components/icon";
import NextImage from "next/image";
import { VEHICLE_PROPERTIES, WEIGHT_STATUS } from "@/utils/constant";
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import useGetAPI from "@/utils/hooks/api/useGetAPI";
import { getAllProvince } from "@/store/features/masterSlice";
import WheelHorizontal from "@/public/images/truck-img/wheel-type/WheelHorizontal";

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

  // ตรวจสอบว่ามี URL รูปภาพหรือไม่
  const hasImage1 = !!info?.log?.image_01_name;
  const hasImage2 = !!info?.log?.image_02_name;

  // เตรียม URL สำหรับรูปภาพ
  const image1Url = hasImage1 ? info?.log?.image_01_name : `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/fallback.png`;
  const image2Url = hasImage2 ? info?.log?.image_02_name : `${process.env.NEXT_PUBLIC_HOST_FRONT}/images/fallback.png`;

  const renderWeighingStatus = useMemo(() => {
    if (info?.log?.is_over_weight === 'N' && info?.log?.driver_shaft_over === null) {
      return <Typography.Text className="!text-xl !text-[#56E4EE]" strong>น้ำหนักปกติ</Typography.Text>
    } else if (info?.log?.is_over_weight === 'Y' && info?.log?.driver_shaft_over === null) {
      return <Typography.Text className="!text-xl !text-[#DC3912]" strong>น้ำหนักเกิน</Typography.Text>
    } else if (info?.log?.is_over_weight === 'P' && !!info?.log?.driver_shaft_over) {
      return <Typography.Text className="!text-xl !text-[#56E4EE]" strong>น้ำหนักปกติ</Typography.Text>
    } else if (info?.log?.is_over_weight === 'Y' && !!info?.log?.driver_shaft_over) {
      return <Typography.Text className="!text-xl !text-[#DC3912]" strong>น้ำหนักเกิน</Typography.Text>
    } else {
      return <Typography.Text className="!text-xl" strong>-</Typography.Text>
    }
  }, [info])

  const renderDriveShaftOver = useMemo(() => {
    if (info?.log?.is_over_weight === 'N' && info?.log?.driver_shaft_over === null) {
      return <Typography.Text className="!text-xl !text-[#56E4EE]" strong>{info?.log?.driver_shaft_over || '-'}</Typography.Text>
    } else if (info?.log?.is_over_weight === 'Y' && info?.log?.driver_shaft_over === null) {
      return <Typography.Text className="!text-xl !text-[#DC3912]" strong>{info?.log?.driver_shaft_over || '-'}</Typography.Text>
    } else if (info?.log?.is_over_weight === 'P' && !!info?.log?.driver_shaft_over) {
      return <Typography.Text className="!text-xl !text-[#56E4EE]" strong>{info?.log?.driver_shaft_over || '-'}</Typography.Text>
    } else if (info?.log?.is_over_weight === 'Y' && !!info?.log?.driver_shaft_over) {
      return <Typography.Text className="!text-xl !text-[#DC3912]" strong>{info?.log?.driver_shaft_over || '-'}</Typography.Text>
    } else {
      return <Typography.Text className="!text-xl" strong>-</Typography.Text>
    }
  }, [info])

  const renderAxleStatus = useMemo(() => {
    if (info?.log?.driver_shaft_over === null) {
      return <Typography.Text className="!text-xl !text-[#56E4EE]" strong>ไม่เกินพิกัด</Typography.Text>
    } else if (!!info?.log?.driver_shaft_over) {
      return <Typography.Text className="!text-xl !text-[#DC3912]" strong>เกินพิกัด</Typography.Text>
    }
    return "-"
  }, [info])


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
    <div className="modal-content">
      {/* Header - Station and Date */}
      <section className="mb-4">
        <Flex align="center" justify="space-between" gap={'0.3rem'} wrap>
          <Typography.Text>สถานี {info?.log?.wim?.station_name || '-'}</Typography.Text>
          <Typography.Text>{dayjs(info?.log?.wim?.last_update).locale('th').format('DD MMMM BBBB HH:mm:ss') || '-'}</Typography.Text>
        </Flex>
      </section>
      {/* Row 1: Truck and Wheel Images + License Plate Image */}
      <section className="mb-4">
        <Row gutter={[16, 16]}>
          {/* Left: Truck and Wheel Images */}
          <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
            <div className="bg-black rounded-lg p-4">
              <div className="flex flex-col justify-center items-center h-60">
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
                <Typography.Text className="text-white">ประเภท : {VEHICLE_PROPERTIES[info?.log?.vehicle_class_id]?.properties?.vehicle_description || '-'} - พ่วง {info?.log?.axle_count || '-'} เพลา {info?.log?.wheel_count || '-'} ล้อ</Typography.Text>
              </div>
            </div>
            <figure className="card-container rounded-md p-3 mt-3">
              {/* <Card bordered> */}
              <Flex align="center" justify="space-around" className="text-center">
                <Flex vertical align="center">
                  <Typography.Text>สถานะเข้าชั่ง</Typography.Text>
                  {renderWeighingStatus}
                </Flex>
                <Flex vertical align="center">
                  <Typography.Text>เพลาที่เกิน</Typography.Text>
                  {renderDriveShaftOver}
                </Flex>
                <Flex vertical align="center">
                  <Typography.Text>สถานะเพลา</Typography.Text>
                  {renderAxleStatus}
                </Flex>
              </Flex>
              {/* </Card> */}
            </figure>
            <figure className="card-container rounded-md p-3 mt-3">
              {/* <Card bordered> */}
              <Flex align="center" justify="space-around" wrap className="text-center">
                <Flex vertical align="center" className="px-2">
                  <Typography.Text>ความเร็ว</Typography.Text>
                  <Typography.Text className="!text-xl font-bold">{info?.log?.speed || '--'}</Typography.Text>
                </Flex>
                <Flex vertical align="center" className="px-2">
                  <Typography.Text>Lane</Typography.Text>
                  <Typography.Text className="!text-xl font-bold">{info?.log?.lane || '--'}</Typography.Text>
                </Flex>
                <Flex vertical align="center" className="px-2">
                  <Typography.Text>Front Overhang</Typography.Text>
                  <Typography.Text className="!text-xl font-bold">{info?.log?.front_over_hang || '--'}</Typography.Text>
                </Flex>
                <Flex vertical align="center" className="px-2">
                  <Typography.Text>Rear Overhang</Typography.Text>
                  <Typography.Text className="!text-xl font-bold">{info?.log?.rear_over_hang || '--'}</Typography.Text>
                </Flex>
                <Flex vertical align="center" className="px-2">
                  <Typography.Text>Length</Typography.Text>
                  <Typography.Text className="!text-xl font-bold">{info?.log?.length || '--'}</Typography.Text>
                </Flex>
              </Flex>
              {/* </Card> */}
            </figure>
          </Col>
          {/* Right: License Plate Image */}
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <div className="flex flex-col gap-3">
              <div className="border rounded-lg p-3 h-full lg:h-56">
                <Typography.Title level={5}>รูปทะเบียนรถ</Typography.Title>
                <figure className='h-40 relative overflow-hidden rounded-lg'>
                  <Image
                    src={image1Url}
                    alt='ทะเบียนรถ'
                    height={'100%'}
                    width={'100%'}
                    className='object-contain object-center'
                    onError={() => { handleError('image1') }}
                    preview={!fallbacks.image1}
                    fallback={`${process.env.NEXT_PUBLIC_HOST_FRONT}/images/fallback.png`}
                  />
                </figure>
              </div>
              <div className="border rounded-lg p-3 h-full lg:h-56 overflow-hidden">
                <Typography.Title level={5}>รูปรถบรรทุก</Typography.Title>
                <figure className='h-40 relative overflow-hidden rounded-lg flex items-center'>
                  <Image
                    src={image2Url}
                    alt='รถบรรทุก'
                    width={'100%'}
                    height={'100%'}
                    className='object-contain object-center rounded-lg'
                    onError={() => { handleError('image2') }}
                    preview={!fallbacks.image2}
                    fallback={`${process.env.NEXT_PUBLIC_HOST_FRONT}/images/fallback.png`}
                  />
                </figure>
              </div>
            </div>
          </Col>
        </Row>
      </section>
      {/* Row 2: Important Information Cards + Truck Image */}
      <section className="mb-4">
        <Row gutter={[16, 16]}>
          {/* Left: Important Information Cards */}
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Row gutter={[16, 16]}>
              {/* License Plate and Province */}
              <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Card className="h-full" bordered>
                  <Flex vertical align="center" justify="center" className="text-center">
                    <Typography.Text>ทะเบียนหัวลาก</Typography.Text>
                    <Typography.Text className="!text-2xl font-bold">{info?.log?.lp_head_no || '-'}</Typography.Text>
                    <Typography.Text className="mt-2">จังหวัด</Typography.Text>
                    <Typography.Text className="!text-xl font-bold">{info?.log?.lp_head_province?.name || '-'}</Typography.Text>
                  </Flex>
                </Card>
              </Col>
              {/* Weight Information */}
              <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Card className="h-full" bordered>
                  <Flex vertical align="center" justify="center" className="text-center">
                    <Flex align="center" justify="center" gap={16}>
                      <Flex vertical align="center">
                        <Typography.Text>น้ำหนักที่ชั่งได้</Typography.Text>
                        <Typography.Text className="!text-xl font-bold">{info?.log?.gross_weight || '-'} ตัน</Typography.Text>
                      </Flex>
                      <Flex vertical align="center">
                        <Typography.Text>น้ำหนักตามกฎหมาย</Typography.Text>
                        <Typography.Text className="!text-xl font-bold">{info?.log?.legal_weight || '-'} ตัน</Typography.Text>
                      </Flex>
                    </Flex>
                    <Flex align="center" justify="center" className="mt-3">
                      <Flex vertical align="center">
                        <Typography.Text>น้ำหนักที่เกิน</Typography.Text>
                        <Typography.Text
                          className={`!text-xl font-bold ${Number(info?.log?.gross_weight) < Number(info?.log?.legal_weight) ? '!text-[#56E4EE]' : '!text-[#DC3912]'}`}
                        >
                          {info?.log?.gross_weight_over || '-'} ตัน
                        </Typography.Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              </Col>
              {/* Weight Status */}
              {/* <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Card className="h-full" bordered>
                  <Flex align="center" justify="space-around" className="text-center">
                    <Flex vertical align="center">
                      <Typography.Text>สถานะเข้าชั่ง</Typography.Text>
                      {renderWeighingStatus}
                    </Flex>
                    <Flex vertical align="center">
                      <Typography.Text>เพลาที่เกิน</Typography.Text>
                      {renderDriveShaftOver}
                    </Flex>
                    <Flex vertical align="center">
                      <Typography.Text>สถานะเพลา</Typography.Text>
                      {renderAxleStatus}
                    </Flex>
                  </Flex>
                </Card>
              </Col> */}
            </Row>
          </Col>
          {/* Right: Truck Image */}
          {/* <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
           
          </Col> */}
        </Row>
      </section>
      {/* Row 3: Additional Information */}
      {/* <section className="mb-4">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Card className="h-full" bordered>
              <Flex align="center" justify="space-around" wrap className="text-center">
                <Flex vertical align="center" className="px-2">
                  <Typography.Text>ความเร็ว</Typography.Text>
                  <Typography.Text className="!text-xl font-bold">{info?.log?.speed || '--'}</Typography.Text>
                </Flex>
                <Flex vertical align="center" className="px-2">
                  <Typography.Text>Lane</Typography.Text>
                  <Typography.Text className="!text-xl font-bold">{info?.log?.lane || '--'}</Typography.Text>
                </Flex>
                <Flex vertical align="center" className="px-2">
                  <Typography.Text>Front Overhang</Typography.Text>
                  <Typography.Text className="!text-xl font-bold">{info?.log?.front_over_hang || '--'}</Typography.Text>
                </Flex>
                <Flex vertical align="center" className="px-2">
                  <Typography.Text>Rear Overhang</Typography.Text>
                  <Typography.Text className="!text-xl font-bold">{info?.log?.rear_over_hang || '--'}</Typography.Text>
                </Flex>
                <Flex vertical align="center" className="px-2">
                  <Typography.Text>Length</Typography.Text>
                  <Typography.Text className="!text-xl font-bold">{info?.log?.length || '--'}</Typography.Text>
                </Flex>
              </Flex>
            </Card>
          </Col>
        </Row>
      </section> */}
    </div>
  );
};

const ModalWIMDetail = (props) => {
  const { open, info, setOpen } = props;
  return (
    <Modal
      title="รายละเอียดรถบรรทุก"
      open={open}
      destroyOnClose
      onCancel={() => setOpen({ open: false, info: {} })}
      width={1000}
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

export default React.memo(ModalWIMDetail);
