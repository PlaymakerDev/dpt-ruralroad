import React, { useEffect, useMemo } from 'react'
import { Card, Spin } from 'antd'
import { ChartVehicleAvgSpeed } from '../chart'
// import { useAppSelector } from '@/store/hooks'
import { getVehicleAvgSpeedHour } from '@/store/features/dashboardSlice'
import useGetAPI from '@/utils/hooks/api/useGetAPI'

const CardVehicleAvgSpeed = (props) => {
  const { stationId } = props
  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getVehicleAvgSpeedHour, reducerName: 'dashboard', reducerKey: 'vehicle_avgspeed_hour'
  })

  useEffect(() => {
    apiGetData(`/api/v1/dashboards/vehical_avgspeed_hour`, { station_id: stationId }, false, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationId])

  const renderContent = useMemo(() => {
    if (!loading) {
      return (
        <ChartVehicleAvgSpeed
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

export default React.memo(CardVehicleAvgSpeed)
