import React, { useCallback, useEffect } from "react";
import { Modal, Row, Col, Typography, Flex, Button, message } from "antd";
import { TruckOutlined, CheckCircleOutlined, CheckOutlined } from '@ant-design/icons'
import { Weight, TruckWheel, Cardboard, TruckIcon } from "@/components/icon";
import { VEHICLE_PROPERTIES } from "@/utils/constant";
import usePutAPI from '@/utils/hooks/api/usePutAPI'
import useGetAPI from '@/utils/hooks/api/useGetAPI';
import { getTruckDetail } from "@/store/features/informationSlice";
import Image from 'next/image'
// DATE
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { parseData } from "@/utils/parsedata";
import WheelHorizontal from "@/public/images/truck-img/wheel-type/WheelHorizontal";
import { allowAdmin, filterDeptType } from "@/utils/allowAdmin";
import { useAppSelector } from "@/store/hooks";

dayjs.extend(buddhistEra);
dayjs.extend(customParseFormat);

const Content = (props) => {
  const { td_id, open, info, onChangeTable, setOpen } = props;

  const user = useAppSelector(state => state.user)
  const role = user?.map_group_name
  const deptType = user?.dept_type


  const [apiPut, loadingPut] = usePutAPI('overlay')
  const [apiGetTruckData, Truckloading, Truckdata] = useGetAPI('overlay', {
    funcDispatch: getTruckDetail, reducerName: 'information', reducerKey: 'overweight_vehicle'
  })
  // const td_ids = "46152" 
  // const td_ids = td_id

  // useEffect(() => {
  //   if (open && !!td_ids) {
  //     apiGetTruckData(`/api/v1/info/weight/spot/${td_ids}`, {}, false)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [open, td_ids])

  const ApproveOverWeight = useCallback(async () => {
    try {
      const response = await apiPut(`/api/v1/weight/weight_mobile_master_detail/${td_id}/accept_weight_over`, {}, {}, false);
      if (response.success) {
        await apiGetTruckData(`/api/v1/info/weight/spot/${td_id}`, {}, false);
        await onChangeTable()
        await setOpen({ open: false, td_id: '' })
        message.success('บันทึกสำเร็จ');
      } else {
        message.error('บันทึกล้มเหลว');
        await apiGetTruckData(`/api/v1/info/weight/spot/${td_id}`, {}, false);
        await onChangeTable()
      }
    } catch (error) {
      message.error('เกิดข้อผิดพลาดในการบันทึก');
      await apiGetTruckData(`/api/v1/info/weight/spot/${td_id}`, {}, false);
      // await changeTable()
    }
  }, [td_id, apiPut, apiGetTruckData, onChangeTable]);

  const confirmApproveOverWeight = useCallback(() => {
    Modal.confirm({
      title: 'ยืนยันการยอมรับ',
      content: 'ท่านต้องการยืนยันยอมรับน้ำหนักหรือไม่',
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk: () => ApproveOverWeight(),
      onCancel: () => Modal.destroyAll()
    })
  }, [ApproveOverWeight])


  // const convertToBuddhistYear = (date) => {
  //   return dayjs(date).locale('th').format('D MMMM ') + (dayjs(date).year() + 543) + dayjs(date).format(' HH:mm:ss');
  // };

  const formatNumber = (num) => {
    const regex = /^\d{2}-\d{4}$/;
    if (regex.test(num)) {
      return num;
    }
    return num.slice(0, 2) + '-' + num.slice(2);
  };

  // const FetchData = Truckdata?.mobile?.truckdetail?.data

  const vehicle_image = VEHICLE_PROPERTIES[info?.spot?.vehicle_class?.vehicle_class_id]?.vehicle?.image
  const vehicle_width = Math.floor(VEHICLE_PROPERTIES[info?.spot?.vehicle_class?.vehicle_class_id]?.vehicle?.width / 0.8)
  const vehicle_height = Math.floor(VEHICLE_PROPERTIES[info?.spot?.vehicle_class?.vehicle_class_id]?.vehicle?.height / 0.8)

  const truckType = info?.spot?.vehicle_class?.vehicle_class_id
  const displayType = info?.spot?.display_type
  const wheelData = {
    left: {
      wheel1: info?.spot?.axle_left_1 || 0,
      wheel2: info?.spot?.axle_left_2 || 0,
      wheel3: info?.spot?.axle_left_3 || 0,
      wheel4: info?.spot?.axle_left_4 || 0,
      wheel5: info?.spot?.axle_left_5 || 0,
      wheel6: info?.spot?.axle_left_6 || 0,
      wheel7: info?.spot?.axle_left_7 || 0,
    },
    right: {
      wheel1: info?.spot?.axle_right_1 || 0,
      wheel2: info?.spot?.axle_right_2 || 0,
      wheel3: info?.spot?.axle_right_3 || 0,
      wheel4: info?.spot?.axle_right_4 || 0,
      wheel5: info?.spot?.axle_right_5 || 0,
      wheel6: info?.spot?.axle_right_6 || 0,
      wheel7: info?.spot?.axle_right_7 || 0,
    }
  }



  const is_over_weight = info?.spot?.is_over_weight
  const accept_weight = info?.spot?.accept_weight


  const generateApprove = () => {
    if (is_over_weight == 'N' && accept_weight) {
      return (
        <section className="mt-3">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <section>
                <div className="border rounded-lg p-5 h-full">
                  <div className="flex flex-wrap items-center justify-between gap-3 h-full">
                    <Typography.Text className="!text-xl" strong>ยอมรับน้ำหนักเกิน</Typography.Text>
                    <Button
                      type='primary'
                      size='large'
                      className='!w-full sm:!w-auto !bg-[#223179] font-bold border !border-white !text-white'
                      disabled
                    >
                      ยอมรับน้ำหนักแล้ว
                    </Button>
                  </div>
                </div>
              </section>
            </Col>
          </Row>
        </section>
      )
    }
    // if ((is_over_weight == 'Y' || is_over_weight == "P") && allowAdmin(role)) {
    if ((is_over_weight == 'Y' || is_over_weight == "P") && filterDeptType(deptType, role)) {
      return (
        <section className="mt-3">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <section>
                <div className="border rounded-lg p-5 h-full">
                  <div className="flex flex-wrap items-center justify-between gap-3 h-full">
                    <Typography.Text className="!text-xl" strong>ยอมรับน้ำหนักเกิน</Typography.Text>
                    <Button
                      type='primary'
                      size='large'
                      icon={<CheckOutlined />}
                      className='!w-full sm:!w-auto'
                      // onClick={() => ApproveOverWeight()}
                      onClick={() => confirmApproveOverWeight()}
                    >
                      ยอมรับน้ำหนักเกิน
                    </Button>
                  </div>
                </div>
              </section>
            </Col>
          </Row>
        </section>
      )
    }
  }
  return (
    <div>
      <section>
        <Flex align="center" justify="space-between" gap={'0.3rem'} wrap>
          <Typography.Text>สำนัก/แขวง : {info?.spot?.master?.department.name2 || '-'}</Typography.Text>
          <Typography.Text>{dayjs(info?.spot?.master?.create_date).locale('th').format('DD MMMM BBBB HH:mm:ss')}</Typography.Text>
          {/* <Typography.Text>{convertToBuddhistYear(FetchData?.data?.time_stamp) || '-'}</Typography.Text> */}
        </Flex>
      </section>
      {generateApprove()}
      <section className="mt-3">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <section>
              <div className="border rounded-lg p-5 h-full lg:h-32">
                <div className="flex flex-wrap items-center justify-evenly gap-3 h-full">
                  <div className="flex flex-col flex-wrap items-center">
                    <Typography.Text className="!text-xl">ทะเบียน</Typography.Text>
                    {/* <Typography.Text className="!text-xl" strong>{formatNumber(FetchData?.data?.lp_head_no || '')}{FetchData?.data?.lp_head_province_id || '-'} </Typography.Text> */}
                    {/* <Typography.Text className="!text-xl" strong>{formatNumber(FetchData?.data?.lp_head_no || '')} {(typeof parseData(FetchData?.data?.lp_head_province_id) === 'string' ? FetchData?.data?.lp_head_province_id : FetchData?.data?.lp_head_province?.name) || '-'}</Typography.Text> */}
                    <Typography.Text className="!text-xl" strong>{formatNumber(info?.spot?.lp_head_no || '')}</Typography.Text>
                    <Typography.Text className="!text-xl" strong>{info?.mobile?.lp_head_province_name || '-'}</Typography.Text>
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
                        <Typography.Text className="!text-xl" strong>{info?.spot?.gross_weight || '00'} ตัน</Typography.Text>
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
                        <Typography.Text className="!text-xl" strong>{info?.spot?.legal_weight || '00'} ตัน </Typography.Text>
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
                        {is_over_weight == 'Y'
                          ? <Typography.Text className="!text-xl !text-[#FF4A4A]" strong>{info?.spot?.gross_weight_over || '00'} ตัน </Typography.Text>
                          : is_over_weight == 'N' && accept_weight == null
                            ? <Typography.Text className="!text-xl !text-[#56E4EE]" strong>{info?.spot?.gross_weight_over || '00'} ตัน </Typography.Text>
                            : <Typography.Text className="!text-xl !text-[#FF4A4A]" strong>{info?.spot?.gross_weight_over || '00'} ตัน </Typography.Text>
                        }
                      </section>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <div className="border rounded-lg p-3 h-full lg:h-36">
                    <div className="flex flex-col text-center gap-3 h-full">
                      {/* <TruckOutlined className="!block !m-auto !text-3xl !text-white" /> */}
                      <TruckIcon width={37} height={30} customFill='#FFFFFF' className='!block !m-auto' />
                      <section className="flex flex-col text-center">
                        <Typography.Text>ประเภท</Typography.Text>
                        <Typography.Text className="!text-xl" strong>{info?.spot?.vehicle_class?.vehicle_class_desc3 || 'ไม่มี'}</Typography.Text>
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
                      <CheckCircleOutlined className="!block !m-auto !text-3xl !text-white" />
                      <section className="flex flex-col text-center">
                        <Typography.Text>สถานะเข้าชั่ง</Typography.Text>
                        <Typography.Text className="!text-xl" strong>
                          {is_over_weight == 'Y'
                            ? <span className="!text-[#DC3912]">น้ำหนักเกิน</span>
                            : is_over_weight == 'N' && accept_weight == null
                              ? <span className="!text-[#56E4EE]">ไม่เกินพิกัด</span>
                              : <span className="!text-[#DC3912]">น้ำหนักเกิน</span>
                          }
                        </Typography.Text>
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
                        <Typography.Text className="!text-xl" strong>{info?.spot?.material_name == 'null' ? 'ไม่มี' : info?.spot?.material_name || 'ไม่มี'}</Typography.Text>
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
                        <Typography.Text className="!text-xl" strong>
                          {info?.spot?.drive_shaft_over !== null
                            ? <span className="!text-[#DC3912]">{info?.spot?.drive_shaft_over}</span>
                            : <span className="!text-[#56E4EE]">00</span>
                          }
                        </Typography.Text>
                      </section>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <div className="border rounded-lg p-3 h-full lg:h-36">
                    <div className="flex flex-col text-center gap-3 h-full">
                      <CheckCircleOutlined className="!block !m-auto !text-3xl !text-white" />
                      <section className="flex flex-col text-center">
                        <Typography.Text>สถานะเพลา</Typography.Text>
                        <Typography.Text className="!text-xl" strong>
                          {info?.spot?.drive_shaft_over !== null
                            ? <span className="!text-[#DC3912]">เกินพิกัด</span>
                            : <span className="!text-[#56E4EE]">ไม่เกินพิกัด</span>
                          }
                        </Typography.Text>
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
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <div className="rounded-lg p-5 h-52">
              <div className="h-full flex flex-col items-center justify-center gap-3">
                <Image
                  src={vehicle_image}
                  alt="sample-truck"
                  // className="!block !m-auto !h-48"
                  width={vehicle_width}
                  height={vehicle_height}
                />
                <Typography.Text>{info?.spot?.vehicle_class?.vehicle_class_desc3 || '-'}</Typography.Text>
                {/* <div className="text-center">
                </div> */}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <div className="bg-black rounded-lg p-1 h-52">
              <div className="h-full flex justify-center items-center flex-col">
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
                {displayType == 0 ?
                  <Typography.Text>{info?.spot?.gross_weight || '-'} ตัน</Typography.Text> : ''
                }
              </div>
              {/* {displayType == 0 ? <div className="text-center mt-8">
                <Typography.Text>{info?.spot?.gross_weight || '-'} ตัน</Typography.Text> : ''
              </div> : ''} */}
            </div>
          </Col>
        </Row>
      </section>
    </div>

  );
};

const ModalVehicleDetail = (props) => {
  const { open, info, td_id, setOpen, onChangeTable } = props;

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
        {/* <Content
            info={info}
          /> */}
        {/* <Content td_id={td_id} open={open} changeTable={changeTable}/> */}
        {/* <Content td_id={td_id} open={open} onChangeTable={onChangeTable} /> */}
        <Content
          info={info}
          td_id={td_id}
          onChangeTable={onChangeTable}
          setOpen={setOpen}
        />
      </main>
    </Modal>
  );
};

export default React.memo(ModalVehicleDetail);
