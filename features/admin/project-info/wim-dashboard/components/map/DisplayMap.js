import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getPositionDetail } from '@/store/features/dashboardSlice'
import { Spin } from 'antd'
import dynamic from 'next/dynamic'
import { PushpinOutlined } from '@ant-design/icons'
const SpecMap = dynamic(() => import('./SpecMap'), { ssr: false })

const INIT_POSITION = { location: [13.736717, 100.523186], zoom: 5 }
const INIT_PROVINCE_DESC = null

const DisplayMap = (props) => {
  const { stationId, stationType } = props
  const [position, setPosition] = useState(INIT_POSITION)
  const [provinceDesc, setProvinceDesc] = useState(INIT_PROVINCE_DESC)

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
          setProvinceDesc={setProvinceDesc}
          className='!relative !z-10'
        />
      )
    } else {
      return (
        <Spin spinning={loading}>
          {/* <figure
            style={{
              minHeight: '31rem'
            }}
          /> */}
          <SpecMap
            center={position.location}
            zoom={position.zoom}
            data={data.detail.data}
            setProvinceDesc={setProvinceDesc}
            className='!relative !z-10'
          />
        </Spin>
      )
    }
  }, [data, loading, position])

  return (
    <>
      {renderSpecMap}
      <div className='absolute bottom-3 left-5 z-20'>
        {!!provinceDesc &&
          <div className='bg-[#00000080] px-3 py-2 rounded-md flex items-center gap-3'>
            <PushpinOutlined className='!text-lg' /><p>{provinceDesc}</p>
          </div>
        }
      </div>
    </>
  )
}

export default React.memo(DisplayMap)
