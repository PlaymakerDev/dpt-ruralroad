import React, { useState } from 'react'
import { Card, Row, Col, Typography } from 'antd'
import Image from 'next/image'
// SVG
// import TruckInspect from '@/public/images/truck-inspect.svg'
// import TruckWIM from '@/public/images/truck-wim.svg'
// import TruckWeight from '@/public/images/truck-weight.svg'
// STRING FORMAT
import stf from '@/utils/stringformat'
import TruckOverAll from '@/components/icon/TruckOverAll'
import TruckInspect from '@/components/icon/TruckInspect'
import TruckWim from '@/components/icon/TruckWim'
import TruckWeight from '@/components/icon/TruckWeight'
import { getDailyWeighedVehiclesSumStation, getDailyWeighedVehiclesSumWIM, getDailyWeighedVehiclesSumSpot } from '@/store/features/dashboardSlice'
import useGetAPI from '@/utils/hooks/api/useGetAPI';
import dayjs from 'dayjs';
import "dayjs/locale/th";
import ModaldailyWeighed from '../../modal/ModaldailyWeighed'
import { STATION_TYPE } from '@/utils/constant'

const INIT_MODAL = { open: false, key: null, info: {} }

const ContentVehicleStat = (props) => {
  const { filterData , checkpoint } = props
  const [open, setOpen] = useState(INIT_MODAL)

  const gridProperties = {
    className: '!w-full sm:!w-full md:!w-2/4 xl:!w-1/4 !text-center !border-none  '
  }

  const [funcGet, loadingGet, dataGet] = useGetAPI('overlay', {
    funcDispatch: getDailyWeighedVehiclesSumStation, reducerName: 'dashboard', reducerKey: 'daily_weighed_vehicles_sum_stationdata'
  })

  const [funcGetWim, loadingWim, dataGetWim] = useGetAPI('overlay', {
    funcDispatch: getDailyWeighedVehiclesSumWIM, reducerName: 'dashboard', reducerKey: 'daily_weighed_vehicles_sum_wim'
  })

  const [funcGetSumSpot, loadingGetSumSpot, dataGetSumSpot] = useGetAPI('overlay', {
    funcDispatch: getDailyWeighedVehiclesSumSpot, reducerName: 'dashboard', reducerKey: 'daily_weighed_vehicles_sum_spot'
  })

  const GetSumStation = async () => {
    const res = await funcGet(`/api/v1/dashboards/daily_weighed_vehicles_sum_station`, { date: dayjs().format('YYYY-MM-DD') }, false, {})
    if (res?.success) {
      setOpen({ open: true, key: 'sum_station', info: res?.data })
    }
  }

  const GetWim = async () => {
    const res = await funcGetWim(`/api/v1/dashboards/daily_weighed_vehicles_sum_wim`, { date: dayjs().format('YYYY-MM-DD') }, false, {})
    if (res?.success) {
      setOpen({ open: true, key: 'sum_wim', info: res?.data })
    }
  }

  const GetSumSpot = async () => {
    const res = await funcGetSumSpot(`/api/v1/dashboards/daily_weighed_vehicles_sum_spot`, { date: dayjs().format('YYYY-MM-DD') }, false, {})
    if (res?.success) {
      setOpen({ open: true, key: 'sum_spot', info: res?.data })
    }
  }
 

  return (
    <>
      <Card className='!w-full !h-full !border !overflow-hidden' styles={{ body: { padding: 0, margin: 0 } }}>
        <Row className='!w-full !h-full'>
          <Col {...gridProperties} onClick={() => GetSumStation()} style={{ cursor: 'pointer' }}>
            <Card styles={{ body: { padding: "8px 12px", margin: 0 } }} className='!h-full border !rounded-[0px] !border-t-0 !border-b !border-l-0 !border-r '>
              <div className='flex justify-center mb-2'>
                <TruckOverAll className='block m-auto' />
              </div>
              <Typography.Title level={5} style={{ fontSize: 'clamp(1px, 100%, 13px)' }} >รวมรถเข้าชั่งทั้งหมด</Typography.Title>
              <div className='-mt-2'>
                <Typography.Text className='!text-xs'>สถานีที่เปิดอยู่</Typography.Text>
                <Typography.Text className={`!text-xs ${checkpoint?.all?.open > 0 ? '!text-[#90FF00]' : ''}`}> {checkpoint?.all?.open || 0} </Typography.Text>
                <Typography.Text className='!text-xs'>/ {checkpoint?.all?.total || 0}</Typography.Text>
              </div>
              <Row gutter={[16, 16]}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className='-mt-2'>
                  <Typography.Text className='!text-sm'>จำนวนรถเข้าชั่ง</Typography.Text><br />
                  <Typography.Text className='!text-xl !font-IBMPlexSansThaiBold'>{stf(filterData?.all_sum?.total).normal() || 0}</Typography.Text><br />
                  <Typography.Text className='!text-sm !font-IBMPlexSansThaiBold'>คัน</Typography.Text>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className='-mt-2'>
                  <Typography.Text className='!text-sm'>บรรจุเกิน</Typography.Text><br />
                  <Typography.Text className='!text-xl !font-IBMPlexSansThaiBold !text-[#E81A1A]'>{stf(filterData?.all_sum?.over).normal() || 0}</Typography.Text><br />
                  <Typography.Text className='!text-sm !font-IBMPlexSansThaiBold !text-[#E81A1A]'>คัน</Typography.Text>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col {...gridProperties} onClick={() => GetSumSpot()} style={{ cursor: 'pointer' }}>
            <Card styles={{ body: { padding: "8px 12px", margin: 0 } }} className='!h-full border !rounded-[0px] !border-t-0 !border-b !border-l-0 !border-r'>
              <div className='flex justify-center mb-2'>
                <TruckWeight className='block m-auto' />
              </div>
              <Typography.Title level={5} style={{ fontSize: 'clamp(1px, 100%, 13px)' }} >หน่วยตรวจสอบเคลื่อนที่</Typography.Title>
              <div className='-mt-2'>
                <Typography.Text className='!text-xs'>หน่วยงานที่เปิดอยู่</Typography.Text>
                <Typography.Text className={`!text-xs ${checkpoint?.mobile?.open > 0 ? '!text-[#90FF00]' : ''}`}> {checkpoint?.mobile?.open} </Typography.Text>
                <Typography.Text className='!text-xs'>/ {checkpoint?.mobile?.total}</Typography.Text>
              </div>
              <Row gutter={[16, 16]}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className='-mt-2'>
                  <Typography.Text className='!text-sm'>จำนวนรถเข้าชั่ง</Typography.Text><br />
                  <Typography.Text className='!text-xl !font-IBMPlexSansThaiBold'>{stf(filterData?.spot?.total).normal() || 0}</Typography.Text><br />
                  <Typography.Text className='!text-sm !font-IBMPlexSansThaiBold'>คัน</Typography.Text>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className='-mt-2'>
                  <Typography.Text className='!text-sm'>บรรจุเกิน</Typography.Text><br />
                  <Typography.Text className='!text-xl !font-IBMPlexSansThaiBold !text-[#E81A1A]'>{stf(filterData?.spot?.over).normal() || 0}</Typography.Text><br />
                  <Typography.Text className='!text-sm !font-IBMPlexSansThaiBold !text-[#E81A1A]'>คัน</Typography.Text>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col {...gridProperties} onClick={() => GetWim()} style={{ cursor: 'pointer' }}>
            <Card styles={{ body: { padding: "8px 12px", margin: 0 } }} className='!h-full border !rounded-[0px] !border-t-0 !border-b !border-l-0 !border-r'>
              <div className='flex justify-center mb-2'>
                <TruckInspect className='block m-auto' />
              </div>
              <Typography.Title level={5} style={{ fontSize: 'clamp(1px, 100%, 13px)' }}>Weight In Motion (WIM)</Typography.Title>
              <div className='-mt-2'>
                <Typography.Text className='!text-xs'>สถานีที่เปิดอยู่</Typography.Text>
                <Typography.Text className={`!text-xs ${checkpoint?.wim?.open > 0 ? '!text-[#90FF00]' : ''}`}> {checkpoint?.wim?.open} </Typography.Text>
                <Typography.Text className='!text-xs'>/ {checkpoint?.wim?.total}</Typography.Text>
              </div>
              <Row gutter={[16, 16]}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className='-mt-2'>
                  <Typography.Text className='!text-sm'>จำนวนรถเข้าชั่ง</Typography.Text><br />
                  <Typography.Text className='!text-xl !font-IBMPlexSansThaiBold'>{stf(filterData?.wim?.total).normal() || 0}</Typography.Text><br />
                  <Typography.Text className='!text-sm !font-IBMPlexSansThaiBold'>คัน</Typography.Text>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className='-mt-2'>
                  <Typography.Text className='!text-sm'>บรรจุเกิน</Typography.Text><br />
                  <Typography.Text className='!text-xl !font-IBMPlexSansThaiBold !text-[#E81A1A]'>{stf(filterData?.wim?.over).normal() || 0}</Typography.Text><br />
                  <Typography.Text className='!text-sm !font-IBMPlexSansThaiBold !text-[#E81A1A]'>คัน</Typography.Text>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col {...gridProperties} onClick={() => GetSumStation()} style={{ cursor: 'pointer' }}>
            <Card styles={{ body: { padding: "8px 12px", margin: 0 } }} className='!h-full border !rounded-[0px] !border-t-0 !border-b !border-l-0 !border-r' >
              <div className='flex justify-center mb-2'>
                <TruckWim className='block m-auto' />
              </div>
              <Typography.Title level={5} style={{ fontSize: 'clamp(1px, 100%, 13px)' }} >สถานีตรวจสอบน้ำหนัก</Typography.Title>
              <div className='-mt-2'>
                <Typography.Text className='!text-xs'>สถานีที่เปิดอยู่</Typography.Text>
                <Typography.Text className={`!text-xs ${checkpoint?.station?.open > 0 ? '!text-[#90FF00]' : ''}`}> {checkpoint?.station?.open} </Typography.Text>
                <Typography.Text className='!text-xs'>/ {checkpoint?.station?.total}</Typography.Text>
              </div>
              <Row gutter={[16, 16]}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className='-mt-2'>
                  <Typography.Text className='!text-sm'>จำนวนรถเข้าชั่ง</Typography.Text><br />
                  <Typography.Text className='!text-xl !font-IBMPlexSansThaiBold'>{stf(filterData?.station?.total).normal() || 0}</Typography.Text><br />
                  <Typography.Text className='!text-sm !font-IBMPlexSansThaiBold'>คัน</Typography.Text>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className='-mt-2'>
                  <Typography.Text className='!text-sm'>บรรจุเกิน</Typography.Text><br />
                  <Typography.Text className='!text-xl !font-IBMPlexSansThaiBold !text-[#E81A1A]'>{stf(filterData?.station?.over).normal() || 0}</Typography.Text><br />
                  <Typography.Text className='!text-sm !font-IBMPlexSansThaiBold !text-[#E81A1A]'>คัน</Typography.Text>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
      {open.open && <ModaldailyWeighed open={open.open} data={open} setOpen={setOpen} />}
    </>
  )
}

export default React.memo(ContentVehicleStat)
