import React, { useEffect, useMemo } from 'react'
import { Card, Spin } from 'antd'
import { ChartLastSevenDays } from '../chart'
// import { useAppSelector } from '@/store/hooks'
import { getLastSevenDays } from '@/store/features/dashboardSlice'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { useWIMContext } from '../../context'
import { useAppSelector } from '@/store/hooks'

const CardLastSevenDays = (props) => {
  const { stationId } = props
  const data = useAppSelector(state => state.dashboard.last_seven_days)
  const { loadingLastSevenDays } = useWIMContext()
  // const [apiGetData, loading, data] = useGetAPI('overlay', {
  //   funcDispatch: getLastSevenDays, reducerName: 'dashboard', reducerKey: 'last_seven_days'
  // })

  // useEffect(() => {
  //   apiGetData(`/api/v1/dashboards/last_7_days`, { station_id: stationId }, false, {})
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [stationId])

  // const renderContent = useMemo(() => {
  //   if (!loading) {
  //     return (
  //       <ChartLastSevenDays
  //         data={data.data}
  //       />
  //     )
  //   } else {
  //     return (
  //       <div className='text-center'>
  //         <Spin spinning={loading} />
  //       </div>
  //     )
  //   }
  // }, [loading, data])
  const renderContent = useMemo(() => {
    if (!loadingLastSevenDays) {
      return (
        <ChartLastSevenDays
          data={data.data}
        />
      )
    } else {
      return (
        // <div className='text-center'>
        //   <Spin spinning={loadingLastSevenDays} />
        // </div>
        <Spin spinning={loadingLastSevenDays}>
          <ChartLastSevenDays
            data={data.data}
          />
        </Spin>
      )
    }
  }, [loadingLastSevenDays, data])

  return (
    <div className="card-container rounded-md p-2">
      {renderContent}
    </div>
  )
}

export default React.memo(CardLastSevenDays)
