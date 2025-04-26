import React, { useEffect, useMemo } from 'react'
import { Card, Spin } from 'antd'
import { ChartVehicleClass } from '../chart'
// import { useAppSelector } from '@/store/hooks'
import { getVehicleClass } from '@/store/features/dashboardSlice'
import useGetAPI from '@/utils/hooks/api/useGetAPI'

const CardVehicleClass = (props) => {
  const { stationId } = props
  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getVehicleClass, reducerName: 'dashboard', reducerKey: 'vehicle_class'
  })

  useEffect(() => {
    apiGetData(`/api/v1/dashboards/vehicle_class`, { station_id: stationId }, false, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationId])

  const renderContent = useMemo(() => {
    if (!loading) {
      return (
        <ChartVehicleClass
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


export default React.memo(CardVehicleClass)
