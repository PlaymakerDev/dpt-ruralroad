import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Row, Col, Spin, Select, Tag } from 'antd'
import { MenuCard, CCTVTable, CCTVListing, FormSearchCCTV, ContentCCTVLIst, ModalCCTV, ModalConfigCCTV } from '../components'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getDepartmentGroup, getDepartmentListSum, getList, getStationSum as getStation } from '@/store/features/cctvSlice'
import CCTVIconMenu from '@/components/icon/CCTVIconMenu'
import { Failed, Success } from '@/components/icon'

const INIT_SEARCH = null
const INIT_MODAL = { open: false, data: null }
const INIT_DETAIL = { open: false, data: { cctv: null, station: null } }
const INIT_CONFIG = { open: false, data: null }

const OverviewScreen = (props) => {
  const { } = props
  const cctvRef = useRef(false)
  const [value, setValue] = useState(INIT_SEARCH)
  const [open, setOpen] = useState(INIT_MODAL)
  const [detail, setDetail] = useState(INIT_DETAIL)
  const [config, setConfig] = useState(INIT_CONFIG)
  const [cctvStatus, setCCTVStatus] = useState(null)

  const [apiGetDepartmentGroup, loadDepartmentGroup, departmentGroup] = useGetAPI('overlay', {
    funcDispatch: getDepartmentGroup, reducerName: 'cctv', reducerKey: 'department_group'
  })

  const [apiGetDepartmentListSum, loadDepartmentListSum, departmentListSum] = useGetAPI('overlay', {
    funcDispatch: getDepartmentListSum, reducerName: 'cctv', reducerKey: 'deparment_list_sum'
  })

  const [apiGetStation, loadStation, station] = useGetAPI('overlay', {
    funcDispatch: getStation, reducerName: 'cctv', reducerKey: 'station_sum'
  })

  const [apiGetData, loading, data] = useGetAPI('overlay', {
    funcDispatch: getList, reducerName: 'cctv', reducerKey: 'list'
  })

  useEffect(() => {
    apiGetData('/api/v1/cctv/list', {
      ...data.search,
      page_size: 100,
      department_id: data.department_id,
      station_id: data.station_id
    }, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    apiGetDepartmentGroup('/api/v1/cctv/department_group', {
      ...departmentGroup.search
    }, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const elemProps = {
    className: 'flex flex-col items-center justify-between cursor-pointer'
  }

  // const onChangePage = useCallback((page, perPage) => {
  //   apiGetDepartmentListSum('/api/v1/cctv/deparment_list_sum', { ...departmentListSum.search, page: page, page_size: perPage }, false, {})
  // }, [apiGetDepartmentListSum, departmentListSum])

  const findStationType = useCallback((stationType, stationId) => {
    switch (stationType) {
      case 1:
        return apiGetStation(`/api/v1/cctv/station_sum/${stationId}station`, {}, false)
      case 2:
        return apiGetStation(`/api/v1/cctv/station_sum/${stationId}`, {}, false)
      case 3:
        return apiGetStation(`/api/v1/cctv/station_sum/${stationId}/wim`, {}, false)
      default:
        return null
    }
  }, [])

  const getCCTV = useCallback(async (data) => {
    cctvRef.current = true
    // FIND STATION TYPE
    findStationType(data.original_station_type, data.station_id)
    // GET CCTV DATA
    apiGetData('/api/v1/cctv/list', {
      ...data.search,
      page_size: 100,
      department_id: data.department_id,
      station_id: data.station_id
    }, false)
  }, [cctvRef])

  const searchCCTV = useCallback(() => {
    apiGetData('/api/v1/cctv/list', { ...data.search, page_size: 100, }, false)
  }, [data])

  const renderCCTVList = useMemo(() => {
    if (!loading || !loadStation) {
      let cctvData = []
      switch (cctvStatus) {
        case 'Online':
          cctvData = data?.data?.filter(item => item.camera_status === 'Online')
        case 'Offline':
          cctvData = data?.data?.filter(item => item.camera_status === 'Offline')
        default:
          cctvData = data?.data
      }

      console.log("=== status ===",cctvStatus)
      console.log("=== cctv ===",cctvData)

      return (
        <ContentCCTVLIst
          cctv={cctvData || []}
          station={station.data}
          cctvRef={cctvRef}
          setOpen={setOpen}
          setConfig={setConfig}
        />
      )
    } else {
      return <Spin spinning={loading || loadStation} />
    }
  }, [loading, loadStation, data, station, cctvRef, cctvStatus])

  const renderSelect = useMemo(() => {
    return (
      <Col xs={24} sm={12} md={12} lg={12} xl={4} xxl={4}>
        <fieldset>
          <label>สถานี WIM</label>
          <Select
            value={value}
            options={departmentListSum.data}
            className='w-full !mt-[6px]'
            fieldNames={{
              label: 'station_description',
              value: 'station_id'
            }}
            size='large'
            onChange={(value, options) => {
              getCCTV(options)
              setValue(value)
            }}
            placeholder='สถานี WIM'
            allowClear={false}
            loading={loadDepartmentListSum}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => {
              return option ? option.station_description.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
            }}
          />
        </fieldset>
      </Col>
    )
  }, [departmentListSum, loadDepartmentListSum, value])

  const renderDetail = useMemo(() => {
    // CHECK IF REF RETURN FALSE
    if (!cctvRef.current) return
    // NORMAL RENDER
    if (!loadStation) {
      return (
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
          <section className='flex flex-wrap justify-center lg:justify-end items-end h-full gap-5'>
            <div {...elemProps} onClick={() => setCCTVStatus(null)}>
              <CCTVIconMenu width={42} height={40} className='mx-auto' />
              <p className='font-bold'>กล้องทั้งหมด {station.data.total_cameras || 0}</p>
            </div>
            <div {...elemProps} onClick={() => setCCTVStatus('Online')}>
              <Success className='!text-2xl' />
              <p className='font-bold text-[#22c55e]'>กล้องออนไลน์ {station.data.online_cameras || 0}</p>
            </div>
            <div {...elemProps} onClick={() => setCCTVStatus('Offline')}>
              <Failed className='!text-2xl' />
              <p className='font-bold text-[#FF4A4A]'>กล้องออฟไลน์ {station.data.offline_cameras || 0}</p>
            </div>
          </section>
        </Col>
      )
    }
  }, [loadStation, station, cctvRef])

  return (
    <>
      <section>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={12} xl={8} xxl={8}>
            <FormSearchCCTV
              dptGroup={departmentGroup.data}
              defaultSearch={departmentListSum.search}
              apiGetData={apiGetDepartmentListSum}
              cctvRef={cctvRef}
              clearSearch={() => setValue(INIT_SEARCH)}
            />
          </Col>
          {renderSelect}
          {renderDetail}
        </Row>
      </section>
      <section className='mt-5'>
        {renderCCTVList}
      </section>
      <ModalCCTV
        open={open.open}
        info={open.data}
        onClose={() => setOpen(INIT_MODAL)}
      />
      <ModalConfigCCTV
        open={config.open}
        info={config.data}
        onClose={() => setConfig(INIT_CONFIG)}
        onSearch={() => searchCCTV()}
        cctvRef={cctvRef}
      />
    </>
  )
}

export default React.memo(OverviewScreen)
