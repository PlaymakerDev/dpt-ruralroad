import React, { useEffect, useMemo, useState } from 'react'
import { Badge, Col, Row, Spin, Typography } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import Image from 'next/image'
// import TruckType6 from '@/public/images/truck-img/truck-type/truck-type-6.svg'
// import WheelType6 from '@/public/images/truck-img/wheel-type/wheel-type-6.svg'
// import BigTruck from '@/public/images/big-truck.svg'
// import TruckWheel from '@/public/images/truck-wheel.svg'
import { WEIGHT_STATUS, VEHICLE_PROPERTIES } from '@/utils/constant'
import { TruckIcon, WeightIcon } from '@/components/icon'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import WheelVertical from '@/public/images/truck-img/wheel-vertical/WheelVertical'

dayjs.extend(buddhistEra);
dayjs.extend(customParseFormat);

const ContentOverWeightVehicle = (props) => {
  const { data } = props
  const [truckDate, setTruckDate] = useState('');
  // Mock data with random
  const [randomDisplayType, setRandomDisplayType] = useState()
  const [wheelData, setWheelData] = useState({
    left: {},
    right: {}
  })
  const [loadingTruck, setLoadingTruck] = useState(false)

  const properties = {
    className: 'rounded-xl px-4 py-1 mb-2 bg-[#6C6C6C16]'
  }
  const truckType = data?.data?.vehicle_class_id
  // const truckType = 21
  const vehicle_image = VEHICLE_PROPERTIES[truckType]?.vehicle?.image
  const vehicle_width = Math.floor(VEHICLE_PROPERTIES[truckType]?.vehicle?.width / 2.5)
  const vehicle_height = Math.floor(VEHICLE_PROPERTIES[truckType]?.vehicle?.height / 2.5)


  // const wheel_image = VEHICLE_PROPERTIES[truckType]?.wheel_vertical?.image
  // const wheel_width = Math.floor(VEHICLE_PROPERTIES[truckType]?.wheel_vertical?.width / 7)
  // const wheel_height = Math.floor(VEHICLE_PROPERTIES[truckType]?.wheel_vertical?.height / 7)
  // SIZING_SM_WHEEL
  // const wheel_width_sm = Math.floor(VEHICLE_PROPERTIES[truckType]?.wheel_vertical?.width / 2)
  // const wheel_height_sm = Math.floor(VEHICLE_PROPERTIES[truckType]?.wheel_vertical?.height / 2)
  // SIZING_MD_WHEEL
  // const wheel_width_md = Math.floor(VEHICLE_PROPERTIES[truckType]?.wheel_vertical?.width / 4)
  // const wheel_height_md = Math.floor(VEHICLE_PROPERTIES[truckType]?.wheel_vertical?.height / 4)

  // const matchWheel = useMemo(() => {
  //   let smWheel = [1, 2]
  //   let midWheel = [3, 4, 5, 6, 17]
  //   const checkSmWheel = smWheel.some(item => item === truckType)
  //   const checkMidWheel = midWheel.some(item => item === truckType)
  //   return {
  //     small: checkSmWheel,
  //     mid: checkMidWheel
  //   }
  // }, [data])

  const mapType = useMemo(() => {
    switch (data?.data?.station_type) {
      case 1:
        return data?.data?.station
      case 2:
        return data?.data?.master
      case 3:
        return data?.data?.wim
      default:
        return {}
    }
  }, [data])

  useEffect(() => {
    setLoadingTruck(true)
    if (data?.data?.time_stamp) {
      setTruckDate(dayjs(data.data.time_stamp).locale('th').format('DD MMMM BBBB HH:mm:ss'));
    }
    // Mock data with random
    setRandomDisplayType(data?.data?.display_type)
    setWheelData({
      left: {
        wheel1: data?.data?.axle_left_1 || 0,
        wheel2: data?.data?.axle_left_2 || 0,
        wheel3: data?.data?.axle_left_3 || 0,
        wheel4: data?.data?.axle_left_4 || 0,
        wheel5: data?.data?.axle_left_5 || 0,
        wheel6: data?.data?.axle_left_6 || 0,
        wheel7: data?.data?.axle_left_7 || 0,
      },
      right: {
        wheel1: data?.data?.axle_right_1 || 0,
        wheel2: data?.data?.axle_right_2 || 0,
        wheel3: data?.data?.axle_right_3 || 0,
        wheel4: data?.data?.axle_right_4 || 0,
        wheel5: data?.data?.axle_right_5 || 0,
        wheel6: data?.data?.axle_right_6 || 0,
        wheel7: data?.data?.axle_right_7 || 0,
      }
    });
    setLoadingTruck(false)
  }, [data.data?.axle_left_1, data.data?.axle_left_2, data.data?.axle_left_3, data.data?.axle_left_4, data.data?.axle_left_5, data.data?.axle_left_6, data.data?.axle_left_7, data.data?.axle_right_1, data.data?.axle_right_2, data.data?.axle_right_3, data.data?.axle_right_4, data.data?.axle_right_5, data.data?.axle_right_6, data.data?.axle_right_7, data.data?.display_type, data.data.time_stamp]);

  return (
    <Row gutter={[16, 0]}>
      <Col xs={24} sm={24} md={16} lg={24} xl={24} xxl={24}>
        <section className='text-center'>
          <h1 className='text-[clamp(1px, 4vw, 15px)] font-bold'>รถบรรทุกที่มีน้ำหนักเกินล่าสุด</h1>
        </section>
        <section className='text-center mt-1'>
          <h1 className='text-[clamp(1px, 4vw, 15px)] font-bold underline'>ทะเบียน {data?.data?.lp_head_no || '-'}</h1>
          <Badge color={data?.data?.is_over_weight ? '#FF4A4A' : '#56E4EE'} text={WEIGHT_STATUS[data?.data?.is_over_weight]} /><br />
          <p>{(data?.data?.station_type === 2 ? mapType?.way_code : mapType?.location_description) || '-'}  | {(data?.data?.station_type === 2 ? mapType?.way_province : mapType?.station_name) || '-'}</p>
        </section>
        <figure className='mt-1'>
          {vehicle_image ?
            <Image
              src={vehicle_image}
              alt='vehicle'
              width={vehicle_width || 100}
              height={vehicle_height || 60}
              className='block m-auto'
            // className='block m-auto w-[42%]'
            />
            : null}
        </figure>
        {/* <div className='mt-2 flex flex-col justify-center items-center min-h-28'> */}
        {/* <div className='mt-2 flex flex-col justify-center items-center'>
          <div className='w-fit min-w-32'>
            {!loadingTruck && (
              <WheelVertical
                displayType={randomDisplayType}
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
            )}
          </div>
        </div> */}
        {randomDisplayType == 0 ? (
          <section className='mt-1 text-center '>
            <p className='text-[clamp(1px, 4vw, 15px)] font-bold'>{data?.data?.gross_weight || 0} ตัน</p>
          </section>
        ) : ''}
      </Col>
      <Col xs={24} sm={24} md={8} lg={24} xl={24} xxl={24}>
        <figcaption {...properties}>
          <div className='flex flex-wrap sm:flex-nowrap gap-3 items-center'>
            <section className='sm:basis-1/12 md:basis-1/6'>
              <TruckIcon width={23} height={16} color='#FFFFFF' />
            </section>
            <section className='sm:basis-full'>
              <div className='flex flex-col'>
                <p className='text-[clamp(1px, 4vw, 15px)]'>ประเภทรถบรรทุก</p>
                <p className='text-[clamp(1px, 4vw, 15px)]'>{`${data?.data?.vehicle_class?.vehicle_class_desc2 || '-'} (${data?.data?.legal_weight || 0} ตัน`})</p>
                <p className='text-[clamp(1px, 4vw, 15px)]'>{data?.data?.vehicle_class?.vehicle_class_desc3 || '-'}</p>
              </div>
            </section>
          </div>
        </figcaption>
        <figcaption {...properties}>
          <div className='flex flex-wrap sm:flex-nowrap gap-3 items-center'>
            <section className='sm:basis-1/12 md:basis-1/6'>
              <WeightIcon fill='#FFFFFF' />
            </section>
            <section className='sm:basis-full'>
              <div className='flex flex-col'>
                <p className='text-[clamp(1px, 4vw, 15px)]'>น้ำหนักที่ชั่งได้</p>
                <p className='text-[clamp(1px, 4vw, 15px)] font-bold'>{data?.data?.gross_weight || 0} ตัน</p>
              </div>
            </section>
          </div>
        </figcaption>
        {/* <figcaption {...properties}>
          <div className='flex flex-wrap sm:flex-nowrap gap-3 items-center'>
            <section className='sm:basis-1/12 md:basis-1/6'>
              <WeightIcon fill='#FFFFFF' />
            </section>
            <section className='sm:basis-full'>
              <div className='flex flex-col'>
                <p className='text-[clamp(1px, 4vw, 15px)]'>น้ำหนักตามกฎหมาย</p>
                <p className='text-[clamp(1px, 4vw, 15px)] font-bold'>{data?.data?.legal_weight || 0} ตัน</p>
              </div>
            </section>
          </div>
        </figcaption> */}
        <figcaption {...properties}>
          <div className='flex flex-wrap sm:flex-nowrap gap-3 items-center'>
            <section className='sm:basis-1/12 md:basis-1/6'>
              <WeightIcon fill='#FFFFFF' />
            </section>
            <section className='sm:basis-full'>
              <div className='flex flex-col'>
                <p className='text-[clamp(1px, 4vw, 15px)]'>น้ำหนักที่เกิน</p>
                <p className={`text-[clamp(1px, 4vw, 15px)] ${data?.data?.is_over_weight === 'Y' ? 'text-[#FF4A4A]' : 'text-[#56E4EE]'}`}>
                  {`${data?.data?.gross_weight_over || 0} ตัน (${data?.data?.gross_weight_over || 0}%)`}
                </p>
              </div>
            </section>
          </div>
        </figcaption>
        {/* <figcaption {...properties}>
          <div className='flex flex-wrap sm:flex-nowrap gap-3 items-center'>
            <section className='sm:basis-1/12 md:basis-1/6'>
              <WeightIcon fill='#FFFFFF' />
            </section>
            <section className='sm:basis-full'>
              <div className='flex flex-col'>
                <p className='text-[clamp(1px, 4vw, 15px)]'>เปอร์เซ็นต์ที่เกิน</p>
                <p className={`text-[clamp(1px, 4vw, 15px)] ${data?.data?.is_over_weight === 'Y' ? 'text-[#FF4A4A]' : 'text-[#56E4EE]'}`} strong>{data?.data?.gross_weight_over || 0} ตัน</p>
              </div>
            </section>
          </div>
        </figcaption> */}
        <figcaption {...properties} className={`${properties.className} !mb-0`}>
          <div className='flex flex-wrap sm:flex-nowrap gap-3 items-center'>
            <section className='sm:basis-1/12 md:basis-1/6'>
              <CalendarOutlined className='!text-2xl !text-white' />
            </section>
            <section className='sm:basis-full'>
              <div className='flex flex-col'>
                <p className='text-[clamp(1px, 4vw, 15px)]'>วันที่/เวลา</p>
                <p className='text-[clamp(1px, 4vw, 15px)]'>{truckDate}</p>
              </div>
            </section>
          </div>
        </figcaption>
      </Col>
    </Row>
  )
}

export default React.memo(ContentOverWeightVehicle)
