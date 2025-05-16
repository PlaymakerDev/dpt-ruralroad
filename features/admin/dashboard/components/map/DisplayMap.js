import React, { useCallback, useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import useGetAPI from '@/utils/hooks/api/useGetAPI';
import { getPosition, getPositionProvince } from '@/store/features/dashboardSlice';
import { Button, Dropdown, Spin } from 'antd';
import { STATION_CODE, STATION_TYPE } from '@/utils/constant';
import { CloseOutlined } from '@ant-design/icons';
const SpecMap = dynamic(() => import('@/features/admin/dashboard/components/map/SpecMap'), { ssr: false })
// const Map = dynamic(() => import('@/components/map/Map2.js'), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const INIT_TYPE = "ประเภทอุปกรณ์"
const INIT_PROVINCE = "สํานักจังหวัด/แขวง"

const DisplayMap = (props) => {
  const { } = props;
  const [stationType, setStationType] = useState(INIT_TYPE)
  const [provinceText, setProvinceText] = useState(INIT_PROVINCE)

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getPosition, reducerName: 'dashboard', reducerKey: 'position'
  })

  const [apiGetProvince, loadingProvince, province] = useGetAPI('overlay', {
    funcDispatch: getPositionProvince, reducerName: 'dashboard', reducerKey: 'position_province'
  })

  useEffect(() => {
    apiGetData('/api/v1/dashboards/position', { province: '', station_type: '' }, false)
    apiGetProvince('/api/v1/dashboards/position/province', {}, false)
  }, [])

  const getQueryPosition = useCallback((stationType) => {
    apiGetData('/api/v1/dashboards/position', { ...data.overview.search, station_type: stationType }, false)
  }, [data])

  const mapData = data.overview.data

  const items = [
    {
      key: '1',
      label: 'สถานีตรวจสอบน้ำหนัก',
      onClick: (event) => {
        setStationType(STATION_CODE[event.key])
        getQueryPosition(event.key)
      }
    },
    {
      key: '2',
      label: 'หน่วยตรวจสอบเคลื่อนที่',
      onClick: (event) => {
        setStationType(STATION_CODE[event.key])
        getQueryPosition(event.key)
      }
    },
    {
      key: '3',
      label: 'Weight In Motion (WIM)',
      onClick: (event) => {
        setStationType(STATION_CODE[event.key])
        getQueryPosition(event.key)
      }
    },
  ];

  const renderSpecMap = useMemo(() => {
    if (!loading) {
      return (
        <SpecMap
          center={[13.736717, 100.523186]}
          zoom={5}
          className='!relative !z-10'
          mobile={mapData.mobile}
          wim={mapData.wim}
          station={mapData.station}
        />
      )
    } else {
      return (
        <Spin spinning={loading}>
          <SpecMap
            center={[13.736717, 100.523186]}
            zoom={5}
            className='!relative !z-10'
            mobile={mapData.mobile}
            wim={mapData.wim}
            station={mapData.station}
          />
        </Spin>
      )
    }
  }, [mapData, loading])

  return (
    <div>
      {renderSpecMap}
      <div className='!absolute !top-3 !right-5 !z-20 flex items-center gap-3'>
        <Button
          className=' !bg-blue-500 hover:!bg-blue-400 active:!bg-blue-500'
          type='primary'
        >
          สํานักจังหวัด/แขวง
        </Button>
        <Dropdown menu={{ items }}>
          <Button
            className=' !bg-green-500 hover:!bg-green-400 active:!bg-green-500'
            type='primary'
            icon={stationType !== INIT_TYPE ? <CloseOutlined onClick={() => { setStationType(INIT_TYPE); getQueryPosition() }} /> : null}
          >
            {stationType}
          </Button>
        </Dropdown>
      </div>
    </div>
  )
}

export default React.memo(DisplayMap)