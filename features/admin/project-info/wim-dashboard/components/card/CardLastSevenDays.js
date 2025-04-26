import React, { useEffect, useMemo } from 'react'
import { Card, Spin } from 'antd'
import { ChartLastSevenDays } from '../chart'
// import { useAppSelector } from '@/store/hooks'
import { getLastSevenDays } from '@/store/features/dashboardSlice'
import useGetAPI from '@/utils/hooks/api/useGetAPI'

const CardLastSevenDays = (props) => {
  const { stationId } = props
  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getLastSevenDays, reducerName: 'dashboard', reducerKey: 'last_seven_days'
  })

  useEffect(() => {
    apiGetData(`/api/v1/dashboards/last_7_days`, { station_id: stationId }, false, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationId])

  const renderContent = useMemo(() => {
    if (!loading) {
      return (
        <ChartLastSevenDays
          data={data.data}
        />
      )
    } else {
      return (
        <div className='text-center'>
          <Spin spinning={loading} />
        </div>
      )
    }
  }, [loading, data])

  return (
    <Card className='!w-full !h-full '>
      {renderContent}
    </Card>
  )
}

export default React.memo(CardLastSevenDays)
