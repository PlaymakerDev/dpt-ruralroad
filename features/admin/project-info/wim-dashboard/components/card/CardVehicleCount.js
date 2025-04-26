import React, { useEffect, useMemo } from 'react'
import { Card, Spin } from 'antd'
import { ChartVehicleCount } from '../chart'
// import { useAppSelector } from '@/store/hooks'
import { getVehicleCountHour } from '@/store/features/dashboardSlice'
import useGetAPI from '@/utils/hooks/api/useGetAPI'

const CardVehicleCount = (props) => {
  const { stationId } = props
  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getVehicleCountHour, reducerName: 'dashboard', reducerKey: 'vehicle_count_hour'
  })

  useEffect(() => {
    apiGetData(`/api/v1/dashboards/vehical_count_hour`, { station_id: stationId }, false, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationId])

  const renderContent = useMemo(() => {
    if (!loading) {
      return (
        <ChartVehicleCount
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

export default React.memo(CardVehicleCount)
