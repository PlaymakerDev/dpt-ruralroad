import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Row, Col, Spin } from 'antd'
import { MenuCard, CCTVTable, CCTVListing } from '../components'
import useGetAPI from '@/utils/hooks/api/useGetAPI'
import { clearList, clearStationSum, getDepartmentGroup, getDepartmentListSum, getList, getStationSum as getStation } from '@/store/features/cctvSlice'
import { useRouter } from 'next/router'
import { CctvID } from '@/pages/_app'
import { useAppDispatch } from '@/store/hooks'

const OverviewScreen = (props) => {
  const { } = props
  const router = useRouter()
  const [cctvActive, setCctvActive] = useState()
  const { cctvID, setCctvID, cctvPage, setCctvPage } = useContext(CctvID);
  const dispatch = useAppDispatch()
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
    setCctvActive(cctvID)
    setCctvID(0)
  }, [])

  useEffect(() => {
    if (cctvActive != null) {
      apiGetDepartmentListSum('/api/v1/cctv/deparment_list_sum', {
        ...departmentListSum.search,
        department_id: cctvActive,
      }, false)
    } else {
      apiGetDepartmentListSum('/api/v1/cctv/deparment_list_sum', {
        ...departmentListSum.search,
        department_id: 0,
      }, false)
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  }, [cctvActive])

  const findDepartmentListSum = useCallback(async (department_id) => {
    cctvRef.current = false
    setCctvActive(department_id)
    // dispatch(clearList)
    // dispatch(clearStationSum)
  }, [apiGetDepartmentListSum, departmentListSum, cctvRef])

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

  return (
    <>
      <Row gutter={[30, 30]}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} className='!w-full'>
          <MenuCard
            data={departmentGroup.data}
            active={cctvActive || 0}
            findDepartmentListSum={findDepartmentListSum}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} className='!w-full'>
          <section>
            {cctvRef.current ? renderCCTVListing : null}
          </section>
          <section className={cctvRef.current ? 'mt-5' : ''}>
            <CCTVTable
              // API DATA
              setCctvID={setCctvID}
              data={departmentListSum.data}
              loading={loadDepartmentListSum}
              // PAGE API
              page={departmentListSum.search.page}
              perPage={departmentListSum.search.page_size}
              total={departmentListSum.meta.total}
              onChange={onChangePage}
              getCCTV={getCCTV}
            />
          </section>
        </Col>
      </Row>
    </>
  )
}

export default React.memo(OverviewScreen)
