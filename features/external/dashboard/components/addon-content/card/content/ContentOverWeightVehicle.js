import React, { useEffect, useMemo, useState } from 'react'
import { Badge, Col, Row, Typography } from 'antd'
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




  const properties = {
    className: 'rounded-xl px-4 py-1 mb-2 bg-[#6C6C6C16]'
  }
  const truckType = data?.data?.vehicle_class_id
  // const truckType = 21



  const vehicle_image = VEHICLE_PROPERTIES[truckType]?.vehicle?.image
  const vehicle_width = Math.floor(VEHICLE_PROPERTIES[truckType]?.vehicle?.width / 2.5)
  const vehicle_height = Math.floor(VEHICLE_PROPERTIES[truckType]?.vehicle?.height / 2.5)


  const wheel_image = VEHICLE_PROPERTIES[truckType]?.wheel_vertical?.image
  const wheel_width = Math.floor(VEHICLE_PROPERTIES[truckType]?.wheel_vertical?.width / 7)
  const wheel_height = Math.floor(VEHICLE_PROPERTIES[truckType]?.wheel_vertical?.height / 7)
  // SIZING_SM_WHEEL
  const wheel_width_sm = Math.floor(VEHICLE_PROPERTIES[truckType]?.wheel_vertical?.width / 2)
  const wheel_height_sm = Math.floor(VEHICLE_PROPERTIES[truckType]?.wheel_vertical?.height / 2)
  // SIZING_MD_WHEEL
  const wheel_width_md = Math.floor(VEHICLE_PROPERTIES[truckType]?.wheel_vertical?.width / 4)
  const wheel_height_md = Math.floor(VEHICLE_PROPERTIES[truckType]?.wheel_vertical?.height / 4)



  const matchWheel = useMemo(() => {
    let smWheel = [1, 2]
    let midWheel = [3, 4, 5, 6, 17]
    const checkSmWheel = smWheel.some(item => item === truckType)
    const checkMidWheel = midWheel.some(item => item === truckType)
    return {
      small: checkSmWheel,
      mid: checkMidWheel
    }
  }, [data])



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
    if (data?.data?.time_stamp) {
      const formattedDate = dayjs(data.data.time_stamp).locale('th').format('DD MMMM BBBB HH:mm:ss');
      setTruckDate(formattedDate);
    }


    // Mock data with random
    setRandomDisplayType(Math.floor(Math.random() * 2) + 1)
    const generateRandomWheelData = () => {
      const randomLeft = {};
      const randomRight = {};
      for (let i = 1; i <= 7; i++) {
        randomLeft[`wheel${i}`] = Math.floor(Math.random() * 51);
        randomRight[`wheel${i}`] = Math.floor(Math.random() * 51);
      }
      return { left: randomLeft, right: randomRight };
    };
    setWheelData(generateRandomWheelData());

  }, [data?.data?.time_stamp]);


  return (
    <Row gutter={[16, 16]}>

      <Col xs={24} sm={24} md={16} lg={24} xl={24} xxl={24}>
        <section className='text-center'>
          <Typography.Title level={5} className='!m-0'>รถบรรทุกที่มีน้ำหนักเกินล่าสุด</Typography.Title>
        </section>
        <section className='text-center mt-5'>
          <Typography.Title level={5} className='!m-0 !-mt-2' underline>ทะเบียน {data?.data?.lp_head_no || '-'}</Typography.Title>
          <Badge color={data?.data?.is_over_weight ? '#FF4A4A' : '#56E4EE'} text={WEIGHT_STATUS[data?.data?.is_over_weight]} /><br />

          <Typography.Text>{(data?.data?.station_type === 2 ? mapType?.way_code : mapType?.location_description) || '-'}  | {(data?.data?.station_type === 2 ? mapType?.way_province : mapType?.station_name) || '-'}</Typography.Text>
        </section>
        <figure className='mt-1'>
          <Image
            src={vehicle_image || '/images/truck-default.svg'}
            alt='vehicle'
            width={vehicle_width || 100}
            height={vehicle_height || 70}
            className='block m-auto'
          // className='block m-auto w-[42%]'
          />

        </figure>
        <div className='mt-2  flex flex-col justify-center items-center min-h-28'>
          <div className=' w-fit min-w-32'>
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
          </div>
        </div>
        {randomDisplayType == 1 ? <section className='mt-1 text-center '>
          <Typography.Text className='!text-base' strong>{data?.data?.gross_weight || 0} ตัน</Typography.Text>
        </section> : ''}
      </Col>

      <Col xs={24} sm={24} md={8} lg={24} xl={24} xxl={24} className='-mt-4'>
        <figcaption {...properties}>
          <div className='flex flex-wrap sm:flex-nowrap gap-3 items-center'>
            <section className='sm:basis-1/12 md:basis-1/6'>
              <TruckIcon width={23} height={16} customFill='#FFFFFF' />
            </section>
            <section className='sm:basis-full'>
              <div className='flex flex-col'>
                <Typography.Text className='!text-sm '>ประเภทรถบรรทุก</Typography.Text>

                <Typography.Text className='!text-sm'>{data?.data?.vehicle_class?.vehicle_class_desc2 || '-'}</Typography.Text>
                <Typography.Text className='!text-sm'>{data?.data?.vehicle_class?.vehicle_class_desc3 || '-'}</Typography.Text>
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
                <Typography.Text className='!text-sm'>น้ำหนักที่ชั่งได้</Typography.Text>
                <Typography.Text className='!text-sm' strong>{data?.data?.gross_weight || 0} ตัน</Typography.Text>
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
                <Typography.Text className='!text-sm'>น้ำหนักตามกฎหมาย</Typography.Text>
                <Typography.Text className='!text-sm' strong>{data?.data?.legal_weight || 0} ตัน</Typography.Text>
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
                <Typography.Text className='!text-sm'>น้ำหนักที่เกิน</Typography.Text>

                <Typography.Text className={`!text-sm ${data?.data?.is_over_weight === 'Y' ? '!text-[#FF4A4A]' : '!text-[#56E4EE]'}`} strong>{data?.data?.gross_weight_over} ตัน</Typography.Text>
              </div>
            </section>
          </div>
        </figcaption>
        <figcaption {...properties} className={`${properties.className} !mb-0`}>
          <div className='flex flex-wrap sm:flex-nowrap gap-3 items-center'>
            <section className='sm:basis-1/12 md:basis-1/6'>
              <CalendarOutlined className='!text-2xl !text-white' />
            </section>
            <section className='sm:basis-full'>
              <div className='flex flex-col'>
                <Typography.Text className='!text-sm'>วันที่/เวลา</Typography.Text>
                <Typography.Text className='!text-sm'>{truckDate}</Typography.Text>
              </div>
            </section>
          </div>
        </figcaption>
      </Col>

    </Row >
  )
}

export default React.memo(ContentOverWeightVehicle)
