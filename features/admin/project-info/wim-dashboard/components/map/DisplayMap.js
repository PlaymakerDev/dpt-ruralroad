import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LongdoMap, map, longdo } from '@/components/map/LongdoMap'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getPositionDetail } from '@/store/features/dashboardSlice'
import { Spin } from 'antd'

const MAP_KEY = "f7ba675880ccab7ac7fd0a65f1b33553"

const DisplayMap = (props) => {
  const { stationId, stationType } = props

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getPositionDetail, reducerName: 'dashboard', reducerKey: 'position'
  })

  useEffect(() => {
    apiGetData('/api/v1/dashboards/position_by_id', { station_id: stationId, StationType: stationType }, false)
  }, [stationId, stationType])

  const initMap = useCallback(() => {
    if (map && longdo) {
      map.Layers.setBase(longdo.Layers.GRAY);
      // Add other map configurations here

      // IF STATION EXISTED
      if (!!data?.detail?.data?.length) {
        data?.detail?.data?.map(item => {
          const detailMarker = new longdo.Marker(
            { lon: item.Longtitude, lat: item.Latitude },
            {
              title: item.StationName,
              icon: {
                // url: '/images/truck-inspect.svg',
                // size: { width: 70, height: 50 }
                url: '/images/markerwin.svg',
                size: { width: 60, height: 70 }
              },
              popup: {
                html: `<div style="padding: 3rem;">popup</div>`
              }
            }
          )
          map.Overlays.add(detailMarker);
        })
      }
    }
  }, [map, longdo, loading, data])

  useEffect(() => {
    if (!loading) {
      initMap()
    }
  }, [loading])

  const renderMap = useMemo(() => {
    if (!loading) {
      return (
        <LongdoMap
          id="longdo-map"
          mapKey={MAP_KEY}
          callback={initMap()}
        />
      )
    } else {
      return <Spin spinning={loading} />
    }
  }, [loading, MAP_KEY, initMap])

  return (
    <>
      {renderMap}
    </>
  )
}

export default React.memo(DisplayMap)
