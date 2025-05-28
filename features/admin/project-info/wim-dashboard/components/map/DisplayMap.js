import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getPositionDetail } from '@/store/features/dashboardSlice'
import { Spin } from 'antd'
import dynamic from 'next/dynamic'
const SpecMap = dynamic(() => import('./SpecMap'), { ssr: false })

const INIT_POSITION = { location: [13.736717, 100.523186], zoom: 5 }

const DisplayMap = (props) => {
  const { stationId, stationType } = props
  const [position, setPosition] = useState(INIT_POSITION)

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getPositionDetail, reducerName: 'dashboard', reducerKey: 'position'
  })

  useEffect(() => {
    getPositionData(stationId, stationType)
  }, [stationId, stationType])

  const getPositionData = useCallback(async (station_id, StationType) => {
    const response = await apiGetData('/api/v1/dashboards/position_by_id', { station_id: station_id, StationType: StationType }, false)
    if (response) {
      let data = response[0]
      setPosition({ location: [Number(data?.Latitude), Number(data?.Longtitude)], zoom: 5 })
    }
  }, [])

  const renderSpecMap = useMemo(() => {
    if (!loading) {
      return (
        <SpecMap
          center={position.location}
          zoom={position.zoom}
          data={data.detail.data}
        />
      )
    } else {
      return (
        <Spin spinning={loading}>
          <SpecMap
            center={position.location}
            zoom={position.zoom}
            data={data.detail.data}
          />
        </Spin>
      )
    }
  }, [data, loading, position])

  return (
    <>
      {renderSpecMap}
    </>
  )
}

export default React.memo(DisplayMap)
