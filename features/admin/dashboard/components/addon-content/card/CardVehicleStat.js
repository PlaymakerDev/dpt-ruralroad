import React, { useMemo, useEffect } from 'react'
import { ContentVehicleStat } from './content'
// REDUX-STATE
// import { useAppSelector } from '@/store/hooks'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getDailyWeighedVehiclesCheckpoint, getDailyWeighedVehiclesSum } from '@/store/features/dashboardSlice'
import dayjs from 'dayjs'
import { Spin } from 'antd'

const CardVehicleStat = (props) => {
  const { accessType } = props
  // const data = useAppSelector(state => state.dashboard.daily_weighed_vehicles_sum.data)
  // const loading = useAppSelector(state => state.tasksRunning['GET:/api/v1/dashboards/daily_weighed_vehicles_sum'])
  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getDailyWeighedVehiclesSum, reducerName: 'dashboard', reducerKey: 'daily_weighed_vehicles_sum'
  })

  const [apiGetCheckpoint, loadingCheckpoint, checkpoint] = useGetAPI('overlay', {
    funcDispatch: getDailyWeighedVehiclesCheckpoint, reducerName: 'dashboard', reducerKey: 'daily_weighed_vehicles_checkpoint'
  })

  useEffect(() => {
    // apiGetData(`/api/v1/dashboards/daily_weighed_vehicles_sum`, { ...data.search, date: dayjs().format('YYYY-MM-DD') }, false, {})
    apiGetData(`/api/v1/dashboards/daily_weighed_vehicles_sum`, { ...data.search, date: dayjs().format('YYYY-MM-DD') }, false, {})
    apiGetCheckpoint(`/api/v1/dashboards/total_station`, { ...data.search, date: dayjs().format('YYYY-MM-DD') }, false, {})
    // apiGetData(`/api/v1/dashboards/daily_weighed_vehicles_sum`, { ...data.search, date: '2023-10-18' }, false, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filterData = {
    station: data?.data?.items?.find(item => item.station_type_eng === "station") || {},
    wim: data?.data?.items?.find(item => item.station_type_eng === "wim") || {},
    spot: data?.data?.items?.find(item => item.station_type_eng === "spot") || {},
    all_sum: data?.data?.all_sum || {}
  }


  // const renderContent = useMemo(() => {
  //   if (!loadingCheckpoint && !loading) {
  //     return (
  //       <ContentVehicleStat
  //         filterData={filterData}
  //         checkpoint={checkpoint.data}
  //         accessType={accessType}
  //       />
  //     )
  //   } else {
  //     return (
  //       <div className='text-center'>
  //         <Spin spinning={true} />
  //       </div>
  //     )
  //   }
  // }, [loading, data, loadingCheckpoint])

  return (
    <>
      {/* {renderContent} */}
      <ContentVehicleStat
        loading={loading}
        filterData={filterData}
        checkpoint={checkpoint.data}
        accessType={accessType}
      />
    </>
  )
}

export default React.memo(CardVehicleStat)
