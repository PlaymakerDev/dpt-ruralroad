import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Row, Col, Spin } from 'antd'
import { MenuCard, CCTVTable, CCTVListing, FormSearchCCTV } from '../components'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { getDepartmentGroup, getDepartmentListSum, getList, getStationSum as getStation } from '@/store/features/cctvSlice'

const OverviewScreen = (props) => {
  const { } = props
  const cctvRef = useRef(false)

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
    apiGetDepartmentGroup('/api/v1/cctv/department_group', {
      ...departmentGroup.search
    }, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const onChangePage = useCallback((page, perPage) => {
    apiGetDepartmentListSum('/api/v1/cctv/deparment_list_sum', { ...departmentListSum.search, page: page, page_size: perPage }, false, {})
  }, [apiGetDepartmentListSum, departmentListSum])

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

  const renderCCTVListing = useMemo(() => {
    if (!loading || !loadStation) {
      return (
        <CCTVListing
          cctv={data.data}
          station={station.data}
        />
      )
    } else {
      return <Spin spinning={loading || loadStation} />
    }
  }, [loading, loadStation, data, station])

  const adaptiveColumn = useMemo(() => {
    let props = { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }
    if (cctvRef.current) {
      props = { ...props, lg: 12, xl: 12, xxl: 12 }
    }

    return props
  }, [cctvRef, apiGetData])

  return (
    <>
      <section>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
            <FormSearchCCTV
              dptGroup={departmentGroup.data}
              defaultSearch={departmentListSum.search}
              apiGetData={apiGetDepartmentListSum}
              cctvRef={cctvRef}
            />
          </Col>
        </Row>
      </section>
      <section className='mt-5'>
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            {cctvRef.current ? renderCCTVListing : null}
          </Col>
          <Col {...adaptiveColumn}>
            <CCTVTable
              // API DATA
              data={departmentListSum.data}
              loading={loadDepartmentListSum}
              // PAGE API
              page={departmentListSum.search.page}
              perPage={departmentListSum.search.page_size}
              total={departmentListSum.meta.total}
              onChange={onChangePage}
              getCCTV={getCCTV}
            />
          </Col>
        </Row>
      </section>
    </>
  )
}

export default React.memo(OverviewScreen)
