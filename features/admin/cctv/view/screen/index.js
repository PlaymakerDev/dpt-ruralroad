import React, { useEffect, useMemo } from 'react'
import { CCTVStatus, CCTVListing } from '../components/content'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import {
  getList,
  getStationSum as getStation
} from '@/store/features/cctvSlice'
import { Spin } from 'antd'

const ViewScreen = (props) => {
  const { id, department_id, station_id, original_station_type } = props

  const [apiGetStation, loadStation, station] = useGetAPI('overlay', {
    funcDispatch: getStation, reducerName: 'cctv', reducerKey: 'station_sum'
  })

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getList, reducerName: 'cctv', reducerKey: 'list'
  })

  useEffect(() => {
    if (station_id) {
      if (original_station_type == 1) {
        apiGetStation(`/api/v1/cctv/station_sum/${station_id}station`, {}, false)
      }
      if (original_station_type == 2) {
        apiGetStation(`/api/v1/cctv/station_sum/${station_id}`, {}, false)
      }
      if (original_station_type == 3) {
        apiGetStation(`/api/v1/cctv/station_sum/${station_id}/wim`, {}, false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [station_id, original_station_type])


  useEffect(() => {
    if (id) {
      apiGetData('/api/v1/cctv/list', {
        ...data.search,
        page_size: 100,
        department_id: id,
        station_id: station_id
      }, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const renderCCTVStatus = useMemo(() => {
    if (!loadStation) {
      return (
        <CCTVStatus
          data={station.data}
        />
      )
    } else {
      return <Spin spinning={loadStation} />
    }
  }, [loadStation, station])

  const renderCCTVListing = useMemo(() => {
    if (!loading) {
      return (
        <CCTVListing
          data={data.data}
          station={station.data}
        />
      )
    } else {
      return <Spin spinning={loading} />
    }
  }, [loading, data, station])

  return (
    <div>
      <section>
        {renderCCTVStatus}
      </section>
      <section className='mt-5'>
        {renderCCTVListing}
      </section>
    </div>
  )
}

export default React.memo(ViewScreen)
