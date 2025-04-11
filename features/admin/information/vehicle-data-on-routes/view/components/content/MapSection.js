import React, { useCallback, useEffect, useMemo } from 'react'
import { RegionMap } from '../map'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getVehicleStatus } from '@/store/features/informationSlice'
import { Button, Spin } from 'antd'

const MapSection = (props) => {
  const { id, refSubmit } = props
  const [apiGetRoad, loadingRoad, road] = useGetAPI('overlay', {
    funcDispatch: getVehicleStatus, reducerName: 'information', reducerKey: 'vehicle_data_on_routes'
  })

  useEffect(() => {
    apiGetRoad(`/api/v1/info/current_vehicle_status`, {
      ...road.search,
      page: 1,
      page_size: 5000,
      is_on_assigned_road: true,
      road_codes: [id]
    }, false)
    // const interval = setInterval(() => {
    // }, 10000)
    // return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onReloadMap = useCallback(() => {
    apiGetRoad(`/api/v1/info/current_vehicle_status`, {
      ...road.search,
      page: 1,
      page_size: 5000,
      is_on_assigned_road: true,
      road_codes: [id]
    }, false)
  }, [apiGetRoad, id, road.search])

  const renderRegionMap = useMemo(() => {
    if (!loadingRoad) {
      return (
        <RegionMap
          id={id}
          data={road.current_vehicle_status}
        />
      )
    } else {
      return <Spin spinning={loadingRoad} />
    }
  }, [loadingRoad, road, id])


  return (
    <div className='h-full'>
      <button ref={refSubmit} hidden onClick={() => onReloadMap()} />
      {/* <section className='mb-3'>
        <Button
          type='primary'
          htmlType='button'
          onClick={() => onReloadMap()}
          loading={loadingRoad}
        >
          อัปเดทข้อมูลสายทาง
        </Button>
      </section> */}
      {renderRegionMap}
    </div>
  )
}

export default React.memo(MapSection)
