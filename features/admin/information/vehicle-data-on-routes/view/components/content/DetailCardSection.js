import React, { useEffect, useMemo } from 'react'
import { VehicleData, RouteData } from '../card'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getRoadDetail } from '@/store/features/informationSlice'
import { getRoadDetailByRoadCode } from '@/store/features/masterSlice'
import { Spin } from 'antd'

const DetailCardSection = (props) => {
  const { id } = props

  const [apiGetRoad, loadRoad, road] = useGetAPI('overlay', {
    funcDispatch: getRoadDetail, reducerName: 'information', reducerKey: 'vehicle_data_on_routes'
  })

  const [apiGetRoadDetail, loadRoadDetail, roadDetail] = useGetAPI('overlay', {
    funcDispatch: getRoadDetailByRoadCode, reducerName: 'master', reducerKey: 'roads'
  })

  useEffect(() => {
    apiGetRoad(`/api/v1/info/current_vehicle_status_summary/road_code/${id}`, {}, false)
    apiGetRoadDetail(`/api/v1/masters/roads/road_code/${id}`, {}, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderVehicleData = useMemo(() => {
    if (!loadRoad) {
      return (
        <VehicleData
          data={road.current_vehicle_status_summary.detail}
        />
      )
    } else {
      return <Spin spinning={loadRoad} />
    }
  }, [road, loadRoad])

  const renderRouteData = useMemo(() => {
    if (!loadRoadDetail) {
      return (
        <RouteData
          data={roadDetail.road_code}
        />
      )
    } else {
      return <Spin spinning={loadRoadDetail} />

    }
  }, [roadDetail, loadRoadDetail])

  return (
    <div>
      <section>
        {renderVehicleData}
      </section>
      <section className='mt-5'>
        {renderRouteData}
      </section>
    </div>
  )
}

export default React.memo(DetailCardSection)
