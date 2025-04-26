import React, { useEffect, useMemo } from 'react'
import { CCTVListing } from '../cctv'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getList } from '@/store/features/cctvSlice'
import { Spin } from 'antd'

const CCTVSection = (props) => {
  const { stationId } = props
  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getList, reducerName: 'cctv', reducerKey: 'list'
  })
  useEffect(() => {
    if (stationId) {
      apiGetData('/api/v1/cctv/list', {
        ...data.search,
        page_size: 100,
        // department_id: id,
        station_id: stationId
      }, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationId])

  const renderCCTVListing = useMemo(() => {
    if (!loading) {
      return (
        <CCTVListing
          data={data.data}
        />
      )
    } else {
      return <Spin spinning={loading} />
    }
  }, [loading, data])

  return (
    <div>
      {renderCCTVListing}
    </div>
  )
}

export default React.memo(CCTVSection)
