import React, { useMemo } from 'react'
// import { Spin } from 'antd'
import { useAppSelector } from '@/store/hooks'
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('@/components/map/Map.js'), { ssr: false })

const RegionMap = (props) => {
  const { id, data } = props
  const roadCode = useAppSelector(state => state.master.roads.road_code)
  // const loadRoadCode = useAppSelector(state => state.tasksRunning[`GET:/api/v1/masters/roads/road_code/${id}`])

  const mapGeographicData = useMemo(() => {
    const curr_data = data?.data?.map((item, index) => {
      return {
        plate: item.plate,
        type_desc: item.type_desc,
        kind_desc: item.kind_desc,
        wheel_desc: item.wheel_desc,
        distance_from_road: item.distance_from_road,
        wgt: item.wgt,
        wgt_total: item.wgt_total,
        speed: item.speed,
        coordinates: {
          point: {
            latitude: item.geom.coordinates[1],
            longitude: item.geom.coordinates[0]
          }
        }
      }
    })
    return curr_data
  }, [data])

  const renderMap = useMemo(() => {
    return (
      <Map
        center={[13.736717, 100.523186]}
        zoom={13}
        data={mapGeographicData}
        line={roadCode}
        allowPopup
        hasLine
      />
    )
  }, [mapGeographicData, roadCode])

  return (
    <figure className='rounded-lg h-full'>
      {renderMap}
    </figure>
  )
}

export default React.memo(RegionMap)
