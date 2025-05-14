import React, { useEffect, useMemo } from 'react'
import { Card, Spin } from 'antd'
import { ChartWeighingStation, ChartWeighingWIM, ChartWeighingMobile } from '../chart'
// SWIPER
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// SWIPER CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import {
  getVehicleWeightInspectionForStation as getStation,
  getVehicleWeightInspectionForWIM as getWIM,
  getVehicleWeightInspectionForMobile as getMobile
} from '@/store/features/dashboardSlice'
import dayjs from 'dayjs';
import { div } from '@/utils/calculate';

const CardWeighingStation = (props) => {
  const { } = props
  // GET DATA
  const [apiGetStation, loadingStation, station] = useGetAPI('overlay', {
    funcDispatch: getStation, reducerName: 'dashboard', reducerKey: 'vehicle_weight_inspection'
  })

  const [apiGetWIM, loadingWIM, wim] = useGetAPI('overlay', {
    funcDispatch: getWIM, reducerName: 'dashboard', reducerKey: 'vehicle_weight_inspection'
  })

  const [apiGetMobile, loadingMobile, mobile] = useGetAPI('overlay', {
    funcDispatch: getMobile, reducerName: 'dashboard', reducerKey: 'vehicle_weight_inspection'
  })

  useEffect(() => {
    apiGetStation(`/api/v1/dashboards/vehicle_weight_inspection`, { ...station.station.search, date: dayjs().format('YYYY-MM-DD'), number_day: 6, station_type_id: 1 }, false, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    apiGetWIM(`/api/v1/dashboards/vehicle_weight_inspection`, { ...wim.wim.search, date: dayjs().format('YYYY-MM-DD'), number_day: 6, station_type_id: 3 }, false, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    apiGetMobile(`/api/v1/dashboards/vehicle_weight_inspection`, { ...mobile.mobile.search, date: dayjs().format('YYYY-MM-DD'), number_day: 6, station_type_id: 2 }, false, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderStation = useMemo(() => {
    if (!loadingStation && typeof loadingStation !== 'undefined') {
      return (
        <ChartWeighingStation
          data={station.station.data}
          loading={loadingStation}
        />
      )
    } else {
      return <Spin spinning={loadingStation} />
    }
  }, [loadingStation, station])

  const renderWIM = useMemo(() => {
    if (!loadingWIM && typeof loadingWIM !== 'undefined') {
      return (
        <ChartWeighingWIM
          data={wim.wim.data}
          loading={loadingWIM}
        />
      )
    } else {
      return <Spin spinning={loadingWIM} />
    }
  }, [loadingWIM, wim])

  const renderMobile = useMemo(() => {
    if (!loadingMobile && typeof loadingMobile !== 'undefined') {
      return (
        <ChartWeighingMobile
          data={mobile.mobile.data}
          loading={loadingMobile}
        />
      )
    } else {
      return <Spin spinning={loadingMobile} />
    }
  }, [loadingMobile, mobile])

  return (
    // <div className='!h-full '>
    <div className='card-container rounded-md p-2 h-full'>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        navigation
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: (_, className) => {
            return '<span class="' + className + '" /></span>';
          },
        }}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true
        }}
      >
        <SwiperSlide>{renderStation}</SwiperSlide>
        <SwiperSlide>{renderWIM}</SwiperSlide>
        <SwiperSlide>{renderMobile}</SwiperSlide>
      </Swiper>
      <div className='swiper-pagination ' />
    </div>
    // </div>
  )
}

export default React.memo(CardWeighingStation)
