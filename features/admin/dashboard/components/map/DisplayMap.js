import React, { useCallback, useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import useGetAPI from '@/utils/hooks/api/useGetAPI';
import { getPosition, getPositionProvince } from '@/store/features/dashboardSlice';
import { /*Button, Dropdown,*/ Badge, ConfigProvider, Select, Spin } from 'antd';
import { useDashboardContext } from '../context';
import { PushpinOutlined } from '@ant-design/icons';
// import { STATION_CODE, STATION_TYPE } from '@/utils/constant';
// import { CloseOutlined } from '@ant-design/icons';
const SpecMap = dynamic(() => import('@/features/admin/dashboard/components/map/SpecMap'), { ssr: false })
// const Map = dynamic(() => import('@/components/map/Map2.js'), { ssr: false })
// const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
// const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const INIT_TYPE = null
const INIT_VALUE = null
const INIT_POSITION = { location: [13.736717, 100.523186], zoom: 5 }
const INIT_PROVINCE_DESC = null

const DisplayMap = (props) => {
  const { accessType } = props;
  const [stationType, setStationType] = useState(INIT_TYPE)
  const [value, setValue] = useState(INIT_VALUE)
  const [position, setPosition] = useState(INIT_POSITION)
  const [provinceDesc, setProvinceDesc] = useState(INIT_PROVINCE_DESC)
  const { onClickPin } = useDashboardContext()

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getPosition, reducerName: 'dashboard', reducerKey: 'position'
  })

  const [apiGetProvince, loadingProvince, province] = useGetAPI('overlay', {
    funcDispatch: getPositionProvince, reducerName: 'dashboard', reducerKey: 'position_province'
  })

  useEffect(() => {
    apiGetData('/api/v1/dashboards/position', { ProvinceID: '', StationType: '' }, false)
    apiGetProvince('/api/v1/dashboards/position/province', {}, false)
  }, [])

  const getQueryPosition = useCallback((stationType) => {
    apiGetData('/api/v1/dashboards/position', { ...data.overview.search, StationType: stationType }, false)
  }, [data])

  const getProvincePosition = useCallback(async (provinceCode) => {
    const response = await apiGetData('/api/v1/dashboards/position', { ...data.overview.search, ProvinceID: provinceCode }, false)
    const location = response?.location[0]
    if (!!provinceCode) {
      setPosition({
        location: [Number(location?.latitude), Number(location?.longitude)],
        zoom: 10
      })
    } else {
      setPosition(INIT_POSITION)
    }
  }, [data])

  const mapData = data.overview.data
  const provincdData = province.data

  const typeArr = [
    {
      label: 'สถานีตรวจสอบน้ำหนัก',
      value: '1'
    },
    {
      label: 'Vehicle Inspection Station (VIS)',
      value: '3'
    },
    {
      label: 'หน่วยตรวจสอบน้ำหนักเคลื่อนที่',
      value: '2'
    },
  ]

  const renderSpecMap = useMemo(() => {
    if (!loading) {
      return (
        <SpecMap
          // center={[13.736717, 100.523186]}
          center={position.location}
          zoom={position.zoom}
          className='!relative !z-10'
          mobile={mapData.mobile}
          wim={mapData.wim}
          station={mapData.station}
          onClickPin={onClickPin}
          setProvinceDesc={setProvinceDesc}
          accessType={accessType}
        />
      )
    } else {
      return (
        <Spin spinning={loading}>
          <SpecMap
            // center={[13.736717, 100.523186]}
            center={position.location}
            zoom={position.zoom}
            className='!relative !z-10'
            mobile={mapData.mobile}
            wim={mapData.wim}
            station={mapData.station}
            onClickPin={onClickPin}
            setProvinceDesc={setProvinceDesc}
            accessType={accessType}
          />
        </Spin>
      )
    }
  }, [mapData, loading, position, accessType])

  return (
    <div>
      {renderSpecMap}
      <div className='absolute top-3 right-5 z-20 flex items-center gap-3'>
        <Select
          value={value}
          options={provincdData}
          className='w-48'
          fieldNames={{
            label: 'ProvinceName',
            value: 'ProvinceID'
          }}
          size='large'
          onChange={(value, options) => {
            getProvincePosition(value)
            setValue(value)
          }}
          placeholder='สํานักจังหวัด/แขวง'
          allowClear
          loading={loadingProvince}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => {
            return option ? option.ProvinceName.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
          }}
        />
        <Select
          value={stationType}
          options={typeArr}
          className='w-48'
          fieldNames={{
            label: 'label',
            value: 'value'
          }}
          size='large'
          onChange={(value, options) => {
            getQueryPosition(value)
            setStationType(value)
          }}
          placeholder='ประเภทอุปกรณ์'
          allowClear
          loading={loadingProvince}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => {
            return option ? option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
          }}
        />
      </div>
      <div className='absolute bottom-3 left-5 z-20'>
        {!!provinceDesc &&
          <div className='bg-[#00000080] px-3 py-2 rounded-md mb-3 flex items-center gap-3'>
            <PushpinOutlined className='!text-lg' /><p>{provinceDesc}</p>
          </div>
        }
        <div className='bg-[#00000080] flex flex-col p-3 rounded-md'>
          <Badge
            color="#9C3CC8"
            text="สถานีตรวจสอบน้ำหนัก"
            classNames={{
              indicator: '!w-3 !h-3'
            }}
          />
          <Badge
            color="#C9883B"
            text="Vehicle Inspection Station (VIS)"
            classNames={{
              indicator: '!w-3 !h-3'
            }}
          />
          <Badge
            color="#3B8CC8"
            text="หน่วยตรวจสอบน้ำหนักเคลื่อนที่"
            classNames={{
              indicator: '!w-3 !h-3'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default React.memo(DisplayMap)